import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import matter from "gray-matter";

const root = process.cwd();
const postsRoot = path.join(root, "src", "content", "posts");
const imagesRoot = path.join(root, "src", "assets", "images", "Dota-img");
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const coverSeed = process.env.COVER_SEED ?? "dota-covers-v1";

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

function fileHash(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

const imageHashes = new Set();
const pool = walkImages(imagesRoot)
  .filter((filePath) => !path.basename(filePath, path.extname(filePath)).endsWith("_full"))
  .sort((a, b) => a.localeCompare(b))
  .filter((filePath) => {
    const digest = fileHash(filePath);
    if (imageHashes.has(digest)) return false;
    imageHashes.add(digest);
    return true;
  });
const used = new Set();
const posts = fs.readdirSync(postsRoot).filter((name) => name.endsWith(".md")).sort((a, b) => a.localeCompare(b));

if (pool.length < posts.length) {
  throw new Error(`Not enough Dota cover images: ${pool.length} images for ${posts.length} posts`);
}

for (const name of posts) {
  const postPath = path.join(postsRoot, name);
  const raw = fs.readFileSync(postPath, "utf8");
  const { data } = matter(raw);
  const start = hash(`${coverSeed}:${String(data.slug ?? name)}`) % pool.length;
  let selected;

  for (let offset = 0; offset < pool.length; offset++) {
    const candidate = pool[(start + offset) % pool.length];
    if (!used.has(candidate)) {
      selected = candidate;
      break;
    }
  }
  if (!selected) throw new Error(`No unused cover image available for ${name}`);

  used.add(selected);
  const sourcePath = path.relative(path.dirname(postPath), selected).split(path.sep).join("/");
  if (!/^image:[^\r\n]*$/m.test(raw)) throw new Error(`Unable to find image field in ${name}`);
  const next = raw.replace(/^image:[^\r\n]*$/m, `image: '${sourcePath.replaceAll("'", "''")}'`);
  if (next !== raw) fs.writeFileSync(postPath, next, "utf8");
}

console.log(`Assigned ${used.size} stable, unique Dota covers to ${posts.length} posts.`);
