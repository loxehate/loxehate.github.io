import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const postsRoot = path.join(root, "src", "content", "posts");
const imagesRoot = path.join(root, "public", "images", "posts");
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);

function walkImages(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkImages(fullPath);
    return imageExtensions.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
  });
}

function hash(value) {
  let result = 2166136261;
  for (const character of value) {
    result ^= character.codePointAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function normalizeReference(reference) {
  try {
    return decodeURIComponent(reference).replaceAll("/", path.sep);
  } catch {
    return reference.replaceAll("/", path.sep);
  }
}

const pool = walkImages(imagesRoot).sort((a, b) => a.localeCompare(b));
const used = new Set();
const posts = fs.readdirSync(postsRoot).filter((name) => name.endsWith(".md")).sort((a, b) => a.localeCompare(b));

for (const name of posts) {
  const postPath = path.join(postsRoot, name);
  const raw = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(raw);
  if (data.image) {
    used.add(String(data.image));
    continue;
  }

  const references = [
    ...content.matchAll(/^!\[[^\]]*\]\(\/(images\/posts\/.+)\)\s*$/gm),
    ...content.matchAll(/(?:src|href)=["']\/(images\/posts\/[^"']+)["']/g),
  ].map((match) => path.join(root, "public", normalizeReference(match[1])));

  let selected = references.find((candidate) => fs.existsSync(candidate) && !used.has(candidate));
  if (!selected) {
    const start = hash(String(data.slug ?? name)) % pool.length;
    for (let offset = 0; offset < pool.length; offset++) {
      const candidate = pool[(start + offset) % pool.length];
      if (!used.has(candidate)) {
        selected = candidate;
        break;
      }
    }
  }
  if (!selected) throw new Error(`No unused cover image available for ${name}`);

  used.add(selected);
  const publicPath = `/${path.relative(path.join(root, "public"), selected).split(path.sep).join("/")}`;
  const next = raw.replace(/^image:\s*(?:''|"")\s*$/m, `image: '${publicPath.replaceAll("'", "''")}'`);
  if (next === raw) throw new Error(`Unable to update blank image field in ${name}`);
  fs.writeFileSync(postPath, next, "utf8");
}

console.log(`Assigned stable local covers to ${posts.length} posts; ${used.size} unique images are in use.`);
