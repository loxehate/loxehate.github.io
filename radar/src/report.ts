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

const LLM_CONCURRENCY = 5;
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

const MAX_RETRIES = 1;
const RETRY_BASE_MS = 5_000; // 5 s, 10 s, 20 s
const MIN_TOKEN_BUDGET = 16_384;
const MAX_TOKEN_BUDGET = 32_768;

function is429(err: unknown): boolean {
  return (err as { status?: number })?.status === 429 || String(err).includes("429");
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function getLlmApiKey(): string {
  return process.env["OPENAI_API_KEY"] ?? process.env["ANTHROPIC_API_KEY"] ?? "";
}

export function getLlmBaseUrl(): string {
  return (
    process.env["OPENAI_BASE_URL"] ??
    process.env["ANTHROPIC_BASE_URL"] ??
    DEFAULT_OPENAI_BASE_URL
  ).replace(/\/$/, "");
}

function getLlmModel(): string {
  return process.env["OPENAI_MODEL"] ?? process.env["ANTHROPIC_MODEL"] ?? DEFAULT_MODEL;
}

export function hasLlmCredentials(): boolean {
  return getLlmApiKey().length > 0;
}

function normalizeTokenBudget(maxTokens: number): number {
  if (!Number.isFinite(maxTokens) || maxTokens <= 0) return MIN_TOKEN_BUDGET;
  return maxTokens >= MAX_TOKEN_BUDGET ? MAX_TOKEN_BUDGET : MIN_TOKEN_BUDGET;
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

export async function callLlm(prompt: string, maxTokens = 4096): Promise<string> {
  let tokenBudget = normalizeTokenBudget(maxTokens);
  for (let attempt = 0; ; attempt++) {
    await acquireSlot();
    let released = false;
    try {
      const apiKey = getLlmApiKey();
      if (!apiKey) throw new Error("Missing required environment variable: OPENAI_API_KEY");

      const resp = await fetch(`${getLlmBaseUrl()}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: getLlmModel(),
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2,
          max_tokens: tokenBudget,
        }),
      });
      if (!resp.ok) {
        throw new Error(`LLM API ${resp.status}: ${await resp.text()}`);
      }

      const data = (await resp.json()) as {
        choices?: Array<{
          message?: {
            content?: unknown;
          };
          finish_reason?: string | null;
        }>;
      };
      const choice = data.choices?.[0];
      const content = choice?.message?.content;
      const text = extractTextContent(content);
      if (!text)
        throw new Error(`LLM returned empty content; finish_reason=${choice?.finish_reason ?? "unknown"}`);
      return text;
    } catch (err) {
      if (attempt < MAX_RETRIES && (is429(err) || String(err).includes("empty content"))) {
        releaseSlot();
        released = true;
        if (String(err).includes("finish_reason=length")) {
          tokenBudget = MAX_TOKEN_BUDGET;
        }
        const wait = RETRY_BASE_MS * 2 ** attempt;
        console.error(
          `[llm] retry ${attempt + 1}/${MAX_RETRIES} in ${wait / 1000}s with max_tokens=${tokenBudget}: ${err}`,
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
