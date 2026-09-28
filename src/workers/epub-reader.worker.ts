/// <reference lib="webworker" />

import { strFromU8, unzipSync } from "fflate";

type WorkerRequest = {
	requestId: number;
	action: "preview" | "parse";
	buffer: ArrayBuffer;
};

type ManifestItem = {
	id: string;
	href: string;
	mediaType: string;
	properties: string;
};

type NavEntry = { title: string; level: number };

const workerScope = self as unknown as DedicatedWorkerGlobalScope;

function decodeEntities(value: string) {
	const named: Record<string, string> = {
		amp: "&",
		apos: "'",
		gt: ">",
		lt: "<",
		nbsp: " ",
		quot: '"',
	};
	return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
		if (entity[0] === "#") {
			const hexadecimal = entity[1]?.toLowerCase() === "x";
			const code = Number.parseInt(
				entity.slice(hexadecimal ? 2 : 1),
				hexadecimal ? 16 : 10,
			);
			return Number.isFinite(code) ? String.fromCodePoint(code) : match;
		}
		return named[entity.toLowerCase()] ?? match;
	});
}

function stripMarkup(value: string) {
	return decodeEntities(
		value
			.replace(/<script\b[\s\S]*?<\/script>/gi, "")
			.replace(/<style\b[\s\S]*?<\/style>/gi, "")
			.replace(/<svg\b[\s\S]*?<\/svg>/gi, "")
			.replace(/<(?:br|hr)\s*\/?>/gi, "\n")
			.replace(/<\/(?:p|div|section|article|h[1-6]|li|blockquote)>/gi, "\n")
			.replace(/<li\b[^>]*>/gi, "• ")
			.replace(/<[^>]+>/g, ""),
	)
		.replace(/\r\n?/g, "\n")
		.replace(/[ \t]+\n/g, "\n")
		.replace(/\n[ \t]+/g, "\n")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
}

function attributes(source: string) {
	const result: Record<string, string> = {};
	for (const match of source.matchAll(/([\w:.-]+)\s*=\s*(["'])([\s\S]*?)\2/g)) {
		const key = match[1];
		if (key) result[key.toLowerCase()] = decodeEntities(match[3] ?? "");
	}
	return result;
}

function normalizePath(path: string) {
	const parts: string[] = [];
	for (const part of path.replace(/\\/g, "/").split("/")) {
		if (!part || part === ".") continue;
		if (part === "..") parts.pop();
		else parts.push(part);
	}
	return parts.join("/");
}

function dirname(path: string) {
	const index = path.lastIndexOf("/");
	return index < 0 ? "" : path.slice(0, index);
}

function resolvePath(baseFile: string, href: string) {
	const cleanHref = href.split("#")[0]?.split("?")[0] ?? "";
	let decoded = cleanHref;
	try {
		decoded = decodeURIComponent(cleanHref);
	} catch {
		// Keep the original path when malformed percent escapes are present.
	}
	return normalizePath(`${dirname(baseFile)}/${decoded}`);
}

function entryText(entries: Record<string, Uint8Array>, path: string) {
	const entry = entries[normalizePath(path)];
	if (!entry) throw new Error(`EPUB 缺少文件：${path}`);
	return strFromU8(entry);
}

function metadataValue(opf: string, name: string) {
	const pattern = new RegExp(
		`<(?:\\w+:)?${name}\\b[^>]*>([\\s\\S]*?)<\\/(?:\\w+:)?${name}>`,
		"i",
	);
	return stripMarkup(opf.match(pattern)?.[1] ?? "");
}

function firstHeading(document: string) {
	const heading = document.match(/<h[1-3]\b[^>]*>([\s\S]*?)<\/h[1-3]>/i)?.[1];
	if (heading) return stripMarkup(heading);
	return stripMarkup(
		document.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "",
	);
}

function parseNavigation(
	entries: Record<string, Uint8Array>,
	opfPath: string,
	manifest: ManifestItem[],
	opf: string,
) {
	const navigation = new Map<string, NavEntry>();
	const navItem = manifest.find((item) =>
		item.properties.split(/\s+/).includes("nav"),
	);
	if (navItem) {
		const navPath = resolvePath(opfPath, navItem.href);
		const nav = entryText(entries, navPath);
		for (const match of nav.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
			const href = attributes(match[1] ?? "").href;
			const title = stripMarkup(match[2] ?? "");
			if (!href || !title) continue;
			const before = nav.slice(0, match.index ?? 0);
			const level = Math.max(
				0,
				(before.match(/<ol\b/gi)?.length ?? 1) -
					(before.match(/<\/ol>/gi)?.length ?? 0) -
					1,
			);
			navigation.set(resolvePath(navPath, href), { title, level });
		}
	}

	const spineAttrs = attributes(opf.match(/<spine\b([^>]*)>/i)?.[1] ?? "");
	const ncxItem = manifest.find(
		(item) =>
			item.id === spineAttrs.toc ||
			item.mediaType === "application/x-dtbncx+xml",
	);
	if (navigation.size === 0 && ncxItem) {
		const ncxPath = resolvePath(opfPath, ncxItem.href);
		const ncx = entryText(entries, ncxPath);
		for (const match of ncx.matchAll(
			/<navPoint\b[\s\S]*?<navLabel\b[^>]*>[\s\S]*?<text\b[^>]*>([\s\S]*?)<\/text>[\s\S]*?<content\b([^>]*)\/?>/gi,
		)) {
			const href = attributes(match[2] ?? "").src;
			const title = stripMarkup(match[1] ?? "");
			if (href && title)
				navigation.set(resolvePath(ncxPath, href), { title, level: 0 });
		}
	}
	return navigation;
}

function readPackage(buffer: ArrayBuffer, includeAllChapters: boolean) {
	const entries = unzipSync(new Uint8Array(buffer));
	const container = entryText(entries, "META-INF/container.xml");
	const rootfile = attributes(
		container.match(/<rootfile\b([^>]*)\/?\s*>/i)?.[1] ?? "",
	)["full-path"];
	if (!rootfile) throw new Error("无法找到 EPUB 内容清单");

	const opfPath = normalizePath(rootfile);
	const opf = entryText(entries, opfPath);
	const manifest: ManifestItem[] = [];
	for (const match of opf.matchAll(/<item\b([^>]*)\/?\s*>/gi)) {
		const attrs = attributes(match[1] ?? "");
		if (!attrs.id || !attrs.href) continue;
		manifest.push({
			id: attrs.id,
			href: attrs.href,
			mediaType: attrs["media-type"] ?? "",
			properties: attrs.properties ?? "",
		});
	}
	const byId = new Map(manifest.map((item) => [item.id, item]));
	const spineIds = Array.from(opf.matchAll(/<itemref\b([^>]*)\/?\s*>/gi))
		.map((match) => attributes(match[1] ?? "").idref)
		.filter((value): value is string => Boolean(value));
	if (spineIds.length === 0) throw new Error("EPUB 没有可阅读的 spine 内容");

	const navigation = parseNavigation(entries, opfPath, manifest, opf);
	const coverMetaId = attributes(
		opf.match(/<meta\b(?=[^>]*name=["']cover["'])([^>]*)\/?\s*>/i)?.[1] ?? "",
	).content;
	let coverItem = manifest.find((item) => item.id === coverMetaId);
	coverItem ??= manifest.find((item) =>
		item.properties.split(/\s+/).includes("cover-image"),
	);
	if (!coverItem) {
		const guideHref = attributes(
			opf.match(
				/<reference\b(?=[^>]*type=["']cover["'])([^>]*)\/?\s*>/i,
			)?.[1] ?? "",
		).href;
		if (guideHref)
			coverItem = manifest.find(
				(item) =>
					resolvePath(opfPath, item.href) === resolvePath(opfPath, guideHref),
			);
	}

	let cover: { data: ArrayBuffer; mimeType: string } | undefined;
	if (coverItem) {
		const bytes = entries[resolvePath(opfPath, coverItem.href)];
		if (bytes) {
			cover = {
				data: bytes.buffer.slice(
					bytes.byteOffset,
					bytes.byteOffset + bytes.byteLength,
				),
				mimeType: coverItem.mediaType || "image/jpeg",
			};
		}
	}

	const sourceIds = includeAllChapters ? spineIds : spineIds.slice(0, 1);
	const chapters = sourceIds.flatMap((id, index) => {
		const item = byId.get(id);
		if (!item) return [];
		const path = resolvePath(opfPath, item.href);
		const bytes = entries[path];
		if (!bytes) return [];
		const document = strFromU8(bytes);
		const nav = navigation.get(path);
		const title = nav?.title || firstHeading(document) || `第 ${index + 1} 章`;
		const body = document
			.replace(/<head\b[\s\S]*?<\/head>/i, "")
			.replace(/<h[1-3]\b[^>]*>[\s\S]*?<\/h[1-3]>/i, "");
		const content = stripMarkup(body);
		if (!content) return [];
		return [
			{
				title,
				content,
				href: item.href,
				manifestId: item.id,
				cfiBase: `epubcfi(/6/${(spineIds.indexOf(id) + 1) * 2}[${item.id}]!/4/1)`,
				level: nav?.level ?? 0,
			},
		];
	});

	return {
		title: metadataValue(opf, "title"),
		author: metadataValue(opf, "creator"),
		cover,
		chapters,
		totalCharacters: chapters.reduce(
			(sum, chapter) => sum + chapter.content.length,
			0,
		),
	};
}

workerScope.onmessage = (event: MessageEvent<WorkerRequest>) => {
	const message = event.data;
	try {
		const parsed = readPackage(message.buffer, message.action === "parse");
		const response = {
			requestId: message.requestId,
			type: message.action === "parse" ? "parsed" : "preview",
			title: parsed.title,
			author: parsed.author,
			preview: parsed.chapters[0]?.content.slice(0, 1200) ?? "",
			cover: parsed.cover,
			chapters: message.action === "parse" ? parsed.chapters : undefined,
			totalCharacters: parsed.totalCharacters,
		};
		workerScope.postMessage(response, parsed.cover ? [parsed.cover.data] : []);
	} catch (error) {
		workerScope.postMessage({
			requestId: message.requestId,
			type: "error",
			message: error instanceof Error ? error.message : "EPUB 解析失败",
		});
	}
};
