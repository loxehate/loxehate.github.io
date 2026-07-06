import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const radarRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(radarRoot, "..");
const digestsRoot = path.join(radarRoot, "digests");
const targetRoot = path.join(repoRoot, "source", "radar");
const reportsRoot = path.join(targetRoot, "reports");

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const reportLabels = {
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
const maxFeedItems = 30;
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function assertInside(parent, child) {
  const rel = path.relative(parent, child);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new Error(`Refusing to write outside ${parent}: ${child}`);
  }
}

function yamlString(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function stripFrontMatter(content) {
  if (!content.startsWith("---\n")) return content;
  const end = content.indexOf("\n---", 4);
  if (end === -1) return content;
  return content.slice(end + 4).replace(/^\s+/, "");
}

function extractTitle(content, fallback) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function frontMatter({ title, date }) {
  return [
    "---",
    `title: "${yamlString(title)}"`,
    `date: ${date}`,
    "categories:",
    "  - AI",
    "tags:",
    "  - radar",
    "---",
    "",
  ].join("\n");
}

function markdownBody(content) {
  return `<div class="markdown-body">\n\n${content.trim()}\n\n</div>\n`;
}

function resolveSiteUrl() {
  const explicit = process.env.PAGES_URL ?? process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const repo = process.env.DIGEST_REPO ?? process.env.GITHUB_REPOSITORY;
  if (repo) {
    const [owner, name] = repo.split("/");
    if (owner && name) return `https://${owner}.github.io/${name}/radar`;
  }

  return "/radar";
}

function toRfc822(date) {
  return (
    `${days[date.getUTCDay()]}, ${String(date.getUTCDate()).padStart(2, "0")} ` +
    `${months[date.getUTCMonth()]} ${date.getUTCFullYear()} ` +
    `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}:${String(date.getUTCSeconds()).padStart(2, "0")} +0000`
  );
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function listDigestDates() {
  if (!fs.existsSync(digestsRoot)) return [];
  return fs
    .readdirSync(digestsRoot)
    .filter((name) => datePattern.test(name) && fs.statSync(path.join(digestsRoot, name)).isDirectory())
    .sort()
    .reverse();
}

function listReports(date) {
  const dateDir = path.join(digestsRoot, date);
  return fs
    .readdirSync(dateDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.slice(0, -3))
    .sort((a, b) => {
      const order = Object.keys(reportLabels);
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi) || a.localeCompare(b);
    });
}

function writeReport(date, report) {
  const sourcePath = path.join(digestsRoot, date, `${report}.md`);
  const targetPath = path.join(reportsRoot, date, report, "index.md");
  assertInside(targetRoot, targetPath);

  const raw = fs.readFileSync(sourcePath, "utf-8");
  const body = stripFrontMatter(raw);
  const title = extractTitle(body, `${reportLabels[report] ?? report} ${date}`);
  const content = frontMatter({ title, date }) + markdownBody(body);

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, content, "utf-8");
  return { date, report, title, link: `/radar/reports/${date}/${report}/` };
}

function writeIndex(entries, latestDate) {
  const lines = [
    "# Big Model Radar",
    "",
    "AI 生态自动追踪报告，覆盖 AI CLI、Agents、官方资讯、开源趋势和 Hacker News 社区动态。",
    "",
  ];

  for (const [date, reports] of entries) {
    lines.push(`## ${date}`, "");
    for (const report of reports) {
      lines.push(`- [${report.title}](${report.link})`);
    }
    lines.push("");
  }

  const indexPath = path.join(targetRoot, "index.md");
  const content =
    [
      "---",
      'title: "Big Model Radar"',
      "subtitle: AI 生态追踪报告",
      `date: ${latestDate ?? new Date().toISOString().slice(0, 10)}`,
      "categories:",
      "  - AI",
      "tags:",
      "  - radar",
      "banner_img: /img/all.jpg",
      "banner_img_height: 60",
      "banner_mask_alpha: 0.3",
      "---",
      "",
    ].join("\n") + markdownBody(lines.join("\n"));

  fs.writeFileSync(indexPath, content, "utf-8");
}

function writeManifestAndFeed(entries) {
  const siteUrl = resolveSiteUrl();
  const manifest = {
    generated: new Date().toISOString(),
    dates: entries.map(([date, reports]) => ({
      date,
      reports: reports.map((report) => report.report),
    })),
  };
  fs.writeFileSync(path.join(targetRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf-8");

  const feedItems = entries.flatMap(([, reports]) => reports).slice(0, maxFeedItems);
  const itemsXml = feedItems
    .map((report) => {
      const link = `${siteUrl}/reports/${report.date}/${report.report}/`;
      const [year, month, day] = report.date.split("-").map(Number);
      const pubDate = toRfc822(new Date(Date.UTC(year, month - 1, day)));
      return [
        "    <item>",
        `      <title>${escapeXml(report.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${escapeXml(report.title)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const feedXml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>Big Model Radar</title>\n` +
    `    <link>${escapeXml(siteUrl)}</link>\n` +
    `    <description>AI 生态自动追踪报告</description>\n` +
    `    <language>zh-CN</language>\n` +
    `    <atom:link href="${escapeXml(`${siteUrl}/feed.xml`)}" rel="self" type="application/rss+xml"/>\n` +
    `    <lastBuildDate>${toRfc822(new Date())}</lastBuildDate>\n` +
    itemsXml +
    `\n  </channel>\n` +
    `</rss>\n`;
  fs.writeFileSync(path.join(targetRoot, "feed.xml"), feedXml, "utf-8");
}

function main() {
  if (!fs.existsSync(digestsRoot)) {
    throw new Error(`Radar digests directory not found: ${digestsRoot}`);
  }

  assertInside(repoRoot, targetRoot);
  fs.rmSync(targetRoot, { recursive: true, force: true });
  fs.mkdirSync(reportsRoot, { recursive: true });

  const dates = listDigestDates();
  const entries = [];
  for (const date of dates) {
    const reports = listReports(date).map((report) => writeReport(date, report));
    if (reports.length > 0) entries.push([date, reports]);
  }

  writeIndex(entries, dates[0]);
  writeManifestAndFeed(entries);
  console.log(`Exported ${entries.reduce((sum, [, reports]) => sum + reports.length, 0)} Radar reports to ${targetRoot}`);
}

main();
