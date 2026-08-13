import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = "public/images";
const indexes = new Map();

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

function index(directory) {
  const files = existsSync(directory) ? readdirSync(directory) : [];
  const set = new Set();
  for (const file of files) {
    set.add(file);
    set.add(decode(file));
    set.add(encodeURIComponent(file));
  }
  return set;
}

indexes.set("articles", index(join(root, "articles")));
for (const course of ["blog-setup", "company-website", "ecommerce-setup", "online-course-platform"]) {
  indexes.set(course, index(join(root, "courses", course)));
}

const files = [
  "src/app/posts/[slug]/page.tsx",
  ...readdirSync("src/app/posts/[slug]/post-content").filter((file) => file.endsWith(".tsx")).map((file) => join("src/app/posts/[slug]/post-content", file)),
  ...readdirSync("src/app/courses/[slug]/course-content").filter((file) => file.endsWith(".tsx")).map((file) => join("src/app/courses/[slug]/course-content", file)),
];

const missing = [];
let imageCount = 0;
let srcsetCount = 0;
for (const file of files) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(/\bsrc="([^\"]+)"/g)) {
    const src = match[1];
    if (!src.startsWith("/mymerrylife/images/")) continue;
    imageCount++;
    const parts = src.replace("/mymerrylife/images/", "").split("/");
    const type = parts.shift();
    const folder = type === "courses" ? parts.shift() : "articles";
    const filename = parts.join("/");
    const set = indexes.get(folder);
    if (!set?.has(filename) && !set?.has(decode(filename))) missing.push(`${file}: ${src}`);
  }
  for (const match of html.matchAll(/\bsrcset="([^\"]+)"/g)) {
    for (const entry of match[1].split(",")) {
      const src = entry.trim().split(/\s+/)[0];
      if (!src?.startsWith("/mymerrylife/images/")) continue;
      srcsetCount++;
      const parts = src.replace("/mymerrylife/images/", "").split("/");
      const type = parts.shift();
      const folder = type === "courses" ? parts.shift() : "articles";
      const filename = parts.join("/");
      const set = indexes.get(folder);
      if (!set?.has(filename) && !set?.has(decode(filename))) missing.push(`${file}: ${src} (srcset)`);
    }
  }
}

console.log(`Checked ${imageCount} local image src attributes`);
console.log(`Checked ${srcsetCount} local srcset candidates`);
console.log(`Missing primary images: ${missing.length}`);
for (const item of missing.slice(0, 100)) console.log(`  ${item}`);
if (missing.length > 100) console.log(`  ... ${missing.length - 100} more`);
