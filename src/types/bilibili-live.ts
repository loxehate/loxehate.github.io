export interface BilibiliLiveRoomConfig {
	roomId: number;
	name?: string;
	cover?: string;
	description?: string;
}

export interface BilibiliLiveRoom extends BilibiliLiveRoomConfig {
	canonicalRoomId: number;
	title: string;
	anchorName: string;
	coverUrl: string;
	areaName: string;
	liveStatus: 0 | 1 | 2;
	online: number;
	metadataState: "loading" | "ready" | "fallback";
}
