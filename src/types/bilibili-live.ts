export interface BilibiliLiveRoomConfig {
	roomId: number;
	name?: string;
	/** 站内直播列表分区，例如 DOTA2、英雄联盟 */
	category?: string;
	cover?: string;
	description?: string;
}

export interface BilibiliLiveRoom extends BilibiliLiveRoomConfig {
	canonicalRoomId: number;
	title: string;
	anchorName: string;
	coverUrl: string;
	areaName: string;
	/** -1=状态未知，0=未开播，1=直播中，2=轮播中 */
	liveStatus: -1 | 0 | 1 | 2;
	online: number;
	metadataState: "loading" | "ready" | "fallback";
}
