import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

const BASE_PATH = "/mymerrylife";
const ARTICLES_DIR = "public/images/articles";
const COURSES_DIR = "public/images/courses";
const courseKeys = ["blog-setup", "company-website", "ecommerce-setup", "online-course-platform"];
const missing = [];
const downloaded = new Map();

function decode(value) {
  let result = value;
  for (let i = 0; i < 3; i++) {
    try {
      const next = decodeURIComponent(result);
      if (next === result) break;
      result = next;
    } catch {
      break;
    }
  }
  return result;
}

function addIndex(index, filename) {
  const candidates = new Set([filename, decode(filename)]);
  for (const candidate of [...candidates]) {
    candidates.add(encodeURIComponent(candidate));
  }
  for (const candidate of candidates) index.set(candidate, filename);
}

function buildIndex(directory) {
  const index = new Map();
  if (!existsSync(directory)) return index;
  for (const filename of readdirSync(directory)) addIndex(index, filename);
  return index;
}

const articleIndex = buildIndex(ARTICLES_DIR);
const courseIndexes = new Map(courseKeys.map((key) => [key, buildIndex(join(COURSES_DIR, key))]));

function assetPath(type, folder, filename) {
  return `${BASE_PATH}/images/${type}/${folder}/${encodeURIComponent(filename)}`;
}

function findCourseAsset(declaredCourse, rawFilename) {
  const decoded = decode(rawFilename);
  const indexes = [];
  if (courseIndexes.has(declaredCourse)) indexes.push([declaredCourse, courseIndexes.get(declaredCourse)]);
  for (const [key, index] of courseIndexes) {
    if (key !== declaredCourse) indexes.push([key, index]);
  }

  const candidates = [rawFilename, decoded];
  const withoutSize = decoded.replace(/-\d+x\d+(?=\.[^.]+$)/, "");
  if (withoutSize !== decoded) candidates.push(withoutSize);

  for (const [key, index] of indexes) {
    for (const candidate of candidates) {
      const filename = index.get(candidate) ?? index.get(encodeURIComponent(candidate));
      if (filename) return { key, filename };
    }
  }
  return null;
}

function resolveLocalImage(raw, type) {
  const clean = raw.split(/[?#]/, 1)[0];
  const marker = `/images/${type}/`;
  const markerIndex = clean.indexOf(marker);
  if (markerIndex < 0) return null;
  const remainder = clean.slice(markerIndex + marker.length);

  if (type === "articles") {
    const filename = articleIndex.get(remainder) ?? articleIndex.get(decode(remainder));
    return filename ? assetPath(type, "", filename).replace("/articles//", "/articles/") : null;
  }

  const parts = remainder.split("/");
  const declaredCourse = parts.shift();
  if (!declaredCourse) return null;
  if (/^\d{4}$/.test(parts[0] ?? "") && /^\d{2}$/.test(parts[1] ?? "")) parts.splice(0, 2);
  const filename = parts.join("/");
  const resolved = findCourseAsset(declaredCourse, filename);
  if (!resolved) return null;
  return assetPath(type, resolved.key, resolved.filename);
}

async function downloadRemoteImage(url) {
  if (downloaded.has(url)) return downloaded.get(url);
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 12);
  const extension = extname(new URL(url).pathname).toLowerCase() || ".jpg";
  const filename = `remote-${hash}${extension}`;
  const outputPath = join(ARTICLES_DIR, filename);
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36",
        referer: "https://mymerrylife.com/",
      },
    });
    if (!response.ok) throw new Error(String(response.status));
    mkdirSync(ARTICLES_DIR, { recursive: true });
    writeFileSync(outputPath, Buffer.from(await response.arrayBuffer()));
    addIndex(articleIndex, filename);
    const path = assetPath("articles", "", filename).replace("/articles//", "/articles/");
    downloaded.set(url, path);
    return path;
  } catch (error) {
    missing.push(`remote image ${url} (${error.message})`);
    downloaded.set(url, url);
    return url;
  }
}

async function normalizeImageTag(tag, sourceFile) {
  let result = tag;
  const normalizedFile = sourceFile.replaceAll("\\", "/");
  const type = normalizedFile.includes("/courses/") ? "courses" : "articles";

  const srcMatch = result.match(/\bsrc="([^"]+)"/);
  if (srcMatch) {
    let value = srcMatch[1];
    if (value.startsWith("http://") || value.startsWith("https://")) value = await downloadRemoteImage(value);
    else value = resolveLocalImage(value, type) ?? value;
    result = result.replace(srcMatch[0], `src="${value}"`);
  }

  const srcsetMatch = result.match(/\bsrcset="([^"]+)"/);
  if (srcsetMatch) {
    const entries = [];
    for (const entry of srcsetMatch[1].split(",")) {
      const parts = entry.trim().split(/\s+/);
      const raw = parts.shift();
      if (!raw) continue;
      let value = raw;
      if (value.startsWith("http://") || value.startsWith("https://")) value = await downloadRemoteImage(value);
      else value = resolveLocalImage(value, type);
      if (value) entries.push([value, ...parts].join(" "));
    }
    if (entries.length) result = result.replace(srcsetMatch[0], `srcset="${entries.join(", ")}"`);
    else result = result.replace(/\s+srcset="[^"]*"/, "");
  }
  return result;
}

function addIframeSrc(tag, before) {
  if (/\bsrc="/.test(tag) || /\bdata-src="/.test(tag)) {
    const dataSrc = tag.match(/\bdata-src="([^"]+)"/);
    return dataSrc && !/\bsrc="/.test(tag) ? tag.replace(">", ` src="${dataSrc[1]}">`) : tag;
  }
  const nearby = before.slice(-1800);
  const dataUrl = nearby.match(/\bdata-url="https?:\/\/(?:youtu\.be\/|www\.youtube\.com\/watch\?v=)([^"&]+)[^"]*"/);
  const dataCode = tag.match(/\bdata-code="([^"]+)"/);
  const videoId = dataCode?.[1] ?? dataUrl?.[1];
  return videoId ? tag.replace(">", ` src="https://www.youtube.com/embed/${videoId}?rel=0&amp;modestbranding=1&amp;controls=1&amp;fs=1">`) : tag;
}

async function normalizeFile(filePath) {
  let html = readFileSync(filePath, "utf8");
  const imagePattern = /<img\b[^>]*>/gi;
  let output = "";
  let cursor = 0;
  for (const match of html.matchAll(imagePattern)) {
    output += html.slice(cursor, match.index);
    output += await normalizeImageTag(match[0], filePath);
    cursor = match.index + match[0].length;
  }
  output += html.slice(cursor);
  html = output;

  html = html.replace(/<iframe\b[^>]*>/gi, (tag, offset) => addIframeSrc(tag, html.slice(0, offset)));
  html = html.replace(/src="\/images\//g, `src="${BASE_PATH}/images/`);
  html = html.replace(/data-src="\/images\//g, `data-src="${BASE_PATH}/images/`);
  html = html.replace(/data-url="\/images\//g, `data-url="${BASE_PATH}/images/`);
  html = html.replace(/srcset="\/images\//g, `srcset="${BASE_PATH}/images/`);
  html = html.replace(/srcset="([^\"]*)"/g, (_, value) => `srcset="${value.replaceAll(" /images/", ` ${BASE_PATH}/images/`)}"`);
  writeFileSync(filePath, html);
}

const files = [
  "src/app/posts/[slug]/page.tsx",
  ...readdirSync("src/app/posts/[slug]/post-content").filter((file) => file.endsWith(".tsx")).map((file) => join("src/app/posts/[slug]/post-content", file)),
  ...readdirSync("src/app/courses/[slug]/course-content").filter((file) => file.endsWith(".tsx")).map((file) => join("src/app/courses/[slug]/course-content", file)),
];

for (const file of files) {
  await normalizeFile(file);
  console.log(`Normalized ${file}`);
}

console.log(`Missing or remote assets: ${missing.length}`);
for (const item of missing) console.log(`  ${item}`);
