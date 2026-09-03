import type { BooknavGroup, BooknavPageConfig } from "../types/booknavConfig";

// 书签导航页面配置
export const booknavPageConfig: BooknavPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "我的书签导航",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "从旧版 Hexo 关于我页面迁移的常用站点与个人主页。",

	// favicon 自动获取配置
	favicon: {
		// 书签未填写 icon 时，是否自动获取目标站点的 favicon 图标
		enabled: true,

		// favicon 接口地址，{domain} 为占位符，会被替换成目标站点域名
		// 更换接口只需保证地址里含有 {domain}，例如：
		//   https://a.favicon.im/{domain}
		//   https://favicon.im/{domain}
		api: "https://a.favicon.im/{domain}",
	},
};

// 书签导航配置
// 每个数组项是一个分类组，分类组内的 items 是该分类下的书签
export const booknavConfig: BooknavGroup[] = [
	{
		id: "personal",
		name: "个人主页",
		icon: "material-symbols:person-rounded",
		desc: "代码、账号与即时通讯",
		weight: 100,
		items: [
			{
				title: "GitHub",
				url: "https://github.com/loxehate",
				desc: "Loxehate 的 GitHub 主页",
				icon: "fa7-brands:github",
				weight: 100,
			},
			{
				title: "Google",
				url: "https://myaccount.google.com/?utm_source=OGB&utm_medium=app",
				desc: "Google 账号",
				icon: "fa7-brands:google",
				weight: 90,
			},
			{
				title: "Telegram",
				url: "https://t.me/loxehate",
				desc: "Telegram 主页",
				icon: "fa7-brands:telegram",
				weight: 80,
			},
			{
				title: "Discord",
				url: "https://discord.com/channels/1347161247157583982/1347161247157583984",
				desc: "Discord 频道",
				icon: "fa7-brands:discord",
				weight: 70,
			},
		],
	},
	{
		id: "social",
		name: "社交媒体",
		icon: "material-symbols:share-rounded",
		desc: "内容发布与社交平台",
		weight: 90,
		items: [
			{
				title: "X",
				url: "https://x.com/loxehate140698",
				desc: "X（Twitter）主页",
				icon: "fa7-brands:x-twitter",
				weight: 100,
			},
			{
				title: "Instagram",
				url: "https://www.instagram.com/loxegod/",
				desc: "Instagram 主页",
				icon: "fa7-brands:instagram",
				weight: 90,
			},
			{
				title: "YouTube",
				url: "https://www.youtube.com/channel/UCf5R5H9bmwhl2yCuYjY1FvQ",
				desc: "YouTube 频道",
				icon: "fa7-brands:youtube",
				weight: 80,
			},
			{
				title: "TikTok",
				url: "https://www.tiktok.com/@loxehate",
				desc: "TikTok 主页",
				icon: "fa7-brands:tiktok",
				weight: 70,
			},
		],
	},
	{
		id: "interests",
		name: "兴趣与工具",
		icon: "material-symbols:interests-rounded",
		desc: "游戏、音乐与 AI 工具",
		weight: 80,
		items: [
			{
				title: "Steam",
				url: "https://steamcommunity.com/profiles/76561198864146636/",
				desc: "Steam 个人资料",
				icon: "fa7-brands:steam",
				weight: 100,
			},
			{
				title: "Spotify",
				url: "https://open.spotify.com/user/31sqhuln6mecuwhamflbfxcuw4vm",
				desc: "Spotify 个人主页",
				icon: "fa7-brands:spotify",
				weight: 90,
			},
			{
				title: "ChatGPT",
				url: "https://chatgpt.com/",
				desc: "ChatGPT",
				icon: "simple-icons:openai",
				weight: 80,
			},
			{
				title: "OpenDota",
				url: "https://www.opendota.com/players/903880908",
				desc: "Dota 2 比赛数据",
				icon: "simple-icons:dota2",
				weight: 70,
			},
		],
	},
];
