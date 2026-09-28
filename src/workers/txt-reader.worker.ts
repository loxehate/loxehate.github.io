/// <reference lib="webworker" />

import type { ReaderEncoding } from "@/lib/reader/types";

type WorkerRequest =
	| {
			requestId: number;
			action: "preview";
			buffer: ArrayBuffer;
			encoding?: ReaderEncoding;
	  }
	| {
			requestId: number;
			action: "parse";
			buffer: ArrayBuffer;
			encoding: ReaderEncoding;
	  };

const workerScope = self as unknown as DedicatedWorkerGlobalScope;
const CHAPTER_PATTERN =
	/^(?:第\s*[0-9０-９零〇一二三四五六七八九十百千万两]+\s*[章节回卷部篇集](?:\s*[:：、.．-]?\s*\S.*)?|(?:序章|楔子|前言|引子|后记|尾声|番外(?:篇)?)(?:\s*[:：、.．-]?\s*\S.*)?|chapter\s+\d+(?:[\s:：、.．-].*)?)$/i;
const MAX_CHAPTER_LENGTH = 60_000;

function detectEncoding(bytes: Uint8Array): ReaderEncoding {
	if (
		bytes.length >= 3 &&
		bytes[0] === 0xef &&
		bytes[1] === 0xbb &&
		bytes[2] === 0xbf
	)
		return "utf-8";
	if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe)
		return "utf-16le";
	if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff)
		return "utf-16be";
	try {
		new TextDecoder("utf-8", { fatal: true }).decode(
			bytes.subarray(0, Math.min(bytes.length, 128_000)),
		);
		return "utf-8";
	} catch {
		return "gb18030";
	}
}

function decode(buffer: ArrayBuffer, encoding?: ReaderEncoding) {
	const bytes = new Uint8Array(buffer);
	const resolvedEncoding = encoding ?? detectEncoding(bytes);
	const text = new TextDecoder(resolvedEncoding)
		.decode(bytes)
		.replace(/^\uFEFF/, "");
	return { text, encoding: resolvedEncoding };
}

function splitLongContent(title: string, content: string) {
	if (content.length <= MAX_CHAPTER_LENGTH) return [{ title, content }];
	const parts: Array<{ title: string; content: string }> = [];
	let cursor = 0;
	let part = 1;
	while (cursor < content.length) {
		let end = Math.min(cursor + MAX_CHAPTER_LENGTH, content.length);
		if (end < content.length) {
			const boundary = content.lastIndexOf("\n", end);
			if (boundary > cursor + MAX_CHAPTER_LENGTH * 0.7) end = boundary;
		}
		parts.push({
			title: `${title} · ${part}`,
			content: content.slice(cursor, end).trim(),
		});
		cursor = end;
		part += 1;
	}
	return parts;
}

function parseChapters(raw: string) {
	const text = raw.replace(/\r\n?/g, "\n").trim();
	const lines = text.split("\n");
	const headings: Array<{ line: number; title: string }> = [];
	for (let index = 0; index < lines.length; index += 1) {
		const candidate = lines[index]?.trim() ?? "";
		if (
			candidate.length > 0 &&
			candidate.length <= 80 &&
			CHAPTER_PATTERN.test(candidate)
		) {
			headings.push({ line: index, title: candidate });
		}
	}

	const chapters: Array<{ title: string; content: string }> = [];
	if (headings.length < 2) {
		return splitLongContent("正文", text);
	}

	const preface = lines
		.slice(0, headings[0]?.line ?? 0)
		.join("\n")
		.trim();
	if (preface) chapters.push(...splitLongContent("序章", preface));
	for (let index = 0; index < headings.length; index += 1) {
		const heading = headings[index];
		if (!heading) continue;
		const nextLine = headings[index + 1]?.line ?? lines.length;
		const content = lines
			.slice(heading.line + 1, nextLine)
			.join("\n")
			.trim();
		chapters.push(...splitLongContent(heading.title, content || heading.title));
	}
	return chapters;
}

workerScope.onmessage = (event: MessageEvent<WorkerRequest>) => {
	const message = event.data;
	try {
		const decoded = decode(message.buffer, message.encoding);
		if (message.action === "preview") {
			workerScope.postMessage({
				requestId: message.requestId,
				type: "preview",
				encoding: decoded.encoding,
				preview: decoded.text.slice(0, 1200),
			});
			return;
		}
		const chapters = parseChapters(decoded.text);
		workerScope.postMessage({
			requestId: message.requestId,
			type: "parsed",
			encoding: decoded.encoding,
			chapters,
			totalCharacters: chapters.reduce(
				(sum, chapter) => sum + chapter.content.length,
				0,
			),
		});
	} catch (error) {
		workerScope.postMessage({
			requestId: message.requestId,
			type: "error",
			message: error instanceof Error ? error.message : "文本解析失败",
		});
	}
};
