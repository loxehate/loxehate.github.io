import type {
	BilibiliLiveRoom,
	BilibiliLiveRoomConfig,
} from "@/types/bilibili-live";

interface BilibiliPayload<T> {
	code: number;
	message?: string;
	msg?: string;
	data?: T;
}

interface RoomInitData {
	room_id?: number;
}

interface RoomInfoData {
	room_id?: number;
	title?: string;
	user_cover?: string;
	cover?: string;
	keyframe?: string;
	background?: string;
	parent_area_name?: string;
	area_name?: string;
	live_status?: number;
	online?: number;
}

export async function loadBilibiliLiveRooms(
	rooms: BilibiliLiveRoomConfig[],
): Promise<BilibiliLiveRoom[]> {
	return Promise.all(rooms.map(loadBilibiliLiveRoom));
}

async function loadBilibiliLiveRoom(
	room: BilibiliLiveRoomConfig,
): Promise<BilibiliLiveRoom> {
	let canonicalRoomId = room.roomId;

	try {
		const initEndpoint = new URL(
			"https://api.live.bilibili.com/room/v1/Room/room_init",
		);
		initEndpoint.searchParams.set("id", String(room.roomId));
		const init = await fetchBilibiliJson<RoomInitData>(
			initEndpoint,
			room.roomId,
		);
		if (init.code === 0 && Number.isSafeInteger(Number(init.data?.room_id))) {
			canonicalRoomId = Number(init.data?.room_id);
		}
	} catch (error) {
		console.warn(
			`[Bilibili Live] Failed to resolve room ${room.roomId}; using configured id`,
			error,
		);
	}

	try {
		const infoEndpoint = new URL(
			"https://api.live.bilibili.com/room/v1/Room/get_info",
		);
		infoEndpoint.searchParams.set("room_id", String(canonicalRoomId));
		const payload = await fetchBilibiliJson<RoomInfoData>(
			infoEndpoint,
			canonicalRoomId,
		);
		if (payload.code !== 0 || !payload.data) {
			throw new Error(payload.message || payload.msg || "Invalid room response");
		}

		const info = payload.data;
		return {
			...room,
			canonicalRoomId: Number(info.room_id || canonicalRoomId),
			title: info.title || room.name || `直播间 ${room.roomId}`,
			anchorName: room.name || "Bilibili 主播",
			coverUrl: toHttps(
				info.keyframe ||
					info.user_cover ||
					info.cover ||
					info.background ||
					room.cover ||
					"",
			),
			areaName:
				[info.parent_area_name, info.area_name].filter(Boolean).join(" · ") ||
				"Bilibili 直播",
			liveStatus: normalizeLiveStatus(info.live_status),
			online: Number(info.online || 0),
			metadataState: "ready",
		};
	} catch (error) {
		console.warn(
			`[Bilibili Live] Failed to load room ${canonicalRoomId} at build time`,
			error,
		);
		return createFallbackRoom(room, canonicalRoomId);
	}
}

async function fetchBilibiliJson<T>(
	endpoint: URL,
	refererRoomId: number,
): Promise<BilibiliPayload<T>> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 8000);
	try {
		const response = await fetch(endpoint, {
			headers: {
				Accept: "application/json",
				Referer: `https://live.bilibili.com/${refererRoomId}`,
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/141 Safari/537.36",
			},
			signal: controller.signal,
		});
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		return (await response.json()) as BilibiliPayload<T>;
	} finally {
		clearTimeout(timeout);
	}
}

function createFallbackRoom(
	room: BilibiliLiveRoomConfig,
	canonicalRoomId: number,
): BilibiliLiveRoom {
	return {
		...room,
		canonicalRoomId,
		title: room.name || `直播间 ${room.roomId}`,
		anchorName: room.name || "Bilibili 主播",
		coverUrl: toHttps(room.cover || ""),
		areaName: "Bilibili 直播",
		liveStatus: -1,
		online: 0,
		metadataState: "fallback",
	};
}

function normalizeLiveStatus(status: unknown): 0 | 1 | 2 {
	const value = Number(status);
	return value === 1 || value === 2 ? value : 0;
}

function toHttps(url: string): string {
	return url.startsWith("//")
		? `https:${url}`
		: url.replace(/^http:\/\//, "https://");
}
