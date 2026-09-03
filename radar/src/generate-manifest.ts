import fs from "fs";
import path from "path";

const DIGESTS_DIR = "digests";
const PUBLISHED_REPORTS_DIR = path.resolve("..", "src", "content", "radar", "reports");
const MANIFEST_PATH = "manifest.json";
const FEED_PATH = "feed.xml";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const REPORT_FILES = [
  "ai-cli",
  "ai-cli-en",
  "ai-agents",
  "ai-agents-en",
  "ai-web",
  "ai-web-en",
  "ai-trending",
  "ai-trending-en",
  "ai-hn",
  "ai-hn-en",
  "ai-weekly",
  "ai-weekly-en",
  "ai-monthly",
  "ai-monthly-en",
] as const;
const MAX_FEED_ITEMS = 30;
const RECENT_DAYS = 30;

const REPORT_LABELS: Record<string, string> = {
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

interface DateEntry {
  date: string;
  reports: string[];
}

interface Manifest {
  generated: string;
  dates: DateEntry[];
  recentDates: DateEntry[];
  archives: ArchiveEntry[];
}

interface ArchiveEntry {
  month: string;
  dateCount: number;
  reportCount: number;
  url: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function resolveSiteUrl(): string {
  const explicit = process.env["PAGES_URL"] ?? process.env["SITE_URL"];
  if (explicit) return explicit.replace(/\/$/, "");

  const repo = process.env["DIGEST_REPO"] ?? process.env["GITHUB_REPOSITORY"];
  if (repo) {
    const [owner, name] = repo.split("/");
    if (owner && name) return `https://${owner}.github.io/${name}`;
  }

  throw new Error("Missing site URL. Set PAGES_URL, SITE_URL, DIGEST_REPO, or GITHUB_REPOSITORY.");
}

function toRfc822(date: Date): string {
  return (
    `${DAYS[date.getUTCDay()]}, ${String(date.getUTCDate()).padStart(2, "0")} ` +
    `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()} ` +
    `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}:${String(date.getUTCSeconds()).padStart(2, "0")} +0000`
  );
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const SITE_URL = resolveSiteUrl();

function collectDates(): string[] {
  const dates = new Set<string>();
  for (const root of [DIGESTS_DIR, PUBLISHED_REPORTS_DIR]) {
    if (!fs.existsSync(root)) continue;
    for (const name of fs.readdirSync(root)) {
      if (DATE_RE.test(name) && fs.statSync(path.join(root, name)).isDirectory()) dates.add(name);
    }
  }
  return [...dates].sort().reverse();
}

function reportExists(date: string, report: string): boolean {
  return (
    fs.existsSync(path.join(DIGESTS_DIR, date, `${report}.md`)) ||
    fs.existsSync(path.join(PUBLISHED_REPORTS_DIR, date, report, "index.md"))
  );
}

const entries = collectDates()
  .map((date) => ({ date, reports: REPORT_FILES.filter((report) => reportExists(date, report)) }))
  .filter((entry) => entry.reports.length > 0);

function recentCutoff(now = new Date()): Date {
  const cutoff = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  cutoff.setUTCDate(cutoff.getUTCDate() - (RECENT_DAYS - 1));
  return cutoff;
}

function parseReportDate(date: string): Date {
  const parts = date.split("-").map(Number);
  return new Date(Date.UTC(parts[0]!, parts[1]! - 1, parts[2]!));
}

const recentDates = entries.filter((entry) => parseReportDate(entry.date) >= recentCutoff());
const archiveGroups = new Map<string, DateEntry[]>();
for (const entry of entries) {
  const month = entry.date.slice(0, 7);
  const group = archiveGroups.get(month) ?? [];
  group.push(entry);
  archiveGroups.set(month, group);
}
const archives: ArchiveEntry[] = [...archiveGroups].map(([month, monthEntries]) => ({
  month,
  dateCount: monthEntries.length,
  reportCount: monthEntries.reduce((total, entry) => total + entry.reports.length, 0),
  url: `/radar/archive/${month}/`,
}));

const manifest: Manifest = {
  generated: new Date().toISOString(),
  dates: entries,
  recentDates,
  archives,
};

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
console.log(`manifest.json updated: ${entries.length} dates`);

// ── RSS Feed ──────────────────────────────────────────────────────────────────

const feedItems: Array<{ date: string; report: string }> = [];
outer: for (const entry of entries) {
  for (const report of entry.reports) {
    feedItems.push({ date: entry.date, report });
    if (feedItems.length >= MAX_FEED_ITEMS) break outer;
  }
}

const buildDate = toRfc822(new Date());

const itemsXml = feedItems
  .map(({ date, report }) => {
    const label = REPORT_LABELS[report] ?? report;
    const title = `${label} ${date}`;
    const link = `${SITE_URL}/reports/${date}/${report}/`;
    const parts = date.split("-").map(Number);
    const pubDate = toRfc822(new Date(Date.UTC(parts[0]!, parts[1]! - 1, parts[2]!)));
    return [
      "    <item>",
      `      <title>${escapeXml(title)}</title>`,
      `      <link>${escapeXml(link)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
      `      <pubDate>${pubDate}</pubDate>`,
      `      <description>${escapeXml(title)}</description>`,
      "    </item>",
    ].join("\n");
  })
  .join("\n");

const feedXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
  `  <channel>\n` +
  `    <title>Big Model Radar</title>\n` +
  `    <link>${SITE_URL}</link>\n` +
  `    <description>AI 开源生态每日简报 · Daily AI ecosystem digest</description>\n` +
  `    <language>zh-CN</language>\n` +
  `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>\n` +
  `    <lastBuildDate>${buildDate}</lastBuildDate>\n` +
  itemsXml +
  `\n  </channel>\n` +
  `</rss>\n`;

fs.writeFileSync(FEED_PATH, feedXml);
console.log(`feed.xml updated: ${feedItems.length} items`);
