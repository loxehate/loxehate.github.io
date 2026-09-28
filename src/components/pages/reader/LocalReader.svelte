<script lang="ts">
import Icon from "@iconify/svelte";
import { onMount, tick } from "svelte";
import {
	deleteBook as deleteStoredBook,
	getAllProgress,
	getBookByHash,
	getBooks,
	getChapters,
	getChapterTranslations,
	getProgress,
	getSettings,
	saveBook,
	saveProgress,
	saveSettings,
	saveTranslation,
} from "@/lib/reader/db";
import {
	type BuiltInBook,
	DEFAULT_READER_SETTINGS,
	type ReaderBook,
	type ReaderChapter,
	type ReaderEncoding,
	type ReaderProgress,
	type ReaderSettings,
	type ReaderTranslation,
} from "@/lib/reader/types";

let { builtInBooks = [] }: { builtInBooks?: BuiltInBook[] } = $props();

type WorkerResponse = {
	requestId: number;
	type: "preview" | "parsed" | "error";
	encoding?: ReaderEncoding;
	preview?: string;
	title?: string;
	author?: string;
	cover?: { data: ArrayBuffer; mimeType: string };
	chapters?: Array<{
		title: string;
		content: string;
		href?: string;
		manifestId?: string;
		cfiBase?: string;
		level?: number;
	}>;
	totalCharacters?: number;
	message?: string;
};

type TranslationStatus =
	| "idle"
	| "checking"
	| "downloading"
	| "translating"
	| "ready"
	| "unsupported"
	| "error";

type TranslationParagraph = {
	index: number;
	sourceText: string;
	translatedText?: string;
};

type TranslatorSession = {
	translate: (text: string) => Promise<string>;
	destroy?: () => void;
};

type TranslatorMonitor = {
	addEventListener: (
		type: "downloadprogress",
		listener: (event: { loaded: number }) => void,
	) => void;
};

type TranslatorApi = {
	create: (options: {
		sourceLanguage: "zh" | "en";
		targetLanguage: "zh" | "en";
		monitor?: (monitor: TranslatorMonitor) => void;
	}) => Promise<TranslatorSession>;
};

let books = $state<ReaderBook[]>([]);
let progressByBook = $state<Record<string, ReaderProgress>>({});
let settings = $state<ReaderSettings>({ ...DEFAULT_READER_SETTINGS });
let settingsReady = $state(false);
let loading = $state(true);
let fatalError = $state("");
let view = $state<"shelf" | "reader">("shelf");

let currentBook = $state<ReaderBook | null>(null);
let chapters = $state<ReaderChapter[]>([]);
let currentChapterIndex = $state(0);
let drawerOpen = $state(false);
let settingsOpen = $state(false);
let searchOpen = $state(false);
let searchQuery = $state("");
let activeSearchTerm = $state("");
let progressTimer: number | undefined;
let shelfScrollY = 0;
let pageViewport = $state<HTMLElement>();
let pagedContent = $state<HTMLElement>();
let pageIndex = $state(0);
let pageCount = $state(1);
let pendingRestoreRatio = 0;

let fileInput = $state<HTMLInputElement>();
let selectedFile = $state<File | null>(null);
let importOpen = $state(false);
let importEncoding = $state<ReaderEncoding>("utf-8");
let importPreview = $state("");
let importTitle = $state("");
let importAuthor = $state("");
let importCoverUrl = $state("");
let importError = $state("");
let importing = $state(false);
let previewing = $state(false);
let bookToDelete = $state<ReaderBook | null>(null);
let coverUrls = $state<Record<string, string>>({});
let translationParagraphs = $state<TranslationParagraph[]>([]);
let translationStatus = $state<TranslationStatus>("idle");
let translationProgress = $state(0);
let translationError = $state("");
let translationSourceLanguage = $state<"zh" | "en">("zh");
let translationTargetLanguage = $state<"zh" | "en">("en");
let translationRevision = $state(0);
let translationRunId = 0;
const translatorSessions = new Map<string, TranslatorSession>();
const pendingTranslatorSessions = new Map<string, Promise<TranslatorSession>>();

let txtWorker: Worker | undefined;
let epubWorker: Worker | undefined;
let requestId = 0;
const pending = new Map<
	number,
	{
		resolve: (value: WorkerResponse) => void;
		reject: (reason?: unknown) => void;
	}
>();

const currentChapter = $derived(chapters[currentChapterIndex]);
const latestBook = $derived(books[0]);
const selectedFormat = $derived<"txt" | "epub">(
	selectedFile?.name.toLowerCase().endsWith(".epub") ? "epub" : "txt",
);
const searchResults = $derived.by(() => {
	const query = searchQuery.trim().toLocaleLowerCase();
	if (query.length < 2) return [];
	return chapters
		.flatMap((chapter) => {
			const normalized = chapter.content.toLocaleLowerCase();
			const position = normalized.indexOf(query);
			if (position < 0) return [];
			const start = Math.max(0, position - 42);
			const end = Math.min(
				chapter.content.length,
				position + query.length + 70,
			);
			return [
				{
					chapterIndex: chapter.index,
					title: chapter.title,
					ratio:
						chapter.content.length > 0 ? position / chapter.content.length : 0,
					excerpt: `${start > 0 ? "…" : ""}${chapter.content.slice(start, end)}${end < chapter.content.length ? "…" : ""}`,
				},
			];
		})
		.slice(0, 80);
});

const ENCODINGS: Array<{ value: ReaderEncoding; label: string }> = [
	{ value: "utf-8", label: "UTF-8" },
	{ value: "gb18030", label: "GBK / GB18030" },
	{ value: "big5", label: "Big5" },
	{ value: "utf-16le", label: "UTF-16 LE" },
	{ value: "utf-16be", label: "UTF-16 BE" },
];

const BILINGUAL_TRANSLATION_ENABLED = false;

function portal(node: HTMLElement) {
	document.body.appendChild(node);
	return {
		destroy() {
			node.remove();
		},
	};
}

function callWorker(
	target: "txt" | "epub",
	action: "preview" | "parse",
	buffer: ArrayBuffer,
	encoding?: ReaderEncoding,
): Promise<WorkerResponse> {
	const worker = target === "epub" ? epubWorker : txtWorker;
	if (!worker) return Promise.reject(new Error("文件解析器尚未准备完成"));
	const id = ++requestId;
	return new Promise((resolve, reject) => {
		pending.set(id, { resolve, reject });
		worker.postMessage({ requestId: id, action, buffer, encoding }, [buffer]);
	});
}

function rebuildCoverUrls(nextBooks: ReaderBook[]) {
	for (const url of Object.values(coverUrls)) URL.revokeObjectURL(url);
	coverUrls = Object.fromEntries(
		nextBooks.flatMap((book) =>
			book.cover ? [[book.id, URL.createObjectURL(book.cover)]] : [],
		),
	);
}

async function refreshShelf() {
	const [storedBooks, storedProgress] = await Promise.all([
		getBooks(),
		getAllProgress(),
	]);
	books = storedBooks;
	rebuildCoverUrls(storedBooks);
	progressByBook = Object.fromEntries(
		storedProgress.map((item) => [item.bookId, item]),
	);
}

onMount(() => {
	txtWorker = new Worker(
		new URL("../../../workers/txt-reader.worker.ts", import.meta.url),
		{
			type: "module",
		},
	);
	epubWorker = new Worker(
		new URL("../../../workers/epub-reader.worker.ts", import.meta.url),
		{ type: "module" },
	);
	const handleWorkerMessage = (event: MessageEvent<WorkerResponse>) => {
		const response = event.data;
		const callback = pending.get(response.requestId);
		if (!callback) return;
		pending.delete(response.requestId);
		if (response.type === "error")
			callback.reject(new Error(response.message || "文本解析失败"));
		else callback.resolve(response);
	};
	const handleWorkerError = () => {
		for (const callback of pending.values())
			callback.reject(new Error("文件解析器运行失败"));
		pending.clear();
	};
	txtWorker.onmessage = handleWorkerMessage;
	epubWorker.onmessage = handleWorkerMessage;
	txtWorker.onerror = handleWorkerError;
	epubWorker.onerror = handleWorkerError;

	void (async () => {
		try {
			const storedSettings = await getSettings();
			if (storedSettings)
				settings = { ...DEFAULT_READER_SETTINGS, ...storedSettings };
			if (!BILINGUAL_TRANSLATION_ENABLED) settings.bilingual = false;
			settingsReady = true;
			const seedFailures = await seedBuiltInBooks();
			await refreshShelf();
			if (seedFailures.length > 0)
				fatalError = `内置书籍导入失败：${seedFailures.join("、")}`;
			const requestedBook = new URLSearchParams(window.location.search).get(
				"book",
			);
			const match = books.find((book) => book.id === requestedBook);
			if (match) await openBook(match);
		} catch (error) {
			fatalError = error instanceof Error ? error.message : "无法读取本地书架";
		} finally {
			loading = false;
		}
	})();

	return () => {
		txtWorker?.terminate();
		epubWorker?.terminate();
		for (const translator of translatorSessions.values())
			translator.destroy?.();
		translatorSessions.clear();
		pendingTranslatorSessions.clear();
		for (const url of Object.values(coverUrls)) URL.revokeObjectURL(url);
		if (importCoverUrl) URL.revokeObjectURL(importCoverUrl);
		if (progressTimer) window.clearTimeout(progressTimer);
	};
});

$effect(() => {
	if (!settingsReady) return;
	const snapshot = { ...settings };
	const timer = window.setTimeout(() => void saveSettings(snapshot), 120);
	return () => window.clearTimeout(timer);
});

$effect(() => {
	if (view !== "reader") return;
	document.body.classList.add("local-reader-active");
	if (settings.readingMode === "paged")
		document.body.classList.add("local-reader-paged");
	return () => {
		document.body.classList.remove("local-reader-active");
		document.body.classList.remove("local-reader-paged");
	};
});

$effect(() => {
	if (view !== "reader" || settings.readingMode !== "paged" || !currentChapter)
		return;
	currentChapterIndex;
	settings.fontSize;
	settings.lineHeight;
	settings.contentWidth;
	settings.bilingual;
	translationRevision;
	const frame = requestAnimationFrame(() =>
		calculatePages(pendingRestoreRatio),
	);
	const observer = new ResizeObserver(() => calculatePages());
	if (pageViewport) observer.observe(pageViewport);
	return () => {
		cancelAnimationFrame(frame);
		observer.disconnect();
	};
});

$effect(() => {
	if (
		!BILINGUAL_TRANSLATION_ENABLED ||
		view !== "reader" ||
		!settings.bilingual ||
		!currentBook ||
		!currentChapter
	) {
		translationRunId += 1;
		translationParagraphs = [];
		translationStatus = "idle";
		translationProgress = 0;
		translationError = "";
		return;
	}
	void translateChapter(currentBook, currentChapter);
});

function formatBytes(bytes: number) {
	if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(timestamp: number) {
	return new Intl.DateTimeFormat("zh-CN", {
		month: "short",
		day: "numeric",
	}).format(timestamp);
}

function bookProgress(bookId: string) {
	return Math.max(0, Math.min(100, progressByBook[bookId]?.percentage ?? 0));
}

function chooseFile() {
	fileInput?.click();
}

async function handleFileSelection(event: Event) {
	const input = event.currentTarget as HTMLInputElement;
	const file = input.files?.[0];
	input.value = "";
	if (!file) return;
	if (!/\.(?:txt|epub)$/i.test(file.name)) {
		fatalError = "仅支持 TXT 和 EPUB 文件";
		return;
	}
	if (file.size > 50 * 1024 * 1024) {
		fatalError = "文件不能超过 50MB";
		return;
	}
	selectedFile = file;
	importOpen = true;
	importTitle = file.name.replace(/\.(?:txt|epub)$/i, "");
	importAuthor = "";
	if (importCoverUrl) URL.revokeObjectURL(importCoverUrl);
	importCoverUrl = "";
	importError = "";
	await updatePreview();
}

async function updatePreview(encoding?: ReaderEncoding) {
	if (!selectedFile) return;
	previewing = true;
	importError = "";
	try {
		const format = selectedFile.name.toLowerCase().endsWith(".epub")
			? "epub"
			: "txt";
		const result = await callWorker(
			format,
			"preview",
			await selectedFile.arrayBuffer(),
			format === "txt" ? encoding : undefined,
		);
		if (format === "txt")
			importEncoding = result.encoding ?? encoding ?? "utf-8";
		importTitle = result.title || importTitle;
		importAuthor = result.author || "";
		if (importCoverUrl) URL.revokeObjectURL(importCoverUrl);
		importCoverUrl = result.cover
			? URL.createObjectURL(
					new Blob([result.cover.data], { type: result.cover.mimeType }),
				)
			: "";
		importPreview = result.preview ?? "";
	} catch (error) {
		importError = error instanceof Error ? error.message : "无法预览文件";
	} finally {
		previewing = false;
	}
}

async function changeEncoding(event: Event) {
	const encoding = (event.currentTarget as HTMLSelectElement)
		.value as ReaderEncoding;
	importEncoding = encoding;
	await updatePreview(encoding);
}

async function sha256(buffer: ArrayBuffer) {
	const digest = await crypto.subtle.digest("SHA-256", buffer);
	return Array.from(new Uint8Array(digest), (byte) =>
		byte.toString(16).padStart(2, "0"),
	).join("");
}

type BookImportOptions = {
	buffer: ArrayBuffer;
	hash: string;
	fileName: string;
	fileSize: number;
	format: "txt" | "epub";
	title?: string;
	author?: string;
	encoding?: ReaderEncoding;
	id?: string;
};

async function parseAndSaveBook(options: BookImportOptions) {
	const result = await callWorker(
		options.format,
		"parse",
		options.buffer,
		options.format === "txt" ? options.encoding : undefined,
	);
	const parsedChapters = result.chapters ?? [];
	if (parsedChapters.length === 0) throw new Error("没有识别到可阅读的文本");

	const id = options.id ?? crypto.randomUUID();
	const now = Date.now();
	const book: ReaderBook = {
		id,
		hash: options.hash,
		title:
			result.title ||
			options.title ||
			options.fileName.replace(/\.(?:txt|epub)$/i, ""),
		author: result.author || options.author || undefined,
		format: options.format,
		encoding:
			options.format === "txt"
				? (result.encoding ?? options.encoding ?? "utf-8")
				: undefined,
		cover: result.cover
			? new Blob([result.cover.data], { type: result.cover.mimeType })
			: undefined,
		fileSize: options.fileSize,
		chapterCount: parsedChapters.length,
		totalCharacters: result.totalCharacters ?? 0,
		createdAt: now,
		updatedAt: now,
	};
	const chapterRows: ReaderChapter[] = parsedChapters.map((chapter, index) => ({
		id: `${id}:${index}`,
		bookId: id,
		index,
		title: chapter.title,
		content: chapter.content,
		characterCount: chapter.content.length,
		href: chapter.href,
		manifestId: chapter.manifestId,
		cfiBase: chapter.cfiBase,
		level: chapter.level,
	}));
	await saveBook(book, chapterRows);
	return book;
}

async function seedBuiltInBooks() {
	const failures: string[] = [];
	for (const builtIn of builtInBooks) {
		const marker = `local-reader:builtin:${builtIn.hash}`;
		try {
			const existing = await getBookByHash(builtIn.hash);
			if (existing) {
				localStorage.setItem(marker, "ready");
				continue;
			}
			if (localStorage.getItem(marker) === "ready") continue;

			const baseUrl = import.meta.env.BASE_URL.endsWith("/")
				? import.meta.env.BASE_URL
				: `${import.meta.env.BASE_URL}/`;
			const response = await fetch(`${baseUrl}${builtIn.path}`);
			if (!response.ok) throw new Error(`下载失败（HTTP ${response.status}）`);
			const buffer = await response.arrayBuffer();
			if ((await sha256(buffer)) !== builtIn.hash)
				throw new Error("文件完整性校验失败");
			await parseAndSaveBook({
				buffer,
				hash: builtIn.hash,
				fileName: builtIn.fileName,
				fileSize: builtIn.fileSize,
				format: builtIn.format,
				title: builtIn.title,
				id: `builtin-${builtIn.hash.slice(0, 24)}`,
			});
			localStorage.setItem(marker, "ready");
		} catch (error) {
			console.error(`无法导入内置书籍《${builtIn.title}》`, error);
			failures.push(builtIn.title);
		}
	}
	return failures;
}

function splitLongTranslationParagraph(text: string, maxLength = 1200) {
	const chunks: string[] = [];
	let remaining = text.trim();
	while (remaining.length > maxLength) {
		const window = remaining.slice(0, maxLength + 1);
		const sentenceBoundary = Math.max(
			window.lastIndexOf("。"),
			window.lastIndexOf("！"),
			window.lastIndexOf("？"),
			window.lastIndexOf("."),
			window.lastIndexOf("!"),
			window.lastIndexOf("?"),
		);
		const wordBoundary = window.lastIndexOf(" ");
		const boundary =
			sentenceBoundary >= maxLength * 0.55
				? sentenceBoundary + 1
				: wordBoundary >= maxLength * 0.55
					? wordBoundary
					: maxLength;
		chunks.push(remaining.slice(0, boundary).trim());
		remaining = remaining.slice(boundary).trim();
	}
	if (remaining) chunks.push(remaining);
	return chunks;
}

function splitTranslationParagraphs(content: string) {
	return content
		.replace(/\r\n?/g, "\n")
		.split(/\n+/)
		.flatMap((paragraph) => splitLongTranslationParagraph(paragraph))
		.filter(Boolean)
		.map((sourceText, index) => ({ index, sourceText }));
}

function detectTranslationLanguage(content: string): "zh" | "en" {
	const sample = content.slice(0, 12_000);
	const chineseCharacters = sample.match(/[\u3400-\u9fff]/g)?.length ?? 0;
	const latinCharacters = sample.match(/[a-z]/gi)?.length ?? 0;
	return chineseCharacters >= Math.max(8, latinCharacters * 0.35) ? "zh" : "en";
}

function translationCacheId(
	bookId: string,
	chapterIndex: number,
	targetLanguage: "zh" | "en",
	paragraphIndex: number,
) {
	return `${bookId}:${chapterIndex}:${targetLanguage}:${paragraphIndex}`;
}

function withTimeout<T>(
	promise: Promise<T>,
	timeoutMs: number,
	message: string,
) {
	return new Promise<T>((resolve, reject) => {
		const timer = window.setTimeout(
			() => reject(new Error(message)),
			timeoutMs,
		);
		promise.then(
			(value) => {
				window.clearTimeout(timer);
				resolve(value);
			},
			(error) => {
				window.clearTimeout(timer);
				reject(error);
			},
		);
	});
}

function createTranslatorSession(
	sourceLanguage: "zh" | "en",
	targetLanguage: "zh" | "en",
	runId: number,
) {
	const key = `${sourceLanguage}:${targetLanguage}`;
	const cached = translatorSessions.get(key);
	if (cached) return Promise.resolve(cached);
	const pendingSession = pendingTranslatorSessions.get(key);
	if (pendingSession) return pendingSession;
	const translatorApi = (
		globalThis as typeof globalThis & { Translator?: TranslatorApi }
	).Translator;
	if (!translatorApi) throw new Error("当前浏览器不支持本地翻译");
	translationStatus = "downloading";
	translationProgress = 0;
	const creation = withTimeout(
		translatorApi.create({
			sourceLanguage,
			targetLanguage,
			monitor(monitor) {
				monitor.addEventListener("downloadprogress", (event) => {
					if (runId === translationRunId) translationProgress = event.loaded;
				});
			},
		}),
		180_000,
		"本地语言包准备超时，请检查网络后重试",
	);
	pendingTranslatorSessions.set(key, creation);
	void creation.then(
		(session) => {
			pendingTranslatorSessions.delete(key);
			translatorSessions.set(key, session);
		},
		() => pendingTranslatorSessions.delete(key),
	);
	return creation;
}

function getTranslatorSession(
	sourceLanguage: "zh" | "en",
	targetLanguage: "zh" | "en",
	runId: number,
) {
	const key = `${sourceLanguage}:${targetLanguage}`;
	const cached = translatorSessions.get(key);
	if (cached) return Promise.resolve(cached);
	const pendingSession = pendingTranslatorSessions.get(key);
	if (pendingSession) return pendingSession;
	const translatorApi = (
		globalThis as typeof globalThis & { Translator?: TranslatorApi }
	).Translator;
	if (!translatorApi) throw new Error("当前浏览器不支持本地翻译");
	const userActivation = (
		navigator as Navigator & { userActivation?: { isActive: boolean } }
	).userActivation;
	if (!userActivation?.isActive)
		throw new Error("需要点击翻译按钮后才能准备本地语言包");
	return createTranslatorSession(sourceLanguage, targetLanguage, runId);
}

async function translateChapter(book: ReaderBook, chapter: ReaderChapter) {
	const runId = ++translationRunId;
	translationError = "";
	translationProgress = 0;
	translationStatus = "checking";
	const sourceLanguage = detectTranslationLanguage(chapter.content);
	const targetLanguage = sourceLanguage === "zh" ? "en" : "zh";
	translationSourceLanguage = sourceLanguage;
	translationTargetLanguage = targetLanguage;
	translationParagraphs = splitTranslationParagraphs(chapter.content);
	if (translationParagraphs.length === 0) {
		translationStatus = "ready";
		return;
	}

	try {
		const cachedRows = await withTimeout(
			getChapterTranslations(book.id, chapter.index, targetLanguage),
			8_000,
			"读取译文缓存超时，请重试",
		);
		if (runId !== translationRunId) return;
		const cachedByIndex = new Map(
			cachedRows.map((row) => [row.paragraphIndex, row]),
		);
		for (const paragraph of translationParagraphs) {
			const cached = cachedByIndex.get(paragraph.index);
			if (cached?.sourceText === paragraph.sourceText)
				paragraph.translatedText = cached.translatedText;
		}
		const missing = translationParagraphs.filter(
			(paragraph) => !paragraph.translatedText,
		);
		if (missing.length === 0) {
			translationProgress = 1;
			translationStatus = "ready";
			translationRevision += 1;
			return;
		}

		const translator = await getTranslatorSession(
			sourceLanguage,
			targetLanguage,
			runId,
		);
		if (runId !== translationRunId) return;
		translationStatus = "translating";
		let completed = translationParagraphs.length - missing.length;
		for (const paragraph of missing) {
			const translatedText = (
				await withTimeout(
					translator.translate(paragraph.sourceText),
					45_000,
					"当前段落翻译超时，请重试",
				)
			).trim();
			if (runId !== translationRunId) return;
			paragraph.translatedText = translatedText;
			completed += 1;
			translationProgress = completed / translationParagraphs.length;
			const row: ReaderTranslation = {
				id: translationCacheId(
					book.id,
					chapter.index,
					targetLanguage,
					paragraph.index,
				),
				bookId: book.id,
				chapterIndex: chapter.index,
				paragraphIndex: paragraph.index,
				sourceLanguage,
				targetLanguage,
				sourceText: paragraph.sourceText,
				translatedText,
				updatedAt: Date.now(),
			};
			await saveTranslation(row);
		}
		if (runId !== translationRunId) return;
		translationStatus = "ready";
		translationProgress = 1;
		translationRevision += 1;
	} catch (error) {
		if (runId !== translationRunId) return;
		translationError =
			error instanceof Error ? error.message : "翻译当前章节失败";
		translationStatus = translationError.includes("不支持")
			? "unsupported"
			: "error";
		translationRevision += 1;
	}
}

function toggleBilingual() {
	if (settings.bilingual) {
		settings.bilingual = false;
		return;
	}
	if (currentChapter) {
		const sourceLanguage = detectTranslationLanguage(currentChapter.content);
		const targetLanguage = sourceLanguage === "zh" ? "en" : "zh";
		try {
			void createTranslatorSession(
				sourceLanguage,
				targetLanguage,
				translationRunId + 1,
			).catch(() => undefined);
		} catch {
			// translateChapter 会显示具体的兼容性错误。
		}
	}
	settings.bilingual = true;
}

function retryTranslation() {
	if (!currentBook || !currentChapter) return;
	const sourceLanguage = detectTranslationLanguage(currentChapter.content);
	const targetLanguage = sourceLanguage === "zh" ? "en" : "zh";
	try {
		void createTranslatorSession(
			sourceLanguage,
			targetLanguage,
			translationRunId + 1,
		).catch(() => undefined);
	} catch {
		// translateChapter 会显示具体的兼容性错误。
	}
	void translateChapter(currentBook, currentChapter);
}

function cfiFor(chapter: ReaderChapter, ratio: number) {
	const offset = Math.round(
		Math.max(0, Math.min(1, ratio)) * chapter.characterCount,
	);
	const base =
		chapter.cfiBase ??
		`epubcfi(/6/${(chapter.index + 1) * 2}[${chapter.manifestId ?? `chapter-${chapter.index}`}]!/4/1)`;
	return base.replace(/\)$/, `:${offset})`);
}

function ratioFromCfi(chapter: ReaderChapter, cfi?: string) {
	if (!cfi || chapter.characterCount === 0) return undefined;
	const offset = Number(cfi.match(/\/1:(\d+)\)$/)?.[1]);
	if (!Number.isFinite(offset)) return undefined;
	return Math.max(0, Math.min(1, offset / chapter.characterCount));
}

function calculatePages(restoreRatio?: number) {
	if (!pageViewport || !pagedContent) return;
	const width = pageViewport.clientWidth;
	const height = pageViewport.clientHeight;
	if (width <= 0 || height <= 0) return;
	pagedContent.style.setProperty("--page-width", `${width}px`);
	pagedContent.style.setProperty("--page-height", `${height}px`);
	requestAnimationFrame(() => {
		if (!pageViewport || !pagedContent) return;
		pageCount = Math.max(1, Math.round(pagedContent.scrollWidth / width));
		const ratio =
			restoreRatio ?? (pageCount > 1 ? pageIndex / (pageCount - 1) : 0);
		pageIndex = Math.max(
			0,
			Math.min(pageCount - 1, Math.round(ratio * (pageCount - 1))),
		);
		pageViewport.scrollLeft = pageIndex * width;
		pendingRestoreRatio = pageCount > 1 ? pageIndex / (pageCount - 1) : 0;
	});
}

async function turnPage(direction: -1 | 1) {
	const next = pageIndex + direction;
	if (next >= 0 && next < pageCount && pageViewport) {
		pageIndex = next;
		pageViewport.scrollTo({
			left: pageIndex * pageViewport.clientWidth,
			behavior: "smooth",
		});
		pendingRestoreRatio = pageCount > 1 ? pageIndex / (pageCount - 1) : 0;
		void persistCurrentProgress();
		return;
	}
	if (direction < 0 && currentChapterIndex > 0)
		await selectChapter(currentChapterIndex - 1, 1);
	if (direction > 0 && currentChapterIndex < chapters.length - 1)
		await selectChapter(currentChapterIndex + 1, 0);
}

function highlightSegments(content: string, term: string) {
	const query = term.trim();
	if (query.length < 2) return [{ text: content, match: false }];
	const source = content.toLocaleLowerCase();
	const needle = query.toLocaleLowerCase();
	const segments: Array<{ text: string; match: boolean }> = [];
	let cursor = 0;
	let matches = 0;
	while (matches < 300) {
		const index = source.indexOf(needle, cursor);
		if (index < 0) break;
		if (index > cursor)
			segments.push({ text: content.slice(cursor, index), match: false });
		segments.push({
			text: content.slice(index, index + query.length),
			match: true,
		});
		cursor = index + query.length;
		matches += 1;
	}
	if (cursor < content.length)
		segments.push({ text: content.slice(cursor), match: false });
	return segments;
}

async function importSelectedFile() {
	if (!selectedFile || importing) return;
	importing = true;
	importError = "";
	try {
		const buffer = await selectedFile.arrayBuffer();
		const hash = await sha256(buffer);
		if (await getBookByHash(hash)) throw new Error("这本书已经在书架中");
		const format = selectedFormat;
		const book = await parseAndSaveBook({
			buffer,
			hash,
			fileName: selectedFile.name,
			fileSize: selectedFile.size,
			format,
			title: importTitle,
			author: importAuthor,
			encoding: format === "txt" ? importEncoding : undefined,
		});
		await refreshShelf();
		importing = false;
		closeImport();
		await openBook(book);
	} catch (error) {
		importError = error instanceof Error ? error.message : "导入失败";
	} finally {
		importing = false;
	}
}

function closeImport() {
	if (importing) return;
	importOpen = false;
	selectedFile = null;
	importPreview = "";
	importTitle = "";
	importAuthor = "";
	if (importCoverUrl) URL.revokeObjectURL(importCoverUrl);
	importCoverUrl = "";
	importError = "";
}

async function openBook(book: ReaderBook) {
	try {
		const [storedChapters, storedProgress] = await Promise.all([
			getChapters(book.id),
			getProgress(book.id),
		]);
		if (storedChapters.length === 0) throw new Error("这本书没有可用章节");
		currentBook = book;
		chapters = storedChapters;
		currentChapterIndex = Math.min(
			storedProgress?.chapterIndex ?? 0,
			storedChapters.length - 1,
		);
		const storedChapter = storedChapters[currentChapterIndex];
		pendingRestoreRatio = storedChapter
			? (ratioFromCfi(storedChapter, storedProgress?.cfi) ??
				storedProgress?.scrollRatio ??
				0)
			: 0;
		pageIndex = storedProgress?.pageIndex ?? 0;
		shelfScrollY = window.scrollY;
		view = "reader";
		drawerOpen = false;
		settingsOpen = false;
		searchOpen = false;
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?book=${book.id}`,
		);
		await tick();
		if (settings.readingMode === "scroll") restoreScroll(pendingRestoreRatio);
		else calculatePages(pendingRestoreRatio);
	} catch (error) {
		fatalError = error instanceof Error ? error.message : "无法打开书籍";
	}
}

function restoreScroll(ratio: number) {
	requestAnimationFrame(() => {
		const maximum = Math.max(
			0,
			document.documentElement.scrollHeight - window.innerHeight,
		);
		window.scrollTo({
			top: maximum * Math.max(0, Math.min(1, ratio)),
			behavior: "auto",
		});
	});
}

function currentScrollRatio() {
	const maximum = document.documentElement.scrollHeight - window.innerHeight;
	return maximum > 0 ? window.scrollY / maximum : 0;
}

async function persistCurrentProgress() {
	if (!currentBook || chapters.length === 0) return;
	const chapter = chapters[currentChapterIndex];
	if (!chapter) return;
	const ratio =
		settings.readingMode === "paged"
			? pageCount > 1
				? pageIndex / (pageCount - 1)
				: 0
			: currentScrollRatio();
	const progress: ReaderProgress = {
		bookId: currentBook.id,
		chapterIndex: currentChapterIndex,
		scrollRatio: ratio,
		cfi: cfiFor(chapter, ratio),
		pageIndex: settings.readingMode === "paged" ? pageIndex : undefined,
		percentage: ((currentChapterIndex + ratio) / chapters.length) * 100,
		updatedAt: Date.now(),
	};
	progressByBook[currentBook.id] = progress;
	await saveProgress(progress);
}

function handleReaderScroll() {
	if (view !== "reader" || settings.readingMode !== "scroll") return;
	if (progressTimer) window.clearTimeout(progressTimer);
	progressTimer = window.setTimeout(() => void persistCurrentProgress(), 260);
}

async function selectChapter(index: number, initialRatio = 0) {
	if (index < 0 || index >= chapters.length || index === currentChapterIndex) {
		drawerOpen = false;
		searchOpen = false;
		return;
	}
	await persistCurrentProgress();
	currentChapterIndex = index;
	pendingRestoreRatio = initialRatio;
	pageIndex = 0;
	pageCount = 1;
	drawerOpen = false;
	searchOpen = false;
	await tick();
	if (settings.readingMode === "paged") calculatePages(initialRatio);
	else restoreScroll(initialRatio);
	if (currentBook) {
		const chapter = chapters[currentChapterIndex];
		if (!chapter) return;
		const progress: ReaderProgress = {
			bookId: currentBook.id,
			chapterIndex: currentChapterIndex,
			scrollRatio: initialRatio,
			cfi: cfiFor(chapter, initialRatio),
			pageIndex: settings.readingMode === "paged" ? pageIndex : undefined,
			percentage:
				((currentChapterIndex + initialRatio) / chapters.length) * 100,
			updatedAt: Date.now(),
		};
		progressByBook[currentBook.id] = progress;
		await saveProgress(progress);
	}
}

async function selectSearchResult(chapterIndex: number, ratio: number) {
	activeSearchTerm = searchQuery.trim();
	if (chapterIndex === currentChapterIndex) {
		searchOpen = false;
		pendingRestoreRatio = ratio;
		if (settings.readingMode === "paged") calculatePages(ratio);
		else restoreScroll(ratio);
	} else {
		await selectChapter(chapterIndex, ratio);
	}
	await tick();
	if (settings.readingMode === "scroll") {
		requestAnimationFrame(() => {
			document
				.querySelector(".chapter-content mark")
				?.scrollIntoView({ block: "center", behavior: "smooth" });
		});
	}
}

function openReaderPanel(panel: "chapters" | "search" | "settings") {
	drawerOpen = panel === "chapters";
	searchOpen = panel === "search";
	settingsOpen = panel === "settings";
}

async function changeReadingMode(mode: "scroll" | "paged") {
	if (mode === settings.readingMode) return;
	const ratio =
		settings.readingMode === "paged"
			? pageCount > 1
				? pageIndex / (pageCount - 1)
				: 0
			: currentScrollRatio();
	await persistCurrentProgress();
	pendingRestoreRatio = ratio;
	settings.readingMode = mode;
	await tick();
	if (mode === "paged") {
		window.scrollTo({ top: 0, behavior: "auto" });
		calculatePages(ratio);
	} else {
		restoreScroll(ratio);
	}
}

async function closeReader() {
	await persistCurrentProgress();
	view = "shelf";
	currentBook = null;
	chapters = [];
	window.history.replaceState({}, "", window.location.pathname);
	await refreshShelf();
	await tick();
	window.scrollTo({ top: shelfScrollY, behavior: "auto" });
}

async function confirmDelete() {
	if (!bookToDelete) return;
	try {
		await deleteStoredBook(bookToDelete.id);
		bookToDelete = null;
		await refreshShelf();
	} catch (error) {
		fatalError = error instanceof Error ? error.message : "删除失败";
	}
}

function handleKeyboard(event: KeyboardEvent) {
	if (view !== "reader" || drawerOpen || settingsOpen || searchOpen) return;
	if (event.key === "ArrowLeft") {
		event.preventDefault();
		if (settings.readingMode === "paged") void turnPage(-1);
		else void selectChapter(currentChapterIndex - 1);
	}
	if (event.key === "ArrowRight") {
		event.preventDefault();
		if (settings.readingMode === "paged") void turnPage(1);
		else void selectChapter(currentChapterIndex + 1);
	}
	if (event.key === "Escape") void closeReader();
}
</script>

<svelte:window onkeydown={handleKeyboard} onscroll={handleReaderScroll} />

<div class="local-reader-shell">
  <input bind:this={fileInput} onchange={handleFileSelection} type="file" accept=".txt,.epub,text/plain,application/epub+zip" class="sr-only" />

  {#if fatalError}
    <div class="reader-alert" role="alert">
      <Icon icon="material-symbols:error-outline-rounded" width="20" />
      <span>{fatalError}</span>
      <button type="button" onclick={() => (fatalError = "")} aria-label="关闭错误提示">
        <Icon icon="material-symbols:close-rounded" width="18" />
      </button>
    </div>
  {/if}

  {#if loading}
    <div class="shelf-loading" aria-label="正在读取本地书架">
      <div class="loading-line wide"></div>
      <div class="loading-line"></div>
      <div class="loading-grid">
        <div></div><div></div><div></div>
      </div>
    </div>
  {:else}
    <section class="reader-intro">
      <div>
        <p class="reader-kicker">LOCAL LIBRARY</p>
        <h2>本地阅读</h2>
        <p>小说只保存在当前浏览器中,支持 TXT 与 EPUB。</p>
      </div>
      <button type="button" class="primary-action" onclick={chooseFile}>
        <Icon icon="material-symbols:add-rounded" width="22" />
        导入小说
      </button>
    </section>

    {#if books.length === 0}
      <section class="empty-shelf">
        <div class="empty-mark" aria-hidden="true">
          <Icon icon="material-symbols:auto-stories-outline-rounded" width="42" />
        </div>
        <div>
          <h3>书架还是空的</h3>
          <p>选择 TXT 或 EPUB 小说，系统会自动识别编码、封面、目录和章节。单个文件最大支持 50MB。</p>
        </div>
        <button type="button" class="secondary-action" onclick={chooseFile}>选择小说</button>
      </section>
    {:else}
      {#if latestBook}
        <section class="continue-reading">
          <div class:has-image={Boolean(coverUrls[latestBook.id])} class="continue-cover" aria-hidden="true">
			{#if coverUrls[latestBook.id]}<img src={coverUrls[latestBook.id]} alt="" />{:else}{latestBook.title.slice(0, 1)}{/if}
		  </div>
          <div class="continue-copy">
            <span>最近阅读</span>
            <h3>{latestBook.title}</h3>
            <p>{latestBook.chapterCount} 章 · {formatBytes(latestBook.fileSize)} · {Math.round(bookProgress(latestBook.id))}%</p>
            <div class="progress-track"><span style={`width: ${bookProgress(latestBook.id)}%`}></span></div>
          </div>
          <button type="button" class="continue-button" onclick={() => openBook(latestBook)}>
            继续阅读
            <Icon icon="material-symbols:arrow-forward-rounded" width="20" />
          </button>
        </section>
      {/if}

      <div class="shelf-heading">
        <div>
          <h3>我的书架</h3>
          <span>{books.length} 本小说</span>
        </div>
      </div>

      <section class="book-grid">
        {#each books as book, index (book.id)}
          <article class="book-row" style={`--row-index: ${index}`}>
            <button type="button" class="book-main" onclick={() => openBook(book)} aria-label={`阅读 ${book.title}`}>
              <span class:has-image={Boolean(coverUrls[book.id])} class="book-cover" aria-hidden="true">
				{#if coverUrls[book.id]}<img src={coverUrls[book.id]} alt="" />{:else}{book.title.slice(0, 1)}{/if}
			  </span>
              <span class="book-copy">
                <strong>{book.title}</strong>
                <small>{book.chapterCount} 章 · {formatBytes(book.fileSize)} · {book.format === "epub" ? "EPUB" : book.encoding?.toUpperCase() ?? "TXT"}{book.author ? ` · ${book.author}` : ""}</small>
                <span class="book-progress"><i style={`width: ${bookProgress(book.id)}%`}></i></span>
              </span>
              <span class="book-percentage">{Math.round(bookProgress(book.id))}%</span>
            </button>
            <div class="book-actions">
              <span>{formatDate(book.updatedAt)}</span>
              <button type="button" onclick={() => (bookToDelete = book)} aria-label={`删除 ${book.title}`}>
                <Icon icon="material-symbols:delete-outline-rounded" width="20" />
              </button>
            </div>
          </article>
        {/each}
      </section>
    {/if}
  {/if}
</div>

{#if importOpen && selectedFile}
  <div class="modal-layer" role="presentation" onclick={(event) => event.currentTarget === event.target && closeImport()}>
    <section class="import-dialog" role="dialog" aria-modal="true" aria-labelledby="import-title">
      <header>
        <div>
          <span>导入本地小说</span>
          <h2 id="import-title">{importTitle || selectedFile.name}</h2>
		  {#if importAuthor}<p class="import-author">{importAuthor}</p>{/if}
        </div>
        <button type="button" onclick={closeImport} aria-label="关闭导入窗口">
          <Icon icon="material-symbols:close-rounded" width="22" />
        </button>
      </header>

      <div class="file-facts">
        <span><Icon icon="material-symbols:description-outline-rounded" width="18" /> {selectedFormat.toUpperCase()}</span>
        <span>{formatBytes(selectedFile.size)}</span>
        <span>仅保存在本机</span>
      </div>

	  {#if importCoverUrl}
		<div class="import-cover"><img src={importCoverUrl} alt={`${importTitle || selectedFile.name}封面`} /></div>
	  {/if}

	  {#if selectedFormat === "txt"}<label class="encoding-field">
        <span>文本编码</span>
        <select value={importEncoding} onchange={changeEncoding} disabled={previewing || importing}>
          {#each ENCODINGS as encoding}
            <option value={encoding.value}>{encoding.label}</option>
          {/each}
        </select>
        <small>如果预览出现乱码，请手动切换编码。</small>
      </label>{/if}

      <div class="preview-panel">
        <div class="preview-label">
          <span>内容预览</span>
          {#if previewing}<span class="preview-status">正在解码</span>{/if}
        </div>
        <pre>{previewing ? "正在生成预览…" : importPreview}</pre>
      </div>

      {#if importError}<p class="inline-error" role="alert">{importError}</p>{/if}

      <footer>
        <button type="button" class="cancel-action" onclick={closeImport} disabled={importing}>取消</button>
        <button type="button" class="primary-action" onclick={importSelectedFile} disabled={importing || previewing}>
          {#if importing}
            <Icon icon="svg-spinners:90-ring-with-bg" width="20" /> 正在识别章节
          {:else}
            <Icon icon="material-symbols:library-add-outline-rounded" width="20" /> 加入书架
          {/if}
        </button>
      </footer>
    </section>
  </div>
{/if}

{#if bookToDelete}
  <div class="modal-layer compact" role="presentation">
    <section class="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-title">
      <div class="danger-mark"><Icon icon="material-symbols:delete-outline-rounded" width="26" /></div>
      <h2 id="delete-title">移除《{bookToDelete.title}》？</h2>
      <p>小说内容和阅读进度会从当前浏览器永久删除。</p>
      <div>
        <button type="button" class="cancel-action" onclick={() => (bookToDelete = null)}>取消</button>
        <button type="button" class="danger-action" onclick={confirmDelete}>确认删除</button>
      </div>
    </section>
  </div>
{/if}

{#if view === "reader" && currentBook && currentChapter}
  <section
	use:portal
    class:reader-dark={settings.theme === "dark"}
    class:reader-light={settings.theme === "light"}
    class:reader-sepia={settings.theme === "sepia"}
    class="reading-stage"
    style={`--reader-font-size: ${settings.fontSize}px; --reader-line-height: ${settings.lineHeight}; --reader-width: ${settings.contentWidth}px`}
  >
    <header class="reading-toolbar">
      <button type="button" onclick={closeReader} aria-label="返回书架">
        <Icon icon="material-symbols:arrow-back-rounded" width="23" />
      </button>
      <div>
        <strong>{currentBook.title}</strong>
        <span>{currentChapter.title}</span>
      </div>
      <nav>
		{#if BILINGUAL_TRANSLATION_ENABLED}
		  <button class:active={settings.bilingual} type="button" onclick={toggleBilingual} aria-label="切换中英对照" aria-pressed={settings.bilingual} title="中英对照">
			<Icon icon="material-symbols:translate-rounded" width="23" />
		  </button>
		{/if}
		<button type="button" onclick={() => openReaderPanel("search")} aria-label="搜索正文">
		  <Icon icon="material-symbols:search-rounded" width="23" />
		</button>
        <button type="button" onclick={() => openReaderPanel("chapters")} aria-label="打开章节目录">
          <Icon icon="material-symbols:format-list-bulleted-rounded" width="23" />
        </button>
        <button type="button" onclick={() => openReaderPanel("settings")} aria-label="打开阅读设置">
          <Icon icon="material-symbols:text-fields-rounded" width="23" />
        </button>
      </nav>
    </header>

	{#if settings.readingMode === "scroll"}<main class="reading-scroll">
      <article class="reading-paper">
        <p class="chapter-index">第 {currentChapterIndex + 1} / {chapters.length} 章</p>
        <h1>{currentChapter.title}</h1>
        <div class="chapter-rule"></div>
		{#if BILINGUAL_TRANSLATION_ENABLED && settings.bilingual}
		  <div class:has-error={translationStatus === "error" || translationStatus === "unsupported"} class="translation-notice" role="status">
			<Icon icon={translationStatus === "ready" ? "material-symbols:translate-rounded" : translationStatus === "error" || translationStatus === "unsupported" ? "material-symbols:info-outline-rounded" : "svg-spinners:90-ring-with-bg"} width="18" />
			<span>{#if translationStatus === "ready"}{translationSourceLanguage === "zh" ? "中译英" : "英译中"} · 译文已缓存在本机{:else if translationStatus === "downloading"}正在下载本地语言包 · {Math.round(translationProgress * 100)}%{:else if translationStatus === "translating"}正在翻译当前章节 · {Math.round(translationProgress * 100)}%{:else if translationStatus === "unsupported" || translationStatus === "error"}{translationError}{:else}正在检查本地翻译能力{/if}</span>
			{#if translationStatus === "error"}<button type="button" onclick={retryTranslation}>重试</button>{/if}
		  </div>
		  <div class="chapter-content bilingual-content">
			{#each translationParagraphs as paragraph (paragraph.index)}
			  <div class="bilingual-paragraph">
				<p class="source-paragraph" lang={translationSourceLanguage}>{#each highlightSegments(paragraph.sourceText, activeSearchTerm) as segment}{#if segment.match}<mark>{segment.text}</mark>{:else}{segment.text}{/if}{/each}</p>
				{#if paragraph.translatedText}<p class="translated-paragraph" lang={translationTargetLanguage}>{paragraph.translatedText}</p>{:else if translationStatus !== "error" && translationStatus !== "unsupported"}<span class="translation-placeholder" aria-hidden="true"></span>{/if}
			  </div>
			{/each}
		  </div>
		{:else}
		  <div class="chapter-content">{#each highlightSegments(currentChapter.content, activeSearchTerm) as segment}{#if segment.match}<mark>{segment.text}</mark>{:else}{segment.text}{/if}{/each}</div>
		{/if}
        <footer class="chapter-navigation">
          <button type="button" onclick={() => selectChapter(currentChapterIndex - 1)} disabled={currentChapterIndex === 0}>
            <Icon icon="material-symbols:arrow-back-rounded" width="20" /> 上一章
          </button>
          <span>{Math.round(((currentChapterIndex + 1) / chapters.length) * 100)}%</span>
          <button type="button" onclick={() => selectChapter(currentChapterIndex + 1)} disabled={currentChapterIndex === chapters.length - 1}>
            下一章 <Icon icon="material-symbols:arrow-forward-rounded" width="20" />
          </button>
        </footer>
      </article>
    </main>{:else}
	  <main class="paged-reader">
		<div bind:this={pageViewport} class="paged-viewport">
		  <article bind:this={pagedContent} class="paged-content">
			<div class="paged-heading">
			  <p class="chapter-index">第 {currentChapterIndex + 1} / {chapters.length} 章</p>
			  <h1>{currentChapter.title}</h1>
			  <div class="chapter-rule"></div>
			</div>
			{#if BILINGUAL_TRANSLATION_ENABLED && settings.bilingual}
			  <div class:has-error={translationStatus === "error" || translationStatus === "unsupported"} class="translation-notice" role="status">
				<Icon icon={translationStatus === "ready" ? "material-symbols:translate-rounded" : translationStatus === "error" || translationStatus === "unsupported" ? "material-symbols:info-outline-rounded" : "svg-spinners:90-ring-with-bg"} width="18" />
				<span>{#if translationStatus === "ready"}{translationSourceLanguage === "zh" ? "中译英" : "英译中"} · 译文已缓存在本机{:else if translationStatus === "downloading"}正在下载本地语言包 · {Math.round(translationProgress * 100)}%{:else if translationStatus === "translating"}正在翻译当前章节 · {Math.round(translationProgress * 100)}%{:else if translationStatus === "unsupported" || translationStatus === "error"}{translationError}{:else}正在检查本地翻译能力{/if}</span>
				{#if translationStatus === "error"}<button type="button" onclick={retryTranslation}>重试</button>{/if}
			  </div>
			  <div class="chapter-content bilingual-content">
				{#each translationParagraphs as paragraph (paragraph.index)}
				  <div class="bilingual-paragraph">
					<p class="source-paragraph" lang={translationSourceLanguage}>{#each highlightSegments(paragraph.sourceText, activeSearchTerm) as segment}{#if segment.match}<mark>{segment.text}</mark>{:else}{segment.text}{/if}{/each}</p>
					{#if paragraph.translatedText}<p class="translated-paragraph" lang={translationTargetLanguage}>{paragraph.translatedText}</p>{:else if translationStatus !== "error" && translationStatus !== "unsupported"}<span class="translation-placeholder" aria-hidden="true"></span>{/if}
				  </div>
				{/each}
			  </div>
			{:else}
			  <div class="chapter-content">{#each highlightSegments(currentChapter.content, activeSearchTerm) as segment}{#if segment.match}<mark>{segment.text}</mark>{:else}{segment.text}{/if}{/each}</div>
			{/if}
		  </article>
		</div>
		<footer class="paged-controls">
		  <button type="button" onclick={() => turnPage(-1)} disabled={pageIndex === 0 && currentChapterIndex === 0} aria-label="上一页"><Icon icon="material-symbols:arrow-back-rounded" width="20" /></button>
		  <span>{pageIndex + 1} / {pageCount}</span>
		  <button type="button" onclick={() => turnPage(1)} disabled={pageIndex === pageCount - 1 && currentChapterIndex === chapters.length - 1} aria-label="下一页"><Icon icon="material-symbols:arrow-forward-rounded" width="20" /></button>
		</footer>
	  </main>
	{/if}

    {#if drawerOpen}
      <div class="reader-backdrop" role="presentation" onclick={() => (drawerOpen = false)}></div>
      <aside class="chapter-drawer" aria-label="章节目录">
        <header>
          <div><span>章节目录</span><strong>{chapters.length} 章</strong></div>
          <button type="button" onclick={() => (drawerOpen = false)} aria-label="关闭章节目录"><Icon icon="material-symbols:close-rounded" width="22" /></button>
        </header>
        <nav>
          {#each chapters as chapter (chapter.id)}
            <button class:active={chapter.index === currentChapterIndex} type="button" onclick={() => selectChapter(chapter.index)} style={`padding-left: ${0.65 + Math.min(chapter.level ?? 0, 3) * 0.7}rem`}>
              <span>{String(chapter.index + 1).padStart(2, "0")}</span>
              <strong>{chapter.title}</strong>
            </button>
          {/each}
        </nav>
      </aside>
    {/if}

	{#if searchOpen}
	  <div class="reader-backdrop" role="presentation" onclick={() => (searchOpen = false)}></div>
	  <aside class="search-drawer" aria-label="搜索正文">
		<header>
		  <div><span>全文搜索</span><strong>{searchResults.length} 条结果</strong></div>
		  <button type="button" onclick={() => (searchOpen = false)} aria-label="关闭搜索"><Icon icon="material-symbols:close-rounded" width="22" /></button>
		</header>
		<label class="search-field">
		  <span>搜索当前书籍</span>
		  <div><Icon icon="material-symbols:search-rounded" width="20" /><input bind:value={searchQuery} type="search" placeholder="输入至少两个字" autofocus /></div>
		</label>
		<div class="search-results">
		  {#if searchQuery.trim().length < 2}
			<p class="search-empty">输入关键词后，将在全部章节中查找正文。</p>
		  {:else if searchResults.length === 0}
			<p class="search-empty">没有找到“{searchQuery.trim()}”</p>
		  {:else}
			{#each searchResults as result}
			  <button type="button" onclick={() => selectSearchResult(result.chapterIndex, result.ratio)}>
				<strong>{result.title}</strong><span>{result.excerpt}</span>
			  </button>
			{/each}
		  {/if}
		</div>
	  </aside>
	{/if}

    {#if settingsOpen}
      <div class="reader-backdrop" role="presentation" onclick={() => (settingsOpen = false)}></div>
      <aside class="settings-drawer" aria-label="阅读设置">
        <header>
          <div><span>阅读设置</span><strong>实时生效</strong></div>
          <button type="button" onclick={() => (settingsOpen = false)} aria-label="关闭阅读设置"><Icon icon="material-symbols:close-rounded" width="22" /></button>
        </header>

		<div class="mode-field">
		  <strong>翻阅方式</strong>
		  <div>
			<button class:active={settings.readingMode === "scroll"} type="button" onclick={() => changeReadingMode("scroll")}><Icon icon="material-symbols:swap-vert-rounded" width="20" /><span>滚动</span></button>
			<button class:active={settings.readingMode === "paged"} type="button" onclick={() => changeReadingMode("paged")}><Icon icon="material-symbols:menu-book-rounded" width="20" /><span>翻页</span></button>
		  </div>
		</div>

		{#if BILINGUAL_TRANSLATION_ENABLED}
		  <div class="translation-field">
			<div><strong>中英对照</strong><small>Chrome 桌面版可在本机生成并缓存译文</small></div>
			<button class:active={settings.bilingual} type="button" onclick={toggleBilingual} aria-pressed={settings.bilingual}>
			  <span>{settings.bilingual ? "已开启" : "已关闭"}</span>
			  <i aria-hidden="true"></i>
			</button>
		  </div>
		{/if}

        <label>
          <span><strong>字号</strong><output>{settings.fontSize}px</output></span>
          <input type="range" min="16" max="32" step="1" bind:value={settings.fontSize} />
        </label>
        <label>
          <span><strong>行距</strong><output>{settings.lineHeight.toFixed(1)}</output></span>
          <input type="range" min="1.5" max="2.4" step="0.1" bind:value={settings.lineHeight} />
        </label>
        <label>
          <span><strong>版心宽度</strong><output>{settings.contentWidth}px</output></span>
          <input type="range" min="560" max="980" step="20" bind:value={settings.contentWidth} />
        </label>

        <div class="theme-field">
          <strong>阅读主题</strong>
          <div>
            {#each [
              { value: "system", label: "跟随", color: "linear-gradient(135deg,#f4f4f5 50%,#27272a 50%)" },
              { value: "light", label: "明亮", color: "#f7f7f5" },
              { value: "sepia", label: "纸张", color: "#eee4ce" },
              { value: "dark", label: "夜间", color: "#1d1f22" },
            ] as const as themes}
              <button class:active={settings.theme === themes.value} type="button" onclick={() => (settings.theme = themes.value)}>
                <i style={`background: ${themes.color}`}></i><span>{themes.label}</span>
              </button>
            {/each}
          </div>
        </div>
      </aside>
    {/if}
  </section>
{/if}

<style>
  :global(*) { box-sizing: border-box; }
  :global(body.local-reader-active > :not(.reading-stage)) { display: none !important; }
  :global(body.local-reader-paged) { overflow: hidden; }
  button, select, input { font: inherit; }
  button { -webkit-tap-highlight-color: transparent; }
  .local-reader-shell { width: 100%; }
  .reader-alert { display: flex; align-items: center; gap: .65rem; margin-bottom: 1rem; padding: .8rem 1rem; border: 1px solid color-mix(in srgb, #dc2626 28%, transparent); border-radius: .85rem; color: #b91c1c; background: color-mix(in srgb, #fee2e2 74%, var(--card-bg)); font-size: .875rem; }
  :global(.dark) .reader-alert { color: #fca5a5; background: color-mix(in srgb, #7f1d1d 30%, var(--card-bg)); }
  .reader-alert span { flex: 1; }
  .reader-alert button { border: 0; color: inherit; background: transparent; cursor: pointer; }
  .reader-intro { display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: end; gap: 2rem; padding: .5rem 0 2rem; border-bottom: 1px solid var(--line-divider); }
  .reader-kicker { margin: 0 0 .65rem; color: var(--primary); font: 700 .72rem/1 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .18em; }
  .reader-intro h2 { margin: 0; color: var(--deep-text); font-size: clamp(2rem,5vw,3.4rem); line-height: 1; letter-spacing: -.055em; }
  .reader-intro p:not(.reader-kicker) { max-width: 44rem; margin: 1rem 0 0; color: var(--content-meta); line-height: 1.75; }
  .primary-action, .secondary-action, .continue-button, .cancel-action, .danger-action { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; min-height: 2.75rem; padding: .65rem 1.1rem; border-radius: .8rem; border: 1px solid transparent; font-weight: 700; cursor: pointer; transition: transform .25s cubic-bezier(.16,1,.3,1), background .25s, border-color .25s; }
  .primary-action { color: white; background: var(--primary); box-shadow: inset 0 1px 0 rgb(255 255 255 / .22); }
  :global(.dark) .primary-action { color: #18181b; }
  .primary-action:hover { transform: translateY(-2px); }
  .primary-action:active, .secondary-action:active, .continue-button:active { transform: scale(.98); }
  .primary-action:disabled, .cancel-action:disabled { opacity: .55; cursor: wait; transform: none; }
  .secondary-action, .cancel-action { color: var(--deep-text); border-color: var(--line-divider); background: var(--card-bg); }
  .empty-shelf { display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: 1.4rem; margin-top: 2rem; padding: 2rem; border: 1px dashed color-mix(in srgb, var(--primary) 35%, var(--line-divider)); border-radius: 1rem; background: color-mix(in srgb, var(--btn-regular-bg) 42%, transparent); }
  .empty-mark { display: grid; place-items: center; width: 4.3rem; height: 4.3rem; color: var(--btn-content); border-radius: 1rem; background: var(--btn-regular-bg); }
  .empty-shelf h3 { margin: 0 0 .35rem; color: var(--deep-text); font-size: 1.2rem; }
  .empty-shelf p { max-width: 44rem; margin: 0; color: var(--content-meta); line-height: 1.65; }
  .continue-reading { display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: 1.4rem; margin: 2rem 0 2.3rem; padding: 1.35rem; border-radius: 1rem; color: white; background: color-mix(in oklch, var(--primary) 66%, #26313a); box-shadow: inset 0 1px 0 rgb(255 255 255 / .14), 0 18px 40px -28px color-mix(in srgb, var(--primary) 80%, transparent); }
  .continue-cover, .book-cover { display: grid; place-items: center; flex: 0 0 auto; color: color-mix(in srgb, var(--primary) 55%, #202428); background: #f2eee5; font-weight: 800; }
  .continue-cover { width: 4.6rem; aspect-ratio: 3/4; border-radius: .55rem .85rem .85rem .55rem; font-size: 1.7rem; box-shadow: inset 3px 0 0 rgb(0 0 0 / .08), 0 8px 18px rgb(0 0 0 / .18); }
  .continue-cover.has-image, .book-cover.has-image { overflow: hidden; background: #dedbd4; }
  .continue-cover img, .book-cover img { width: 100%; height: 100%; object-fit: cover; }
  .continue-copy { min-width: 0; }
  .continue-copy > span { font-size: .72rem; font-weight: 700; letter-spacing: .12em; opacity: .72; }
  .continue-copy h3 { margin: .25rem 0 .35rem; overflow: hidden; font-size: 1.35rem; text-overflow: ellipsis; white-space: nowrap; }
  .continue-copy p { margin: 0; font-size: .82rem; opacity: .76; }
  .progress-track { height: 3px; margin-top: .75rem; overflow: hidden; border-radius: 2rem; background: rgb(255 255 255 / .22); }
  .progress-track span { display: block; height: 100%; border-radius: inherit; background: white; transition: width .4s ease; }
  .continue-button { color: #25313a; background: white; }
  .shelf-heading { display: flex; align-items: end; justify-content: space-between; margin-bottom: .7rem; }
  .shelf-heading h3 { margin: 0; color: var(--deep-text); font-size: 1.2rem; }
  .shelf-heading span { display: block; margin-top: .2rem; color: var(--content-meta); font-size: .78rem; }
  .book-grid { border-top: 1px solid var(--line-divider); }
  .book-row { display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: center; gap: 1rem; border-bottom: 1px solid var(--line-divider); opacity: 0; animation: row-enter .55s cubic-bezier(.16,1,.3,1) forwards; animation-delay: calc(var(--row-index) * 45ms); }
  @keyframes row-enter { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .book-main { display: flex; align-items: center; gap: 1rem; min-width: 0; padding: 1rem .25rem; border: 0; text-align: left; color: inherit; background: transparent; cursor: pointer; }
  .book-cover { width: 3.25rem; aspect-ratio: 3/4; border-radius: .35rem .55rem .55rem .35rem; box-shadow: inset 2px 0 0 rgb(0 0 0 / .07); }
  .book-copy { display: flex; flex: 1; min-width: 0; flex-direction: column; }
  .book-copy strong { overflow: hidden; color: var(--deep-text); font-size: .98rem; text-overflow: ellipsis; white-space: nowrap; }
  .book-copy small { margin-top: .25rem; color: var(--content-meta); font-size: .75rem; }
  .book-progress { width: min(16rem,70%); height: 3px; margin-top: .55rem; overflow: hidden; border-radius: 1rem; background: var(--btn-regular-bg); }
  .book-progress i { display: block; height: 100%; background: var(--primary); }
  .book-percentage { width: 3.2rem; color: var(--content-meta); font: 700 .78rem/1 ui-monospace, SFMono-Regular, Consolas, monospace; text-align: right; }
  .book-actions { display: flex; align-items: center; gap: .6rem; color: var(--content-meta); font-size: .72rem; }
  .book-actions button { display: grid; place-items: center; width: 2.4rem; height: 2.4rem; border: 0; border-radius: .65rem; color: inherit; background: transparent; cursor: pointer; transition: color .2s, background .2s; }
  .book-actions button:hover { color: #dc2626; background: color-mix(in srgb, #dc2626 10%, transparent); }
  .modal-layer { position: fixed; inset: 0; z-index: 90; display: grid; place-items: center; padding: 1rem; background: rgb(15 18 22 / .62); backdrop-filter: blur(10px); }
  .import-dialog { width: min(42rem,100%); max-height: min(48rem,calc(100dvh - 2rem)); overflow: auto; padding: 1.4rem; border: 1px solid rgb(255 255 255 / .12); border-radius: 1.1rem; color: var(--deep-text); background: var(--card-bg); box-shadow: inset 0 1px 0 rgb(255 255 255 / .1), 0 28px 70px rgb(0 0 0 / .28); }
  .import-dialog header, .chapter-drawer header, .search-drawer header, .settings-drawer header { display: flex; align-items: start; justify-content: space-between; gap: 1rem; }
  .import-dialog header span, .chapter-drawer header span, .search-drawer header span, .settings-drawer header span { color: var(--content-meta); font-size: .72rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
  .import-dialog h2 { max-width: 34rem; margin: .25rem 0 0; overflow: hidden; font-size: 1.3rem; text-overflow: ellipsis; white-space: nowrap; }
  .import-author { margin: .25rem 0 0; color: var(--content-meta); font-size: .78rem; }
  .import-dialog header button, .chapter-drawer header button, .search-drawer header button, .settings-drawer header button, .reading-toolbar > button, .reading-toolbar nav button { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border: 1px solid var(--line-divider); border-radius: .7rem; color: inherit; background: transparent; cursor: pointer; }
  .file-facts { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.2rem 0; }
  .file-facts span { display: inline-flex; align-items: center; gap: .35rem; padding: .35rem .65rem; border-radius: 2rem; color: var(--content-meta); background: var(--btn-regular-bg); font-size: .75rem; }
  .import-cover { float: left; width: 5.5rem; aspect-ratio: 2/3; margin: 0 1rem 1rem 0; overflow: hidden; border-radius: .45rem .7rem .7rem .45rem; background: var(--btn-regular-bg); box-shadow: inset 2px 0 0 rgb(0 0 0 / .08); }
  .import-cover img { width: 100%; height: 100%; object-fit: cover; }
  .encoding-field { display: grid; gap: .45rem; }
  .encoding-field > span { font-size: .82rem; font-weight: 700; }
  .encoding-field select { width: 100%; padding: .72rem .8rem; border: 1px solid var(--line-divider); border-radius: .7rem; color: var(--deep-text); background: var(--card-bg); outline: none; }
  .encoding-field select:focus { border-color: var(--primary); }
  .encoding-field small { color: var(--content-meta); font-size: .72rem; }
  .preview-panel { margin-top: 1.2rem; overflow: hidden; border: 1px solid var(--line-divider); border-radius: .8rem; }
  .preview-label { display: flex; justify-content: space-between; padding: .65rem .8rem; border-bottom: 1px solid var(--line-divider); color: var(--content-meta); background: var(--btn-regular-bg); font-size: .75rem; font-weight: 700; }
  .preview-status { color: var(--btn-content); }
  .preview-panel pre { height: 12rem; margin: 0; overflow: auto; padding: .9rem; color: var(--deep-text); background: color-mix(in srgb, var(--card-bg) 92%, var(--btn-regular-bg)); font: .82rem/1.75 ui-monospace, SFMono-Regular, Consolas, monospace; white-space: pre-wrap; }
  .inline-error { margin: .8rem 0 0; color: #dc2626; font-size: .8rem; }
  .import-dialog footer { display: flex; justify-content: flex-end; gap: .7rem; margin-top: 1.2rem; }
  .confirm-dialog { width: min(25rem,100%); padding: 1.5rem; border-radius: 1rem; text-align: center; color: var(--deep-text); background: var(--card-bg); }
  .danger-mark { display: grid; place-items: center; width: 3.2rem; height: 3.2rem; margin: 0 auto 1rem; border-radius: .9rem; color: #dc2626; background: color-mix(in srgb, #dc2626 10%, transparent); }
  .confirm-dialog h2 { margin: 0; font-size: 1.15rem; }
  .confirm-dialog p { margin: .65rem 0 1.2rem; color: var(--content-meta); font-size: .85rem; line-height: 1.6; }
  .confirm-dialog > div:last-child { display: grid; grid-template-columns: 1fr 1fr; gap: .65rem; }
  .danger-action { color: white; background: #b91c1c; }
  .shelf-loading { padding: 1rem 0; }
  .loading-line, .loading-grid div { background: linear-gradient(90deg,var(--btn-regular-bg),var(--btn-regular-bg-hover),var(--btn-regular-bg)); background-size: 200% 100%; animation: shimmer 1.3s infinite; }
  .loading-line { width: 45%; height: 1rem; margin-bottom: .7rem; border-radius: .4rem; }
  .loading-line.wide { width: 70%; height: 2.7rem; }
  .loading-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr; gap: 1rem; margin-top: 2rem; }
  .loading-grid div { height: 7rem; border-radius: 1rem; }
  @keyframes shimmer { to { background-position: -200% 0; } }

  .reading-stage { position: relative; z-index: 80; display: block; width: 100%; min-height: 100dvh; color: #303238; background: #f6f5f1; }
  :global(.dark) .reading-stage:not(.reader-light):not(.reader-sepia):not(.reader-dark) { color: #d8d7d3; background: #1d1f22; }
  .reading-stage.reader-light { color: #303238; background: #f7f7f5; }
  .reading-stage.reader-sepia { color: #42392d; background: #eee4ce; }
  .reading-stage.reader-dark { color: #d8d7d3; background: #1d1f22; }
  .reading-toolbar { position: sticky; top: 0; z-index: 3; display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: .85rem; min-height: 4rem; padding: .6rem clamp(.75rem,3vw,2rem); border-bottom: 1px solid rgb(60 60 60 / .1); background: color-mix(in srgb, #f6f5f1 92%, transparent); backdrop-filter: blur(16px); }
  .reader-dark .reading-toolbar { background: color-mix(in srgb, #1d1f22 92%, transparent); }
  .reader-sepia .reading-toolbar { background: color-mix(in srgb, #eee4ce 92%, transparent); }
  .reader-dark .reading-toolbar { border-color: rgb(255 255 255 / .09); }
  .reading-toolbar > div { min-width: 0; }
  .reading-toolbar strong, .reading-toolbar span { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .reading-toolbar strong { font-size: .9rem; }
  .reading-toolbar span { margin-top: .15rem; opacity: .58; font-size: .7rem; }
  .reading-toolbar nav { display: flex; gap: .45rem; }
  .reading-toolbar button { border-color: rgb(60 60 60 / .12) !important; }
  .reader-dark .reading-toolbar button { border-color: rgb(255 255 255 / .12) !important; }
  .reading-toolbar nav button.active { color: var(--btn-content); border-color: var(--primary) !important; background: color-mix(in srgb, var(--primary) 11%, transparent); }
  .reading-scroll { overflow: visible; }
  .reading-paper { width: min(var(--reader-width),calc(100% - 2rem)); min-height: calc(100dvh - 4rem); margin: 0 auto; padding: clamp(3rem,8vw,7rem) 0 5rem; }
  .chapter-index { margin: 0 0 .75rem; opacity: .5; font: 700 .7rem/1 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .12em; }
  .reading-paper h1 { margin: 0; font-size: clamp(1.65rem,4vw,2.4rem); line-height: 1.2; letter-spacing: -.035em; }
  .chapter-rule { width: 3.5rem; height: 3px; margin: 1.5rem 0 2.6rem; border-radius: 2rem; background: var(--primary); }
  .chapter-content { font-size: var(--reader-font-size); line-height: var(--reader-line-height); letter-spacing: .025em; white-space: pre-wrap; overflow-wrap: anywhere; }
  .chapter-content mark { padding: .05em .12em; border-radius: .18em; color: inherit; background: color-mix(in srgb, #eab308 34%, transparent); }
  .translation-notice { display: flex; align-items: center; gap: .55rem; margin: 0 0 1.7rem; padding: .65rem .75rem; border-left: 2px solid var(--primary); color: color-mix(in srgb, currentColor 68%, transparent); background: color-mix(in srgb, var(--primary) 7%, transparent); font-size: .74rem; line-height: 1.45; break-inside: avoid; }
  .translation-notice span { flex: 1; }
  .translation-notice button { padding: .28rem .55rem; border: 1px solid currentColor; border-radius: .45rem; color: inherit; background: transparent; cursor: pointer; transition: transform .2s cubic-bezier(.16,1,.3,1), background .2s; }
  .translation-notice button:hover { background: color-mix(in srgb, currentColor 8%, transparent); }
  .translation-notice button:active { transform: scale(.96); }
  .translation-notice.has-error { border-color: #c2413a; color: #a83b35; background: color-mix(in srgb, #c2413a 7%, transparent); }
  .reader-dark .translation-notice.has-error { color: #f0a29d; }
  .bilingual-content { white-space: normal; }
  .bilingual-paragraph { padding: 0 0 1.35em; margin: 0 0 1.35em; border-bottom: 1px solid rgb(60 60 60 / .09); }
  .reader-dark .bilingual-paragraph { border-color: rgb(255 255 255 / .08); }
  .source-paragraph, .translated-paragraph { margin: 0; white-space: pre-wrap; }
  .translated-paragraph { margin-top: .65em; padding-left: .9em; border-left: 2px solid color-mix(in srgb, var(--primary) 62%, transparent); opacity: .7; font-size: .82em; line-height: 1.78; letter-spacing: .01em; }
  .translation-placeholder { display: block; width: min(78%,30rem); height: .72em; margin-top: .9em; border-radius: .2rem; background: color-mix(in srgb, currentColor 9%, transparent); animation: translation-pulse 1.2s ease-in-out infinite alternate; }
  @keyframes translation-pulse { to { opacity: .35; transform: scaleX(.92); transform-origin: left; } }
  .chapter-navigation { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: .75rem; margin-top: 5rem; padding-top: 1.5rem; border-top: 1px solid rgb(60 60 60 / .12); }
  .reader-dark .chapter-navigation { border-color: rgb(255 255 255 / .1); }
  .chapter-navigation button { display: inline-flex; align-items: center; gap: .4rem; width: fit-content; padding: .6rem .8rem; border: 1px solid rgb(60 60 60 / .14); border-radius: .65rem; color: inherit; background: transparent; cursor: pointer; }
  .chapter-navigation button:last-child { justify-self: end; }
  .chapter-navigation button:disabled { opacity: .3; cursor: not-allowed; }
  .chapter-navigation span { opacity: .5; font: .72rem/1 ui-monospace, SFMono-Regular, Consolas, monospace; }
  .paged-reader { position: relative; height: calc(100dvh - 4rem); overflow: hidden; }
  .paged-viewport { width: min(var(--reader-width),calc(100% - 2rem)); height: calc(100% - 3.5rem); margin: 0 auto; overflow: hidden; scroll-behavior: smooth; }
  .paged-content { width: var(--page-width); height: var(--page-height); padding: clamp(2rem,5vw,4rem) 0; column-width: var(--page-width); column-gap: 0; column-fill: auto; }
  .paged-content h1 { margin: 0; font-size: clamp(1.55rem,3vw,2.15rem); line-height: 1.2; letter-spacing: -.035em; }
  .paged-heading { break-inside: avoid; }
  .paged-controls { position: absolute; right: 0; bottom: 0; left: 0; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; height: 3.5rem; padding: 0 clamp(1rem,4vw,3rem); border-top: 1px solid rgb(60 60 60 / .1); background: color-mix(in srgb, currentColor 2%, transparent); }
  .paged-controls button { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border: 0; border-radius: .65rem; color: inherit; background: transparent; cursor: pointer; }
  .paged-controls button:last-child { justify-self: end; }
  .paged-controls button:disabled { opacity: .25; cursor: not-allowed; }
  .paged-controls span { opacity: .55; font: .72rem/1 ui-monospace, SFMono-Regular, Consolas, monospace; }
  .reader-backdrop { position: fixed; inset: 0; z-index: 4; background: rgb(12 14 17 / .48); backdrop-filter: blur(4px); }
  .chapter-drawer, .search-drawer, .settings-drawer { position: fixed; top: 0; right: 0; bottom: 0; z-index: 5; width: min(25rem,90vw); padding: 1.25rem; color: #292b30; background: #f8f8f6; box-shadow: -20px 0 60px rgb(0 0 0 / .16); animation: drawer-enter .35s cubic-bezier(.16,1,.3,1); }
  .reader-dark .chapter-drawer, .reader-dark .search-drawer, .reader-dark .settings-drawer { color: #e4e4e1; background: #25272b; }
  @keyframes drawer-enter { from { transform: translateX(100%); } to { transform: translateX(0); } }
  .chapter-drawer header, .search-drawer header, .settings-drawer header { padding-bottom: 1rem; border-bottom: 1px solid rgb(60 60 60 / .1); }
  .reader-dark .chapter-drawer header, .reader-dark .search-drawer header, .reader-dark .settings-drawer header { border-color: rgb(255 255 255 / .1); }
  .chapter-drawer header strong, .search-drawer header strong, .settings-drawer header strong { display: block; margin-top: .2rem; font-size: 1.05rem; }
  .chapter-drawer nav { height: calc(100% - 4rem); overflow: auto; padding-top: .5rem; }
  .chapter-drawer nav button { display: grid; grid-template-columns: 2.2rem minmax(0,1fr); gap: .65rem; width: 100%; padding: .78rem .65rem; border: 0; border-radius: .55rem; text-align: left; color: inherit; background: transparent; cursor: pointer; }
  .chapter-drawer nav button:hover { background: rgb(80 80 80 / .06); }
  .chapter-drawer nav button.active { color: var(--btn-content); background: color-mix(in srgb, var(--primary) 13%, transparent); }
  .chapter-drawer nav span { opacity: .45; font: .7rem/1.5 ui-monospace, SFMono-Regular, Consolas, monospace; }
  .chapter-drawer nav strong { overflow: hidden; font-size: .84rem; text-overflow: ellipsis; white-space: nowrap; }
  .search-field { display: grid; gap: .5rem; padding: 1rem 0; }
  .search-field > span { font-size: .76rem; font-weight: 700; }
  .search-field > div { display: flex; align-items: center; gap: .55rem; padding: .7rem .75rem; border: 1px solid rgb(60 60 60 / .14); border-radius: .7rem; }
  .reader-dark .search-field > div { border-color: rgb(255 255 255 / .12); }
  .search-field input { min-width: 0; flex: 1; border: 0; outline: 0; color: inherit; background: transparent; }
  .search-results { height: calc(100% - 8.5rem); overflow: auto; border-top: 1px solid rgb(60 60 60 / .1); }
  .search-results button { display: grid; gap: .38rem; width: 100%; padding: .9rem .25rem; border: 0; border-bottom: 1px solid rgb(60 60 60 / .08); text-align: left; color: inherit; background: transparent; cursor: pointer; }
  .search-results button:hover { color: var(--btn-content); }
  .search-results strong { font-size: .84rem; }
  .search-results span { display: -webkit-box; overflow: hidden; opacity: .62; font-size: .76rem; line-height: 1.55; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  .search-empty { margin: 1.4rem .2rem; opacity: .55; font-size: .8rem; line-height: 1.6; }
  .settings-drawer > label { display: grid; gap: .8rem; padding: 1.2rem 0; border-bottom: 1px solid rgb(60 60 60 / .1); }
  .reader-dark .settings-drawer > label { border-color: rgb(255 255 255 / .1); }
  .settings-drawer label > span { display: flex; justify-content: space-between; font-size: .84rem; }
  .settings-drawer output { opacity: .55; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
  .settings-drawer input[type="range"] { width: 100%; accent-color: var(--primary); }
  .mode-field { padding: 1.2rem 0; border-bottom: 1px solid rgb(60 60 60 / .1); }
  .mode-field > strong { font-size: .84rem; }
  .mode-field > div { display: grid; grid-template-columns: 1fr 1fr; gap: .55rem; margin-top: .75rem; }
  .mode-field button { display: flex; align-items: center; justify-content: center; gap: .4rem; padding: .65rem; border: 1px solid rgb(60 60 60 / .12); border-radius: .65rem; color: inherit; background: transparent; cursor: pointer; }
  .mode-field button.active { border-color: var(--primary); color: var(--btn-content); background: color-mix(in srgb, var(--primary) 10%, transparent); }
  .translation-field { display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: center; gap: 1rem; padding: 1.2rem 0; border-bottom: 1px solid rgb(60 60 60 / .1); }
  .reader-dark .translation-field { border-color: rgb(255 255 255 / .1); }
  .translation-field > div { display: grid; gap: .3rem; }
  .translation-field strong { font-size: .84rem; }
  .translation-field small { max-width: 15rem; opacity: .55; font-size: .7rem; line-height: 1.45; }
  .translation-field button { display: flex; align-items: center; gap: .45rem; padding: .35rem .4rem .35rem .65rem; border: 1px solid rgb(60 60 60 / .12); border-radius: 2rem; color: inherit; background: transparent; cursor: pointer; }
  .translation-field button span { font-size: .7rem; }
  .translation-field button i { position: relative; display: block; width: 2rem; height: 1.1rem; border-radius: 1rem; background: rgb(80 80 80 / .16); transition: background .25s cubic-bezier(.16,1,.3,1); }
  .translation-field button i::after { position: absolute; top: .15rem; left: .15rem; width: .8rem; height: .8rem; border-radius: 50%; background: currentColor; content: ""; transition: transform .25s cubic-bezier(.16,1,.3,1); }
  .translation-field button.active { color: var(--btn-content); border-color: var(--primary); }
  .translation-field button.active i { background: color-mix(in srgb, var(--primary) 42%, transparent); }
  .translation-field button.active i::after { transform: translateX(.9rem); }
  .theme-field { padding-top: 1.2rem; }
  .theme-field > strong { font-size: .84rem; }
  .theme-field > div { display: grid; grid-template-columns: repeat(4,1fr); gap: .55rem; margin-top: .8rem; }
  .theme-field button { display: grid; gap: .4rem; justify-items: center; padding: .55rem .3rem; border: 1px solid transparent; border-radius: .65rem; color: inherit; background: transparent; cursor: pointer; }
  .theme-field button.active { border-color: var(--primary); background: color-mix(in srgb, var(--primary) 10%, transparent); }
  .theme-field i { display: block; width: 2rem; height: 2rem; border: 1px solid rgb(80 80 80 / .14); border-radius: 50%; }
  .theme-field span { font-size: .7rem; }

  @media (max-width: 640px) {
    .reader-intro { grid-template-columns: 1fr; align-items: start; gap: 1.25rem; }
    .primary-action { width: 100%; }
    .empty-shelf { grid-template-columns: 1fr; justify-items: start; padding: 1.4rem; }
    .continue-reading { grid-template-columns: auto minmax(0,1fr); }
    .continue-button { grid-column: 1/-1; width: 100%; }
    .book-row { grid-template-columns: minmax(0,1fr) auto; }
    .book-actions span { display: none; }
    .book-percentage { display: none; }
    .book-progress { width: 85%; }
    .import-dialog { padding: 1.05rem; }
    .import-dialog footer { display: grid; grid-template-columns: 1fr 1fr; }
    .import-dialog footer .primary-action { width: auto; }
    .reading-toolbar { min-height: 3.65rem; }
    .reading-paper { width: calc(100% - 2rem); padding-top: 3.2rem; }
    .chapter-content { letter-spacing: .01em; }
  }

  @media (prefers-reduced-motion: reduce) {
    .book-row, .loading-line, .loading-grid div, .chapter-drawer, .settings-drawer { animation: none; opacity: 1; }
  }

  @media (prefers-color-scheme: dark) {
    .reading-stage:not(.reader-light):not(.reader-sepia):not(.reader-dark) { color: #d8d7d3; background: #1d1f22; }
  }
</style>
