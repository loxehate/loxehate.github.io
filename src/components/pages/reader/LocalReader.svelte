<script lang="ts">
import Icon from "@iconify/svelte";
import { onMount, tick } from "svelte";
import {
	deleteBook as deleteStoredBook,
	getAllProgress,
	getBookByHash,
	getBooks,
	getChapters,
	getProgress,
	getSettings,
	saveBook,
	saveProgress,
	saveSettings,
} from "@/lib/reader/db";
import {
	DEFAULT_READER_SETTINGS,
	type ReaderBook,
	type ReaderChapter,
	type ReaderEncoding,
	type ReaderProgress,
	type ReaderSettings,
} from "@/lib/reader/types";

type WorkerResponse = {
	requestId: number;
	type: "preview" | "parsed" | "error";
	encoding?: ReaderEncoding;
	preview?: string;
	chapters?: Array<{ title: string; content: string }>;
	totalCharacters?: number;
	message?: string;
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
let readerScroller = $state<HTMLElement>();
let progressTimer: number | undefined;

let fileInput = $state<HTMLInputElement>();
let selectedFile = $state<File | null>(null);
let importOpen = $state(false);
let importEncoding = $state<ReaderEncoding>("utf-8");
let importPreview = $state("");
let importError = $state("");
let importing = $state(false);
let previewing = $state(false);
let bookToDelete = $state<ReaderBook | null>(null);

let worker: Worker | undefined;
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

const ENCODINGS: Array<{ value: ReaderEncoding; label: string }> = [
	{ value: "utf-8", label: "UTF-8" },
	{ value: "gb18030", label: "GBK / GB18030" },
	{ value: "big5", label: "Big5" },
	{ value: "utf-16le", label: "UTF-16 LE" },
	{ value: "utf-16be", label: "UTF-16 BE" },
];

function callWorker(
	action: "preview" | "parse",
	buffer: ArrayBuffer,
	encoding?: ReaderEncoding,
): Promise<WorkerResponse> {
	if (!worker) return Promise.reject(new Error("文本解析器尚未准备完成"));
	const id = ++requestId;
	return new Promise((resolve, reject) => {
		pending.set(id, { resolve, reject });
		worker?.postMessage({ requestId: id, action, buffer, encoding }, [buffer]);
	});
}

async function refreshShelf() {
	const [storedBooks, storedProgress] = await Promise.all([
		getBooks(),
		getAllProgress(),
	]);
	books = storedBooks;
	progressByBook = Object.fromEntries(
		storedProgress.map((item) => [item.bookId, item]),
	);
}

onMount(() => {
	worker = new Worker(
		new URL("../../../workers/txt-reader.worker.ts", import.meta.url),
		{
			type: "module",
		},
	);
	worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
		const response = event.data;
		const callback = pending.get(response.requestId);
		if (!callback) return;
		pending.delete(response.requestId);
		if (response.type === "error")
			callback.reject(new Error(response.message || "文本解析失败"));
		else callback.resolve(response);
	};
	worker.onerror = () => {
		for (const callback of pending.values())
			callback.reject(new Error("文本解析器运行失败"));
		pending.clear();
	};

	void (async () => {
		try {
			const storedSettings = await getSettings();
			if (storedSettings) settings = storedSettings;
			settingsReady = true;
			await refreshShelf();
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
		worker?.terminate();
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
	const previousOverflow = document.body.style.overflow;
	document.body.style.overflow = "hidden";
	return () => {
		document.body.style.overflow = previousOverflow;
	};
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
	if (!file.name.toLowerCase().endsWith(".txt")) {
		fatalError = "第一阶段仅支持 TXT 文件";
		return;
	}
	if (file.size > 50 * 1024 * 1024) {
		fatalError = "文件不能超过 50MB";
		return;
	}
	selectedFile = file;
	importOpen = true;
	importError = "";
	await updatePreview();
}

async function updatePreview(encoding?: ReaderEncoding) {
	if (!selectedFile) return;
	previewing = true;
	importError = "";
	try {
		const result = await callWorker(
			"preview",
			await selectedFile.arrayBuffer(),
			encoding,
		);
		importEncoding = result.encoding ?? encoding ?? "utf-8";
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

async function importSelectedFile() {
	if (!selectedFile || importing) return;
	importing = true;
	importError = "";
	try {
		const buffer = await selectedFile.arrayBuffer();
		const hash = await sha256(buffer);
		if (await getBookByHash(hash)) throw new Error("这本书已经在书架中");
		const result = await callWorker("parse", buffer, importEncoding);
		const parsedChapters = result.chapters ?? [];
		if (parsedChapters.length === 0) throw new Error("没有识别到可阅读的文本");

		const id = crypto.randomUUID();
		const now = Date.now();
		const book: ReaderBook = {
			id,
			hash,
			title: selectedFile.name.replace(/\.txt$/i, ""),
			format: "txt",
			encoding: result.encoding ?? importEncoding,
			fileSize: selectedFile.size,
			chapterCount: parsedChapters.length,
			totalCharacters: result.totalCharacters ?? 0,
			createdAt: now,
			updatedAt: now,
		};
		const chapterRows: ReaderChapter[] = parsedChapters.map(
			(chapter, index) => ({
				id: `${id}:${index}`,
				bookId: id,
				index,
				title: chapter.title,
				content: chapter.content,
				characterCount: chapter.content.length,
			}),
		);
		await saveBook(book, chapterRows);
		await refreshShelf();
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
		view = "reader";
		drawerOpen = false;
		settingsOpen = false;
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?book=${book.id}`,
		);
		await tick();
		restoreScroll(storedProgress?.scrollRatio ?? 0);
	} catch (error) {
		fatalError = error instanceof Error ? error.message : "无法打开书籍";
	}
}

function restoreScroll(ratio: number) {
	requestAnimationFrame(() => {
		if (!readerScroller) return;
		const maximum = Math.max(
			0,
			readerScroller.scrollHeight - readerScroller.clientHeight,
		);
		readerScroller.scrollTop = maximum * Math.max(0, Math.min(1, ratio));
	});
}

function currentScrollRatio() {
	if (!readerScroller) return 0;
	const maximum = readerScroller.scrollHeight - readerScroller.clientHeight;
	return maximum > 0 ? readerScroller.scrollTop / maximum : 0;
}

async function persistCurrentProgress() {
	if (!currentBook || chapters.length === 0) return;
	const ratio = currentScrollRatio();
	const progress: ReaderProgress = {
		bookId: currentBook.id,
		chapterIndex: currentChapterIndex,
		scrollRatio: ratio,
		percentage: ((currentChapterIndex + ratio) / chapters.length) * 100,
		updatedAt: Date.now(),
	};
	progressByBook[currentBook.id] = progress;
	await saveProgress(progress);
}

function handleReaderScroll() {
	if (progressTimer) window.clearTimeout(progressTimer);
	progressTimer = window.setTimeout(() => void persistCurrentProgress(), 260);
}

async function selectChapter(index: number) {
	if (index < 0 || index >= chapters.length || index === currentChapterIndex) {
		drawerOpen = false;
		return;
	}
	await persistCurrentProgress();
	currentChapterIndex = index;
	drawerOpen = false;
	await tick();
	if (readerScroller) readerScroller.scrollTop = 0;
	if (currentBook) {
		const progress: ReaderProgress = {
			bookId: currentBook.id,
			chapterIndex: currentChapterIndex,
			scrollRatio: 0,
			percentage: (currentChapterIndex / chapters.length) * 100,
			updatedAt: Date.now(),
		};
		progressByBook[currentBook.id] = progress;
		await saveProgress(progress);
	}
}

async function closeReader() {
	await persistCurrentProgress();
	view = "shelf";
	currentBook = null;
	chapters = [];
	window.history.replaceState({}, "", window.location.pathname);
	await refreshShelf();
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
	if (view !== "reader" || drawerOpen || settingsOpen) return;
	if (event.key === "ArrowLeft") void selectChapter(currentChapterIndex - 1);
	if (event.key === "ArrowRight") void selectChapter(currentChapterIndex + 1);
	if (event.key === "Escape") void closeReader();
}
</script>

<svelte:window onkeydown={handleKeyboard} />

<div class="local-reader-shell">
  <input bind:this={fileInput} onchange={handleFileSelection} type="file" accept=".txt,text/plain" class="sr-only" />

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
        <p>小说只保存在当前浏览器中，不会上传到服务器。支持 UTF-8、GBK、GB18030 与 Big5 编码的 TXT 文件。</p>
      </div>
      <button type="button" class="primary-action" onclick={chooseFile}>
        <Icon icon="material-symbols:add-rounded" width="22" />
        导入 TXT
      </button>
    </section>

    {#if books.length === 0}
      <section class="empty-shelf">
        <div class="empty-mark" aria-hidden="true">
          <Icon icon="material-symbols:auto-stories-outline-rounded" width="42" />
        </div>
        <div>
          <h3>书架还是空的</h3>
          <p>选择一本本地小说，系统会自动识别编码和章节。单个文件最大支持 50MB。</p>
        </div>
        <button type="button" class="secondary-action" onclick={chooseFile}>选择小说</button>
      </section>
    {:else}
      {#if latestBook}
        <section class="continue-reading">
          <div class="continue-cover" aria-hidden="true">{latestBook.title.slice(0, 1)}</div>
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
          <span>{books.length} 本本地小说</span>
        </div>
      </div>

      <section class="book-grid">
        {#each books as book, index (book.id)}
          <article class="book-row" style={`--row-index: ${index}`}>
            <button type="button" class="book-main" onclick={() => openBook(book)} aria-label={`阅读 ${book.title}`}>
              <span class="book-cover" aria-hidden="true">{book.title.slice(0, 1)}</span>
              <span class="book-copy">
                <strong>{book.title}</strong>
                <small>{book.chapterCount} 章 · {formatBytes(book.fileSize)} · {book.encoding.toUpperCase()}</small>
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
          <h2 id="import-title">{selectedFile.name}</h2>
        </div>
        <button type="button" onclick={closeImport} aria-label="关闭导入窗口">
          <Icon icon="material-symbols:close-rounded" width="22" />
        </button>
      </header>

      <div class="file-facts">
        <span><Icon icon="material-symbols:description-outline-rounded" width="18" /> TXT</span>
        <span>{formatBytes(selectedFile.size)}</span>
        <span>仅保存在本机</span>
      </div>

      <label class="encoding-field">
        <span>文本编码</span>
        <select value={importEncoding} onchange={changeEncoding} disabled={previewing || importing}>
          {#each ENCODINGS as encoding}
            <option value={encoding.value}>{encoding.label}</option>
          {/each}
        </select>
        <small>如果预览出现乱码，请手动切换编码。</small>
      </label>

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
        <button type="button" onclick={() => (drawerOpen = true)} aria-label="打开章节目录">
          <Icon icon="material-symbols:format-list-bulleted-rounded" width="23" />
        </button>
        <button type="button" onclick={() => (settingsOpen = true)} aria-label="打开阅读设置">
          <Icon icon="material-symbols:text-fields-rounded" width="23" />
        </button>
      </nav>
    </header>

    <main bind:this={readerScroller} onscroll={handleReaderScroll} class="reading-scroll">
      <article class="reading-paper">
        <p class="chapter-index">第 {currentChapterIndex + 1} / {chapters.length} 章</p>
        <h1>{currentChapter.title}</h1>
        <div class="chapter-rule"></div>
        <div class="chapter-content">{currentChapter.content}</div>
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
    </main>

    {#if drawerOpen}
      <div class="reader-backdrop" role="presentation" onclick={() => (drawerOpen = false)}></div>
      <aside class="chapter-drawer" aria-label="章节目录">
        <header>
          <div><span>章节目录</span><strong>{chapters.length} 章</strong></div>
          <button type="button" onclick={() => (drawerOpen = false)} aria-label="关闭章节目录"><Icon icon="material-symbols:close-rounded" width="22" /></button>
        </header>
        <nav>
          {#each chapters as chapter (chapter.id)}
            <button class:active={chapter.index === currentChapterIndex} type="button" onclick={() => selectChapter(chapter.index)}>
              <span>{String(chapter.index + 1).padStart(2, "0")}</span>
              <strong>{chapter.title}</strong>
            </button>
          {/each}
        </nav>
      </aside>
    {/if}

    {#if settingsOpen}
      <div class="reader-backdrop" role="presentation" onclick={() => (settingsOpen = false)}></div>
      <aside class="settings-drawer" aria-label="阅读设置">
        <header>
          <div><span>阅读设置</span><strong>实时生效</strong></div>
          <button type="button" onclick={() => (settingsOpen = false)} aria-label="关闭阅读设置"><Icon icon="material-symbols:close-rounded" width="22" /></button>
        </header>

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
  .import-dialog header, .chapter-drawer header, .settings-drawer header { display: flex; align-items: start; justify-content: space-between; gap: 1rem; }
  .import-dialog header span, .chapter-drawer header span, .settings-drawer header span { color: var(--content-meta); font-size: .72rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
  .import-dialog h2 { max-width: 34rem; margin: .25rem 0 0; overflow: hidden; font-size: 1.3rem; text-overflow: ellipsis; white-space: nowrap; }
  .import-dialog header button, .chapter-drawer header button, .settings-drawer header button, .reading-toolbar > button, .reading-toolbar nav button { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border: 1px solid var(--line-divider); border-radius: .7rem; color: inherit; background: transparent; cursor: pointer; }
  .file-facts { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.2rem 0; }
  .file-facts span { display: inline-flex; align-items: center; gap: .35rem; padding: .35rem .65rem; border-radius: 2rem; color: var(--content-meta); background: var(--btn-regular-bg); font-size: .75rem; }
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

  .reading-stage { position: fixed; inset: 0; z-index: 80; display: grid; grid-template-rows: auto minmax(0,1fr); color: #303238; background: #f6f5f1; }
  :global(.dark) .reading-stage:not(.reader-light):not(.reader-sepia):not(.reader-dark) { color: #d8d7d3; background: #1d1f22; }
  .reading-stage.reader-light { color: #303238; background: #f7f7f5; }
  .reading-stage.reader-sepia { color: #42392d; background: #eee4ce; }
  .reading-stage.reader-dark { color: #d8d7d3; background: #1d1f22; }
  .reading-toolbar { display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: .85rem; min-height: 4rem; padding: .6rem clamp(.75rem,3vw,2rem); border-bottom: 1px solid rgb(60 60 60 / .1); background: color-mix(in srgb, currentColor 2%, transparent); backdrop-filter: blur(16px); }
  .reader-dark .reading-toolbar { border-color: rgb(255 255 255 / .09); }
  .reading-toolbar > div { min-width: 0; }
  .reading-toolbar strong, .reading-toolbar span { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .reading-toolbar strong { font-size: .9rem; }
  .reading-toolbar span { margin-top: .15rem; opacity: .58; font-size: .7rem; }
  .reading-toolbar nav { display: flex; gap: .45rem; }
  .reading-toolbar button { border-color: rgb(60 60 60 / .12) !important; }
  .reader-dark .reading-toolbar button { border-color: rgb(255 255 255 / .12) !important; }
  .reading-scroll { overflow: auto; scroll-behavior: smooth; overscroll-behavior: contain; }
  .reading-paper { width: min(var(--reader-width),calc(100% - 2rem)); min-height: calc(100dvh - 4rem); margin: 0 auto; padding: clamp(3rem,8vw,7rem) 0 5rem; }
  .chapter-index { margin: 0 0 .75rem; opacity: .5; font: 700 .7rem/1 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .12em; }
  .reading-paper h1 { margin: 0; font-size: clamp(1.65rem,4vw,2.4rem); line-height: 1.2; letter-spacing: -.035em; }
  .chapter-rule { width: 3.5rem; height: 3px; margin: 1.5rem 0 2.6rem; border-radius: 2rem; background: var(--primary); }
  .chapter-content { font-size: var(--reader-font-size); line-height: var(--reader-line-height); letter-spacing: .025em; white-space: pre-wrap; overflow-wrap: anywhere; }
  .chapter-navigation { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: .75rem; margin-top: 5rem; padding-top: 1.5rem; border-top: 1px solid rgb(60 60 60 / .12); }
  .reader-dark .chapter-navigation { border-color: rgb(255 255 255 / .1); }
  .chapter-navigation button { display: inline-flex; align-items: center; gap: .4rem; width: fit-content; padding: .6rem .8rem; border: 1px solid rgb(60 60 60 / .14); border-radius: .65rem; color: inherit; background: transparent; cursor: pointer; }
  .chapter-navigation button:last-child { justify-self: end; }
  .chapter-navigation button:disabled { opacity: .3; cursor: not-allowed; }
  .chapter-navigation span { opacity: .5; font: .72rem/1 ui-monospace, SFMono-Regular, Consolas, monospace; }
  .reader-backdrop { position: absolute; inset: 0; z-index: 1; background: rgb(12 14 17 / .48); backdrop-filter: blur(4px); }
  .chapter-drawer, .settings-drawer { position: absolute; top: 0; right: 0; bottom: 0; z-index: 2; width: min(25rem,90vw); padding: 1.25rem; color: #292b30; background: #f8f8f6; box-shadow: -20px 0 60px rgb(0 0 0 / .16); animation: drawer-enter .35s cubic-bezier(.16,1,.3,1); }
  .reader-dark .chapter-drawer, .reader-dark .settings-drawer { color: #e4e4e1; background: #25272b; }
  @keyframes drawer-enter { from { transform: translateX(100%); } to { transform: translateX(0); } }
  .chapter-drawer header, .settings-drawer header { padding-bottom: 1rem; border-bottom: 1px solid rgb(60 60 60 / .1); }
  .reader-dark .chapter-drawer header, .reader-dark .settings-drawer header { border-color: rgb(255 255 255 / .1); }
  .chapter-drawer header strong, .settings-drawer header strong { display: block; margin-top: .2rem; font-size: 1.05rem; }
  .chapter-drawer nav { height: calc(100% - 4rem); overflow: auto; padding-top: .5rem; }
  .chapter-drawer nav button { display: grid; grid-template-columns: 2.2rem minmax(0,1fr); gap: .65rem; width: 100%; padding: .78rem .65rem; border: 0; border-radius: .55rem; text-align: left; color: inherit; background: transparent; cursor: pointer; }
  .chapter-drawer nav button:hover { background: rgb(80 80 80 / .06); }
  .chapter-drawer nav button.active { color: var(--btn-content); background: color-mix(in srgb, var(--primary) 13%, transparent); }
  .chapter-drawer nav span { opacity: .45; font: .7rem/1.5 ui-monospace, SFMono-Regular, Consolas, monospace; }
  .chapter-drawer nav strong { overflow: hidden; font-size: .84rem; text-overflow: ellipsis; white-space: nowrap; }
  .settings-drawer > label { display: grid; gap: .8rem; padding: 1.2rem 0; border-bottom: 1px solid rgb(60 60 60 / .1); }
  .reader-dark .settings-drawer > label { border-color: rgb(255 255 255 / .1); }
  .settings-drawer label > span { display: flex; justify-content: space-between; font-size: .84rem; }
  .settings-drawer output { opacity: .55; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
  .settings-drawer input[type="range"] { width: 100%; accent-color: var(--primary); }
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
    .reading-scroll { scroll-behavior: auto; }
  }

  @media (prefers-color-scheme: dark) {
    .reading-stage:not(.reader-light):not(.reader-sepia):not(.reader-dark) { color: #d8d7d3; background: #1d1f22; }
  }
</style>
