import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const postsRoot = path.join(root, "src", "content", "posts");
const radarRoot = path.join(root, "src", "content", "radar", "reports");
const distRoot = path.join(root, "dist");
const publicRoot = path.join(root, "public");
const errors = [];
const covers = new Map();

function walk(directory, extension = ".md") {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? walk(fullPath, extension)
      : entry.name.endsWith(extension)
        ? [fullPath]
        : [];
  });
}

function requireFile(filePath, label) {
  if (!fs.existsSync(filePath)) errors.push(`${label}: ${path.relative(root, filePath)}`);
}

function dateParts(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.valueOf())) return null;
  return [date.getUTCFullYear(), String(date.getUTCMonth() + 1).padStart(2, "0"), String(date.getUTCDate()).padStart(2, "0")];
}

const posts = walk(postsRoot);
for (const postPath of posts) {
  const raw = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(raw);
  const parts = dateParts(data.published);
  const slug = String(data.slug ?? path.basename(postPath, ".md"));
  if (!parts) {
    errors.push(`文章日期无效: ${path.relative(root, postPath)}`);
    continue;
  }

  requireFile(path.join(distRoot, ...parts.map(String), slug, "index.html"), "缺少文章页面");
  requireFile(path.join(distRoot, "posts", slug, "index.html"), "缺少旧网址跳转");

  const cover = String(data.image ?? "");
  if (!cover.startsWith("/")) {
    errors.push(`文章未配置本地封面: ${path.relative(root, postPath)}`);
  } else {
    requireFile(path.join(publicRoot, ...decodeURIComponent(cover.slice(1)).split("/")), "缺少文章封面");
    const previous = covers.get(cover);
    if (previous) errors.push(`文章封面重复: ${previous} 与 ${path.basename(postPath)} -> ${cover}`);
    covers.set(cover, path.basename(postPath));
  }

  const imageReferences = [
    ...content.matchAll(/^!\[[^\]]*\]\(\/(images\/posts\/.+)\)\s*$/gm),
    ...content.matchAll(/(?:src|href)=["']\/(images\/posts\/[^"']+)["']/g),
  ];
  for (const match of imageReferences) {
    const asset = decodeURIComponent(match[1]);
    requireFile(path.join(publicRoot, ...asset.split("/")), "缺少文章图片");
  }
}

const radarReports = walk(radarRoot);
for (const reportPath of radarReports) {
  const relative = path.relative(radarRoot, reportPath).split(path.sep);
  const date = relative[0];
  const report = relative[1];
  if (!date || !report) {
    errors.push(`Radar 报告目录不符合 date/report/index.md: ${path.relative(root, reportPath)}`);
    continue;
  }
  requireFile(path.join(distRoot, "radar", "reports", date, report, "index.html"), "缺少 Radar 页面");
}

for (const required of [
  ["首页", "index.html"],
  ["关于页", "about", "index.html"],
  ["Radar 首页", "radar", "index.html"],
  ["Radar 归档", "radar", "archive", "index.html"],
  ["GA4 数据", "data", "ga4-daily.json"],
]) {
  const [label, ...segments] = required;
  requireFile(path.join(distRoot, ...segments), `缺少${label}`);
}

if (errors.length) {
  console.error(`迁移验收失败，共 ${errors.length} 项：`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`迁移验收通过：${posts.length} 篇文章、${radarReports.length} 份 Radar 报告，旧网址跳转及静态资源完整。`);
