export type ReaderEncoding =
	| "utf-8"
	| "gb18030"
	| "big5"
	| "utf-16le"
	| "utf-16be";

export type ReaderBook = {
	id: string;
	hash: string;
	title: string;
	author?: string;
	format: "txt" | "epub";
	encoding?: ReaderEncoding;
	cover?: Blob;
	fileSize: number;
	chapterCount: number;
	totalCharacters: number;
	createdAt: number;
	updatedAt: number;
};

export type BuiltInBook = {
	path: string;
	fileName: string;
	title: string;
	format: "txt" | "epub";
	hash: string;
	fileSize: number;
};

export type ReaderChapter = {
	id: string;
	bookId: string;
	index: number;
	title: string;
	content: string;
	characterCount: number;
	href?: string;
	manifestId?: string;
	cfiBase?: string;
	level?: number;
};

export type ReaderProgress = {
	bookId: string;
	chapterIndex: number;
	scrollRatio: number;
	cfi?: string;
	pageIndex?: number;
	percentage: number;
	updatedAt: number;
};

export type ReaderSettings = {
	id: "reader";
	fontSize: number;
	lineHeight: number;
	contentWidth: number;
	theme: "system" | "light" | "dark" | "sepia";
	readingMode: "scroll" | "paged";
	bilingual: boolean;
};

export type ReaderTranslation = {
	id: string;
	bookId: string;
	chapterIndex: number;
	paragraphIndex: number;
	sourceLanguage: "zh" | "en";
	targetLanguage: "zh" | "en";
	sourceText: string;
	translatedText: string;
	updatedAt: number;
};

export const DEFAULT_READER_SETTINGS: ReaderSettings = {
	id: "reader",
	fontSize: 20,
	lineHeight: 1.9,
	contentWidth: 760,
	theme: "system",
	readingMode: "scroll",
	bilingual: false,
};
