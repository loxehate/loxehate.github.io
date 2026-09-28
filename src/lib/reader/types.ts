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
	format: "txt";
	encoding: ReaderEncoding;
	fileSize: number;
	chapterCount: number;
	totalCharacters: number;
	createdAt: number;
	updatedAt: number;
};

export type ReaderChapter = {
	id: string;
	bookId: string;
	index: number;
	title: string;
	content: string;
	characterCount: number;
};

export type ReaderProgress = {
	bookId: string;
	chapterIndex: number;
	scrollRatio: number;
	percentage: number;
	updatedAt: number;
};

export type ReaderSettings = {
	id: "reader";
	fontSize: number;
	lineHeight: number;
	contentWidth: number;
	theme: "system" | "light" | "dark" | "sepia";
};

export const DEFAULT_READER_SETTINGS: ReaderSettings = {
	id: "reader",
	fontSize: 20,
	lineHeight: 1.9,
	contentWidth: 760,
	theme: "system",
};
