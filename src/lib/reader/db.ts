import type {
	ReaderBook,
	ReaderChapter,
	ReaderProgress,
	ReaderSettings,
	ReaderTranslation,
} from "./types";

const DB_NAME = "loxehate-local-reader";
const DB_VERSION = 3;

let dbPromise: Promise<IDBDatabase> | undefined;

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = () =>
			reject(request.error ?? new Error("数据库操作失败"));
	});
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
	return new Promise((resolve, reject) => {
		transaction.oncomplete = () => resolve();
		transaction.onerror = () =>
			reject(transaction.error ?? new Error("数据库事务失败"));
		transaction.onabort = () =>
			reject(transaction.error ?? new Error("数据库事务已取消"));
	});
}

export function openReaderDb(): Promise<IDBDatabase> {
	if (dbPromise) return dbPromise;
	dbPromise = new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains("books")) {
				const books = db.createObjectStore("books", { keyPath: "id" });
				books.createIndex("hash", "hash", { unique: true });
				books.createIndex("updatedAt", "updatedAt");
			}
			if (!db.objectStoreNames.contains("chapters")) {
				const chapters = db.createObjectStore("chapters", { keyPath: "id" });
				chapters.createIndex("bookId", "bookId");
			}
			if (!db.objectStoreNames.contains("progress")) {
				db.createObjectStore("progress", { keyPath: "bookId" });
			}
			if (!db.objectStoreNames.contains("settings")) {
				db.createObjectStore("settings", { keyPath: "id" });
			}
			if (!db.objectStoreNames.contains("translations")) {
				const translations = db.createObjectStore("translations", {
					keyPath: "id",
				});
				translations.createIndex("chapter", [
					"bookId",
					"chapterIndex",
					"targetLanguage",
				]);
				translations.createIndex("bookId", "bookId");
			}
		};
		request.onsuccess = () => {
			request.result.onversionchange = () => request.result.close();
			resolve(request.result);
		};
		request.onerror = () =>
			reject(request.error ?? new Error("无法打开本地书架"));
	});
	return dbPromise;
}

export async function getBooks(): Promise<ReaderBook[]> {
	const db = await openReaderDb();
	const books = await requestResult(
		db.transaction("books", "readonly").objectStore("books").getAll(),
	);
	return (books as ReaderBook[]).sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function getBookByHash(
	hash: string,
): Promise<ReaderBook | undefined> {
	const db = await openReaderDb();
	return requestResult(
		db
			.transaction("books", "readonly")
			.objectStore("books")
			.index("hash")
			.get(hash),
	) as Promise<ReaderBook | undefined>;
}

export async function getChapters(bookId: string): Promise<ReaderChapter[]> {
	const db = await openReaderDb();
	const rows = await requestResult(
		db
			.transaction("chapters", "readonly")
			.objectStore("chapters")
			.index("bookId")
			.getAll(bookId),
	);
	return (rows as ReaderChapter[]).sort((a, b) => a.index - b.index);
}

export async function saveBook(
	book: ReaderBook,
	chapters: ReaderChapter[],
): Promise<void> {
	const db = await openReaderDb();
	const transaction = db.transaction(
		["books", "chapters", "progress"],
		"readwrite",
	);
	transaction.objectStore("books").put(book);
	const chapterStore = transaction.objectStore("chapters");
	for (const chapter of chapters) chapterStore.put(chapter);
	transaction.objectStore("progress").put({
		bookId: book.id,
		chapterIndex: 0,
		scrollRatio: 0,
		percentage: 0,
		updatedAt: Date.now(),
	} satisfies ReaderProgress);
	await transactionDone(transaction);
}

export async function deleteBook(bookId: string): Promise<void> {
	const db = await openReaderDb();
	const [chapterKeys, translationKeys] = await Promise.all([
		requestResult(
			db
				.transaction("chapters", "readonly")
				.objectStore("chapters")
				.index("bookId")
				.getAllKeys(bookId),
		),
		requestResult(
			db
				.transaction("translations", "readonly")
				.objectStore("translations")
				.index("bookId")
				.getAllKeys(bookId),
		),
	]);
	const transaction = db.transaction(
		["books", "chapters", "progress", "translations"],
		"readwrite",
	);
	transaction.objectStore("books").delete(bookId);
	transaction.objectStore("progress").delete(bookId);
	for (const key of chapterKeys)
		transaction.objectStore("chapters").delete(key);
	for (const key of translationKeys)
		transaction.objectStore("translations").delete(key);
	await transactionDone(transaction);
}

export async function getProgress(
	bookId: string,
): Promise<ReaderProgress | undefined> {
	const db = await openReaderDb();
	return requestResult(
		db.transaction("progress", "readonly").objectStore("progress").get(bookId),
	) as Promise<ReaderProgress | undefined>;
}

export async function saveProgress(progress: ReaderProgress): Promise<void> {
	const db = await openReaderDb();
	const book = (await requestResult(
		db
			.transaction("books", "readonly")
			.objectStore("books")
			.get(progress.bookId),
	)) as ReaderBook | undefined;
	const transaction = db.transaction(["progress", "books"], "readwrite");
	transaction.objectStore("progress").put(progress);
	if (book) {
		transaction
			.objectStore("books")
			.put({ ...book, updatedAt: progress.updatedAt });
	}
	await transactionDone(transaction);
}

export async function getAllProgress(): Promise<ReaderProgress[]> {
	const db = await openReaderDb();
	return requestResult(
		db.transaction("progress", "readonly").objectStore("progress").getAll(),
	) as Promise<ReaderProgress[]>;
}

export async function getSettings(): Promise<ReaderSettings | undefined> {
	const db = await openReaderDb();
	return requestResult(
		db
			.transaction("settings", "readonly")
			.objectStore("settings")
			.get("reader"),
	) as Promise<ReaderSettings | undefined>;
}

export async function saveSettings(settings: ReaderSettings): Promise<void> {
	const db = await openReaderDb();
	const transaction = db.transaction("settings", "readwrite");
	transaction.objectStore("settings").put(settings);
	await transactionDone(transaction);
}

export async function getChapterTranslations(
	bookId: string,
	chapterIndex: number,
	targetLanguage: "zh" | "en",
): Promise<ReaderTranslation[]> {
	const db = await openReaderDb();
	return requestResult(
		db
			.transaction("translations", "readonly")
			.objectStore("translations")
			.index("chapter")
			.getAll([bookId, chapterIndex, targetLanguage]),
	) as Promise<ReaderTranslation[]>;
}

export async function saveTranslation(
	translation: ReaderTranslation,
): Promise<void> {
	const db = await openReaderDb();
	const transaction = db.transaction("translations", "readwrite");
	transaction.objectStore("translations").put(translation);
	await transactionDone(transaction);
}
