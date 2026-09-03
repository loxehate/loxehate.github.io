import type { CollectionEntry } from "astro:content";

export const RADAR_RECENT_DAYS = 30;

export const radarLabels: Record<string, string> = {
	"ai-cli": "AI CLI 工具社区动态日报",
	"ai-cli-en": "AI CLI Tools Digest",
	"ai-agents": "AI Agents 生态日报",
	"ai-agents-en": "AI Agents Ecosystem Digest",
	"ai-web": "AI 官方内容追踪报告",
	"ai-web-en": "Official AI Content Report",
	"ai-trending": "AI 开源趋势日报",
	"ai-trending-en": "AI Open Source Trends",
	"ai-hn": "Hacker News AI 社区动态日报",
	"ai-hn-en": "Hacker News AI Community Digest",
	"ai-weekly": "AI 工具生态周报",
	"ai-weekly-en": "AI Tools Weekly Digest",
	"ai-monthly": "AI 工具生态月报",
	"ai-monthly-en": "AI Tools Monthly Digest",
};

export type RadarEntry = CollectionEntry<"radar">;
export type RadarDateGroup = { date: string; reports: RadarEntry[] };

export function radarDate(entry: RadarEntry): string {
	return entry.data.published.toISOString().slice(0, 10);
}

export function radarReportUrl(entry: RadarEntry): string {
	return `/radar/reports/${radarDate(entry)}/${entry.data.report}/`;
}

export function groupRadarEntries(entries: RadarEntry[]): RadarDateGroup[] {
	const groups = new Map<string, RadarEntry[]>();
	for (const entry of entries) {
		const date = radarDate(entry);
		if (!groups.has(date)) groups.set(date, []);
		groups.get(date)?.push(entry);
	}
	return [...groups.entries()]
		.sort(([a], [b]) => b.localeCompare(a))
		.map(([date, reports]) => ({
			date,
			reports: reports.sort((a, b) => {
				const order = Object.keys(radarLabels);
				return order.indexOf(a.data.report) - order.indexOf(b.data.report);
			}),
		}));
}

export function recentRadarGroups(
	groups: RadarDateGroup[],
	now: Date = new Date(),
): RadarDateGroup[] {
	const cutoff = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
	cutoff.setUTCDate(cutoff.getUTCDate() - (RADAR_RECENT_DAYS - 1));
	return groups.filter(({ date }) => new Date(`${date}T00:00:00Z`) >= cutoff);
}
