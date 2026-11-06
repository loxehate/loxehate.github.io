<script lang="ts">
import { onMount } from "svelte";
import type {
	BilibiliLiveRoom,
	BilibiliLiveRoomConfig,
} from "@/types/bilibili-live";

interface Props {
	rooms: BilibiliLiveRoomConfig[];
}

let { rooms }: Props = $props();
let liveRooms = $state<BilibiliLiveRoom[]>(rooms.map(createFallbackRoom));
let selectedRoom = $state<BilibiliLiveRoom | null>(null);
let playerLoading = $state(false);
let playerFailed = $state(false);
let playerSection: HTMLElement | null = $state(null);

const liveCount = $derived(
	liveRooms.filter((room) => room.liveStatus === 1).length,
);
const hasMetadataFallback = $derived(
	liveRooms.some((room) => room.metadataState === "fallback"),
);

onMount(() => {
	void loadRoomMetadata();
});

function createFallbackRoom(room: BilibiliLiveRoomConfig): BilibiliLiveRoom {
	return {
		...room,
		canonicalRoomId: room.roomId,
		title: room.name || `直播间 ${room.roomId}`,
		anchorName: room.name || "Bilibili 主播",
		coverUrl: room.cover || "",
		areaName: "Bilibili 直播",
		liveStatus: 0,
		online: 0,
		metadataState: "loading",
	};
}

async function fetchRoomMetadata(
	room: BilibiliLiveRoomConfig,
): Promise<BilibiliLiveRoom> {
	const endpoint = new URL(
		"https://api.live.bilibili.com/xlive/web-room/v1/index/getInfoByRoom",
	);
	endpoint.searchParams.set("room_id", String(room.roomId));

	try {
		const response = await fetch(endpoint, {
			headers: { Accept: "application/json" },
			credentials: "omit",
		});
		if (!response.ok) throw new Error(`HTTP ${response.status}`);

		const payload = await response.json();
		if (payload.code !== 0 || !payload.data?.room_info) {
			throw new Error(payload.message || "Invalid Bilibili response");
		}

		const info = payload.data.room_info;
		const anchor = payload.data.anchor_info?.base_info;
		return {
			...room,
			canonicalRoomId: Number(info.room_id || room.roomId),
			title: info.title || room.name || `直播间 ${room.roomId}`,
			anchorName: anchor?.uname || room.name || "Bilibili 主播",
			coverUrl: toHttps(info.cover || info.keyframe || room.cover || ""),
			areaName:
				[info.parent_area_name, info.area_name].filter(Boolean).join(" · ") ||
				"Bilibili 直播",
			liveStatus: normalizeLiveStatus(info.live_status),
			online: Number(info.online || 0),
			metadataState: "ready",
		};
	} catch (error) {
		console.warn(`[Bilibili Live] Failed to load room ${room.roomId}:`, error);
		return { ...createFallbackRoom(room), metadataState: "fallback" };
	}
}

async function loadRoomMetadata() {
	if (rooms.length === 0) return;
	liveRooms = await Promise.all(rooms.map(fetchRoomMetadata));
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

function roomUrl(room: BilibiliLiveRoom): string {
	return `https://live.bilibili.com/${room.canonicalRoomId || room.roomId}`;
}

function playerUrl(room: BilibiliLiveRoom): string {
	const params = new URLSearchParams({
		cid: String(room.canonicalRoomId || room.roomId),
		quality: "1",
		danmaku: "1",
		fullscreen: "1",
		entrance: "1",
		reload: "1",
		recommend: "0",
	});
	return `https://www.bilibili.com/blackboard/live/live-activity-player.html?${params}`;
}

function playRoom(room: BilibiliLiveRoom) {
	selectedRoom = room;
	playerLoading = true;
	playerFailed = false;
	requestAnimationFrame(() => {
		playerSection?.scrollIntoView({ behavior: "smooth", block: "start" });
	});
}

function closePlayer() {
	selectedRoom = null;
	playerLoading = false;
	playerFailed = false;
}

function formatOnline(value: number): string {
	if (value >= 10000) return `${(value / 10000).toFixed(1)}万`;
	return value.toLocaleString("zh-CN");
}

function statusLabel(status: number): string {
	if (status === 1) return "直播中";
	if (status === 2) return "轮播中";
	return "未开播";
}
</script>

{#if rooms.length === 0}
	<section class="empty-state" aria-labelledby="live-empty-title">
		<div class="empty-mark" aria-hidden="true">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path d="M15 10.5 19.5 8v8L15 13.5v-3Z" stroke-width="1.6" stroke-linejoin="round" />
				<rect x="3" y="5" width="12" height="14" rx="3" stroke-width="1.6" />
			</svg>
		</div>
		<div>
			<h2 id="live-empty-title">还没有配置直播间</h2>
			<p>
				在 <code>src/config/siteConfig.ts</code> 的 <code>bilibili.liveRooms</code>
				中加入房间号。房间号是直播间 URL 末尾的数字，不是 UID 或 visit_id。
			</p>
		</div>
	</section>
{:else}
	<section class="live-summary" aria-label="直播列表概览">
		<div>
			<p class="eyebrow">LIVE DIRECTORY</p>
			<h2>关注的直播间</h2>
			<p class="summary-copy">选择一个房间后才加载播放器，减少页面初始流量与资源占用。</p>
		</div>
		<div class="summary-metrics" aria-label="直播统计">
			<div><strong>{liveCount}</strong><span>正在直播</span></div>
			<div><strong>{liveRooms.length}</strong><span>全部房间</span></div>
		</div>
	</section>

	{#if hasMetadataFallback}
		<div class="metadata-notice" role="status">
			<span aria-hidden="true"></span>
			部分直播状态暂时无法获取，播放器与 B 站外链仍可正常使用。
		</div>
	{/if}

	{#if selectedRoom}
		<section class="player-shell" bind:this={playerSection} aria-label={`${selectedRoom.title} 播放器`}>
			<header class="player-header">
				<div class="player-title-block">
					<span class:live={selectedRoom.liveStatus === 1} class="status-dot" aria-hidden="true"></span>
					<div><p>{selectedRoom.anchorName}</p><h2>{selectedRoom.title}</h2></div>
				</div>
				<div class="player-actions">
					<a href={roomUrl(selectedRoom)} target="_blank" rel="noopener noreferrer">
						前往 Bilibili
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
					</a>
					<button type="button" onclick={closePlayer} aria-label="关闭播放器">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17" stroke-width="1.8" stroke-linecap="round" /></svg>
					</button>
				</div>
			</header>

			<div class="player-frame">
				{#if playerLoading}
					<div class="player-skeleton" aria-label="播放器正在加载"><div></div><p>正在连接 Bilibili 播放器</p></div>
				{/if}
				<iframe
					src={playerUrl(selectedRoom)}
					title={`${selectedRoom.title} - Bilibili 直播播放器`}
					allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
					allowfullscreen
					referrerpolicy="strict-origin-when-cross-origin"
					onload={() => (playerLoading = false)}
					onerror={() => { playerLoading = false; playerFailed = true; }}
				></iframe>
				{#if playerFailed}
					<div class="player-error"><p>播放器加载失败，请前往 Bilibili 观看。</p><a href={roomUrl(selectedRoom)} target="_blank" rel="noopener noreferrer">打开直播间</a></div>
				{/if}
			</div>
			<footer class="player-fallback">
				<span>若播放器被浏览器或地区策略拦截，可使用官方页面继续观看。</span>
				<a href={roomUrl(selectedRoom)} target="_blank" rel="noopener noreferrer">打开官方直播间</a>
			</footer>
		</section>
	{/if}

	<div class="room-grid">
		{#each liveRooms as room, index (room.roomId)}
			<article class:active={selectedRoom?.roomId === room.roomId} class="room-card" style={`--reveal-delay: ${Math.min(index, 8) * 60}ms`}>
				<button type="button" class="room-select" onclick={() => playRoom(room)} aria-label={`播放 ${room.title}`}>
					<div class="cover-wrap">
						{#if room.coverUrl}
							<img src={room.coverUrl} alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" />
						{:else}
							<div class="cover-placeholder" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 10.5 19.5 8v8L15 13.5v-3Z" stroke-width="1.5" stroke-linejoin="round" /><rect x="3" y="5" width="12" height="14" rx="3" stroke-width="1.5" /></svg></div>
						{/if}
						<div class="cover-shade"></div>
						<div class:live={room.liveStatus === 1} class:loop={room.liveStatus === 2} class="status-badge"><span></span>{statusLabel(room.liveStatus)}</div>
						<div class="play-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="m9 7 8 5-8 5V7Z" /></svg></div>
					</div>
					<div class="room-content">
						<div class="room-meta"><span>{room.areaName}</span>{#if room.online > 0}<span>{formatOnline(room.online)} 人气</span>{/if}</div>
						<h3>{room.title}</h3>
						<p>{room.description || room.anchorName}</p>
					</div>
				</button>
				<a class="room-link" href={roomUrl(room)} target="_blank" rel="noopener noreferrer" aria-label={`在 Bilibili 打开 ${room.title}`}>
					<span>房间 {room.canonicalRoomId}</span>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
				</a>
			</article>
		{/each}
	</div>
{/if}

<style>
	.empty-state { display: grid; grid-template-columns: auto 1fr; gap: 1.25rem; align-items: center; padding: 2rem; border: 1px dashed var(--line-divider); border-radius: 1.25rem; background: color-mix(in srgb, var(--card-bg) 85%, transparent); }
	.empty-mark { display: grid; place-items: center; width: 4.5rem; height: 4.5rem; border-radius: 1.1rem; color: var(--primary); background: color-mix(in srgb, var(--primary) 10%, transparent); }
	.empty-mark svg { width: 2.2rem; height: 2.2rem; }
	.empty-state h2 { margin: 0 0 .45rem; font-size: 1.15rem; font-weight: 700; color: var(--deep-text); }
	.empty-state p { max-width: 62ch; margin: 0; color: var(--meta-divider); line-height: 1.7; }
	.empty-state code { padding: .15rem .38rem; border-radius: .35rem; background: var(--btn-regular-bg); color: var(--primary); font-size: .85em; }
	.live-summary { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: end; gap: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--line-divider); }
	.eyebrow { margin: 0 0 .35rem; color: var(--primary); font: 700 .7rem/1.2 ui-monospace, monospace; letter-spacing: .16em; }
	.live-summary h2 { margin: 0; color: var(--deep-text); font-size: clamp(1.35rem, 2vw, 1.8rem); letter-spacing: -.025em; }
	.summary-copy { margin: .55rem 0 0; color: var(--meta-divider); font-size: .9rem; }
	.summary-metrics { display: grid; grid-template-columns: repeat(2, minmax(5.5rem, auto)); gap: .65rem; }
	.summary-metrics div { display: flex; flex-direction: column; padding-left: 1rem; border-left: 1px solid var(--line-divider); }
	.summary-metrics strong { color: var(--deep-text); font: 700 1.5rem/1 ui-monospace, monospace; }
	.summary-metrics span { margin-top: .4rem; color: var(--meta-divider); font-size: .72rem; }
	.metadata-notice { display: flex; align-items: center; gap: .55rem; margin-top: 1rem; color: var(--meta-divider); font-size: .8rem; }
	.metadata-notice span { width: .45rem; height: .45rem; border-radius: 50%; background: #d49a38; }
	.player-shell { scroll-margin-top: 6rem; margin-top: 1.5rem; overflow: hidden; border: 1px solid var(--line-divider); border-radius: 1.25rem; background: var(--card-bg); box-shadow: 0 18px 45px -28px color-mix(in srgb, var(--primary) 35%, transparent); animation: reveal .35s cubic-bezier(.16,1,.3,1) both; }
	.player-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .9rem 1rem; }
	.player-title-block { display: flex; align-items: center; gap: .75rem; min-width: 0; }
	.player-title-block p { margin: 0 0 .1rem; color: var(--meta-divider); font-size: .72rem; }
	.player-title-block h2 { margin: 0; overflow: hidden; color: var(--deep-text); font-size: .95rem; text-overflow: ellipsis; white-space: nowrap; }
	.status-dot { flex: 0 0 auto; width: .6rem; height: .6rem; border-radius: 50%; background: #8b8b8b; }
	.status-dot.live { background: #d85d69; box-shadow: 0 0 0 5px color-mix(in srgb, #d85d69 15%, transparent); animation: breathe 2s ease-in-out infinite; }
	.player-actions { display: flex; align-items: center; gap: .45rem; }
	.player-actions a, .player-actions button { display: inline-flex; align-items: center; justify-content: center; gap: .35rem; height: 2rem; border: 1px solid var(--line-divider); border-radius: .65rem; background: var(--btn-regular-bg); color: var(--btn-content); font-size: .75rem; transition: transform .2s cubic-bezier(.16,1,.3,1), border-color .2s; }
	.player-actions a { padding: 0 .7rem; text-decoration: none; }
	.player-actions button { width: 2rem; cursor: pointer; }
	.player-actions svg { width: .9rem; height: .9rem; }
	.player-actions a:hover, .player-actions button:hover { border-color: color-mix(in srgb, var(--primary) 45%, var(--line-divider)); }
	.player-actions a:active, .player-actions button:active { transform: scale(.97); }
	.player-frame { position: relative; aspect-ratio: 16 / 9; background: #151517; }
	.player-frame iframe { display: block; width: 100%; height: 100%; border: 0; }
	.player-skeleton, .player-error { position: absolute; inset: 0; z-index: 1; display: grid; place-content: center; justify-items: center; gap: .8rem; background: #18181b; color: #d4d4d8; }
	.player-skeleton div { width: 7rem; height: .3rem; overflow: hidden; border-radius: 99px; background: #313136; }
	.player-skeleton div::after { content: ""; display: block; width: 45%; height: 100%; background: #d85d69; animation: loading 1s ease-in-out infinite alternate; }
	.player-skeleton p, .player-error p { margin: 0; font-size: .78rem; }
	.player-error a { color: #fff; text-decoration: underline; text-underline-offset: .25rem; }
	.player-fallback { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .75rem 1rem; color: var(--meta-divider); font-size: .75rem; }
	.player-fallback a { flex: 0 0 auto; color: var(--primary); font-weight: 600; text-decoration: none; }
	.room-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; margin-top: 1.5rem; }
	.room-card { overflow: hidden; border: 1px solid var(--line-divider); border-radius: 1.1rem; background: var(--card-bg); transition: transform .3s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s; animation: reveal .45s cubic-bezier(.16,1,.3,1) both; animation-delay: var(--reveal-delay); }
	.room-card:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--primary) 35%, var(--line-divider)); box-shadow: 0 16px 30px -25px color-mix(in srgb, var(--primary) 50%, transparent); }
	.room-card.active { border-color: color-mix(in srgb, var(--primary) 60%, var(--line-divider)); }
	.room-select { display: block; width: 100%; padding: 0; border: 0; background: transparent; color: inherit; text-align: left; cursor: pointer; }
	.room-select:active { transform: scale(.995); }
	.cover-wrap { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: color-mix(in srgb, var(--primary) 7%, var(--btn-regular-bg)); }
	.cover-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform .55s cubic-bezier(.16,1,.3,1); }
	.room-card:hover .cover-wrap img { transform: scale(1.035); }
	.cover-placeholder { display: grid; place-items: center; width: 100%; height: 100%; color: color-mix(in srgb, var(--primary) 55%, var(--meta-divider)); }
	.cover-placeholder svg { width: 3rem; height: 3rem; }
	.cover-shade { position: absolute; inset: 0; background: linear-gradient(to top, rgb(20 20 23 / .5), transparent 55%); }
	.status-badge { position: absolute; top: .75rem; left: .75rem; display: inline-flex; align-items: center; gap: .35rem; padding: .32rem .55rem; border-radius: .5rem; background: rgb(28 28 31 / .78); backdrop-filter: blur(8px); color: #f4f4f5; font-size: .68rem; font-weight: 650; }
	.status-badge span { width: .4rem; height: .4rem; border-radius: 50%; background: #a1a1aa; }
	.status-badge.live span { background: #ed6875; animation: breathe 2s ease-in-out infinite; }
	.status-badge.loop span { background: #d9a34a; }
	.play-mark { position: absolute; right: .75rem; bottom: .75rem; display: grid; place-items: center; width: 2.4rem; height: 2.4rem; border: 1px solid rgb(255 255 255 / .25); border-radius: 50%; background: rgb(20 20 23 / .55); backdrop-filter: blur(8px); color: #fff; transition: transform .25s cubic-bezier(.16,1,.3,1), background .25s; }
	.play-mark svg { width: 1.15rem; height: 1.15rem; }
	.room-card:hover .play-mark { transform: scale(1.08); background: color-mix(in srgb, var(--primary) 82%, transparent); }
	.room-content { padding: .95rem 1rem .8rem; }
	.room-meta { display: flex; justify-content: space-between; gap: .75rem; color: var(--meta-divider); font-size: .68rem; }
	.room-content h3 { margin: .45rem 0 .25rem; overflow: hidden; color: var(--deep-text); font-size: .95rem; font-weight: 700; letter-spacing: -.015em; text-overflow: ellipsis; white-space: nowrap; }
	.room-content p { margin: 0; overflow: hidden; color: var(--meta-divider); font-size: .75rem; text-overflow: ellipsis; white-space: nowrap; }
	.room-link { display: flex; align-items: center; justify-content: space-between; padding: .65rem 1rem; border-top: 1px solid var(--line-divider); color: var(--meta-divider); font: 500 .68rem/1 ui-monospace, monospace; text-decoration: none; transition: color .2s, background .2s; }
	.room-link:hover { background: var(--btn-regular-bg); color: var(--primary); }
	.room-link svg { width: .95rem; height: .95rem; }
	@keyframes reveal { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
	@keyframes loading { from { transform: translateX(-60%); } to { transform: translateX(180%); } }
	@keyframes breathe { 50% { opacity: .45; transform: scale(.82); } }
	@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
	@media (max-width: 640px) {
		.empty-state { grid-template-columns: 1fr; padding: 1.25rem; }
		.live-summary { grid-template-columns: 1fr; gap: 1.1rem; }
		.summary-metrics { width: 100%; }
		.room-grid { grid-template-columns: 1fr; }
		.player-header { align-items: flex-start; }
		.player-actions a { width: 2rem; padding: 0; font-size: 0; }
		.player-title-block h2 { max-width: 48vw; }
		.player-fallback { align-items: flex-start; flex-direction: column; }
	}
</style>
