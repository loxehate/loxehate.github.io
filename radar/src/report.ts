/**
 * LLM invocation and file output helpers.
 * Supports OpenAI-compatible chat/completions endpoints.
 */

import fs from "node:fs";
import path from "node:path";

const DEFAULT_OPENAI_BASE_URL = "https://api.openai.com/v1";
const DEFAULT_MODEL = "gpt-4.1-mini";

// ---------------------------------------------------------------------------
// Concurrency limiter — prevents rate-limit (429) errors when many LLM calls
// are fired in parallel. At most LLM_CONCURRENCY requests are in-flight at
// any given time; the rest queue and run as slots free up.
// ---------------------------------------------------------------------------

function readIntegerEnv(name: string, fallback: number, minimum: number, maximum: number): number {
  const value = Number.parseInt(process.env[name] ?? "", 10);
  return Number.isFinite(value) ? Math.min(maximum, Math.max(minimum, value)) : fallback;
}

function readBooleanEnv(name: string, fallback: boolean): boolean {
  const value = process.env[name]?.trim().toLowerCase();
  if (!value) return fallback;
  if (["1", "true", "yes", "on"].includes(value)) return true;
  if (["0", "false", "no", "off"].includes(value)) return false;
  return fallback;
}

const LLM_CONCURRENCY = readIntegerEnv("LLM_CONCURRENCY", 1, 1, 10);
let llmSlots = LLM_CONCURRENCY;
const llmQueue: Array<() => void> = [];

function acquireSlot(): Promise<void> {
  if (llmSlots > 0) {
    llmSlots--;
    return Promise.resolve();
  }
  return new Promise((resolve) => llmQueue.push(resolve));
}

function releaseSlot(): void {
  const next = llmQueue.shift();
  if (next) {
    next();
  } else {
    llmSlots++;
  }
}

// ---------------------------------------------------------------------------
// LLM
// ---------------------------------------------------------------------------

const MAX_RETRIES = readIntegerEnv("LLM_MAX_RETRIES", 2, 0, 6);
const RETRY_BASE_MS = readIntegerEnv("LLM_RETRY_BASE_MS", 5_000, 500, 60_000);
const REQUEST_TIMEOUT_MS = readIntegerEnv("LLM_REQUEST_TIMEOUT_MS", 300_000, 10_000, 600_000);
const REASONING_MAX_TOKENS = readIntegerEnv("LLM_REASONING_MAX_TOKENS", 2_048, 0, 32_768);
const REASONING_RETRY_MAX_TOKENS = readIntegerEnv("LLM_REASONING_RETRY_MAX_TOKENS", 1_024, 0, 32_768);
const DISABLE_REASONING = readBooleanEnv("LLM_DISABLE_REASONING", false);
const MIN_TOKEN_BUDGET = 1_024;
const MAX_TOKEN_BUDGET = 32_768;

class EmptyLlmContentError extends Error {
  constructor(
    message: string,
    readonly finishReason: string | null | undefined,
    readonly hasReasoning: boolean,
  ) {
    super(message);
    this.name = "EmptyLlmContentError";
  }
}

function is429(err: unknown): boolean {
  return (err as { status?: number })?.status === 429 || String(err).includes("429");
}

function isRetryableError(err: unknown): boolean {
  if (is429(err)) return true;
  const message = describeError(err);
  return (
    /LLM API (408|425|500|502|503|504)\b/i.test(message) ||
    /fetch failed|network request failed|UND_ERR_|ECONNRESET|ECONNREFUSED|EAI_AGAIN|ETIMEDOUT|socket|connection|terminated|abort/i.test(
      message,
    )
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function getLlmApiKey(): string {
  return (process.env["OPENAI_API_KEY"] ?? process.env["ANTHROPIC_API_KEY"] ?? "").trim();
}

export function getLlmBaseUrl(): string {
  return (process.env["OPENAI_BASE_URL"] ?? process.env["ANTHROPIC_BASE_URL"] ?? DEFAULT_OPENAI_BASE_URL)
    .trim()
    .replace(/\/+$/, "");
}

function getLlmModel(): string {
  return (process.env["OPENAI_MODEL"] ?? process.env["ANTHROPIC_MODEL"] ?? DEFAULT_MODEL).trim();
}

function isOpenRouterEndpoint(endpoint: string): boolean {
  try {
    return new URL(endpoint).hostname.toLowerCase() === "openrouter.ai";
  } catch {
    return false;
  }
}

export function hasLlmCredentials(): boolean {
  return getLlmApiKey().length > 0;
}

function normalizeTokenBudget(maxTokens: number): number {
  if (!Number.isFinite(maxTokens) || maxTokens <= 0) return 4_096;
  return Math.min(MAX_TOKEN_BUDGET, Math.max(MIN_TOKEN_BUDGET, Math.floor(maxTokens)));
}

function getReasoningTokenLimit(tokenBudget: number, reasoningBudget: number): number {
  return Math.min(
    reasoningBudget,
    Math.floor(tokenBudget * 0.25),
    Math.max(0, tokenBudget - MIN_TOKEN_BUDGET),
  );
}

function extractTextContent(content: unknown): string {
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    const text = content
      .map((part) => {
        if (typeof part === "string") return part;
        if (
          part &&
          typeof part === "object" &&
          "type" in part &&
          part.type === "text" &&
          "text" in part &&
          typeof part.text === "string"
        ) {
          return part.text;
        }
        return "";
      })
      .join("")
      .trim();
    if (text) return text;
  }
  throw new Error("Unexpected response type from LLM");
}

function describeError(err: unknown): string {
  const descriptions: string[] = [];
  const seen = new Set<unknown>();
  let current: unknown = err;

  while (current != null && !seen.has(current) && descriptions.length < 4) {
    seen.add(current);
    if (current instanceof Error) {
      const details = current as Error & {
        code?: unknown;
        errno?: unknown;
        syscall?: unknown;
        hostname?: unknown;
        address?: unknown;
        port?: unknown;
        cause?: unknown;
      };
      const metadata = [
        ["code", details.code],
        ["errno", details.errno],
        ["syscall", details.syscall],
        ["hostname", details.hostname],
        ["address", details.address],
        ["port", details.port],
      ]
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${String(value)}`)
        .join(", ");
      descriptions.push(`${details.name}: ${details.message}${metadata ? ` (${metadata})` : ""}`);
      current = details.cause;
    } else {
      descriptions.push(String(current));
      break;
    }
  }

  return descriptions.join("; caused by: ");
}

export async function callLlm(prompt: string, maxTokens = 4096, contextTag = ""): Promise<string> {
  const tokenBudget = normalizeTokenBudget(maxTokens);
  let reasoningBudget = REASONING_MAX_TOKENS;
  let reasoningDisabled = DISABLE_REASONING;
  let reasoningExhaustionRetries = 0;
  const retryPrefix = contextTag ? `[llm/${contextTag}]` : "[llm]";
  for (let attempt = 0; ; attempt++) {
    await acquireSlot();
    let released = false;
    try {
      const apiKey = getLlmApiKey();
      if (!apiKey) throw new Error("Missing required environment variable: OPENAI_API_KEY");

      const endpoint = `${getLlmBaseUrl()}/chat/completions`;
      const model = getLlmModel();
      const isOpenRouter = isOpenRouterEndpoint(endpoint);
      const requestBody: Record<string, unknown> = {
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      };
      if (isOpenRouter) {
        requestBody["max_completion_tokens"] = tokenBudget;
        if (reasoningDisabled || reasoningBudget === 0) {
          requestBody["reasoning"] = { enabled: false, exclude: true };
        } else {
          // Reasoning and visible text share the completion budget. Always reserve
          // at least MIN_TOKEN_BUDGET tokens for the report itself, and never let
          // reasoning consume more than 25% of the requested completion budget.
          requestBody["reasoning"] = {
            max_tokens: getReasoningTokenLimit(tokenBudget, reasoningBudget),
            exclude: true,
          };
        }
      } else {
        requestBody["max_tokens"] = tokenBudget;
      }
      let resp: Response;
      try {
        resp = await fetch(endpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        });
      } catch (err) {
        throw new Error(
          `LLM network request failed: endpoint=${endpoint}; model=${JSON.stringify(model)}; ${describeError(err)}`,
          { cause: err },
        );
      }
      if (!resp.ok) {
        throw new Error(
          `LLM API ${resp.status} ${resp.statusText}: endpoint=${endpoint}; model=${JSON.stringify(model)}; ${await resp.text()}`,
        );
      }

      const data = (await resp.json()) as {
        choices?: Array<{
          message?: {
            content?: unknown;
            reasoning?: unknown;
            reasoning_content?: unknown;
            reasoning_details?: unknown;
          };
          finish_reason?: string | null;
        }>;
        usage?: {
          prompt_tokens?: number;
          completion_tokens?: number;
          total_tokens?: number;
          completion_tokens_details?: {
            reasoning_tokens?: number;
          };
        };
      };
      const choice = data.choices?.[0];
      const message = choice?.message;
      const content = message?.content;
      if (content == null) {
        const reasoningDetailsCount = Array.isArray(message?.reasoning_details)
          ? message.reasoning_details.length
          : 0;
        const hasReasoning =
          (typeof message?.reasoning === "string" && message.reasoning.length > 0) ||
          (typeof message?.reasoning_content === "string" && message.reasoning_content.length > 0) ||
          reasoningDetailsCount > 0;
        const usage = data.usage;
        const usageSummary = usage
          ? `prompt_tokens=${usage.prompt_tokens ?? "unknown"}, completion_tokens=${usage.completion_tokens ?? "unknown"}, reasoning_tokens=${usage.completion_tokens_details?.reasoning_tokens ?? "unknown"}, total_tokens=${usage.total_tokens ?? "unknown"}`
          : "unavailable";
        throw new EmptyLlmContentError(
          `LLM returned empty content; finish_reason=${choice?.finish_reason ?? "unknown"}; reasoning_present=${hasReasoning}; reasoning_details_count=${reasoningDetailsCount}; usage=${usageSummary}${contextTag ? `; context=${contextTag}` : ""}`,
          choice?.finish_reason,
          hasReasoning,
        );
      }
      const text = extractTextContent(content);
      if (!text)
        throw new Error(
          `LLM returned empty content; finish_reason=${choice?.finish_reason ?? "unknown"}${contextTag ? `; context=${contextTag}` : ""}`,
        );
      return text;
    } catch (err) {
      if (attempt < MAX_RETRIES && (isRetryableError(err) || String(err).includes("empty content"))) {
        releaseSlot();
        released = true;
        if (
          err instanceof EmptyLlmContentError &&
          err.finishReason === "length" &&
          err.hasReasoning &&
          isOpenRouterEndpoint(`${getLlmBaseUrl()}/chat/completions`)
        ) {
          reasoningExhaustionRetries++;
          if (reasoningExhaustionRetries === 1) {
            const currentReasoningLimit = getReasoningTokenLimit(tokenBudget, reasoningBudget);
            reasoningBudget = Math.min(
              REASONING_RETRY_MAX_TOKENS,
              Math.max(512, Math.floor(currentReasoningLimit / 2)),
            );
          } else {
            reasoningDisabled = true;
          }
        }
        const wait = RETRY_BASE_MS * 2 ** attempt + Math.floor(Math.random() * 1_000);
        const reasoningStatus = reasoningDisabled ? "disabled" : String(reasoningBudget);
        console.error(
          `${retryPrefix} retry ${attempt + 1}/${MAX_RETRIES} in ${wait / 1000}s with max_completion_tokens=${tokenBudget}, reasoning_max_tokens=${reasoningStatus}: ${err}`,
        );
        await sleep(wait);
        continue;
      }
      throw err;
    } finally {
      if (!released) releaseSlot();
    }
  }
}

// ---------------------------------------------------------------------------
// File output
// ---------------------------------------------------------------------------

export function saveFile(content: string, ...segments: string[]): string {
  const filepath = path.join("digests", ...segments);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
}

export function autoGenFooter(_lang: "zh" | "en" = "zh"): string {
  return "";
}
