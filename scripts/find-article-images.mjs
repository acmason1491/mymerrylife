import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const POSTS_DIR = "src/app/posts/[slug]/post-content";
const PAGE_FILE = "src/app/posts/[slug]/page.tsx";

// 1. Extract images from post-content files
const contentFiles = readdirSync(POSTS_DIR).filter(f => f.endsWith(".tsx"));
const fileImageMap = {};

for (const file of contentFiles) {
  const slug = file.replace(".tsx", "");
  const content = readFileSync(join(POSTS_DIR, file), "utf-8");
  const matches = content.match(/\/images\/articles\/[^"'\s)]+/g);
  if (matches) {
    // Filter to unique, prefer full-size (no -NNNxNNN suffix before extension)
    const unique = [...new Set(matches)];
    const preferred = unique.find(u => !/-\d+x\d+\.\w+$/.test(u)) || unique[0];
    fileImageMap[slug] = preferred;
  }
}

// 2. Extract images from the inline POSTS record
const pageContent = readFileSync(PAGE_FILE, "utf-8");
// Find all POSTS entries with their slug and inline content
const slugPattern = /"([^"]+)":\s*\{[^}]*content:\s*`([^`]+)`/gs;
let match;
while ((match = slugPattern.exec(pageContent)) !== null) {
  const slug = match[1];
  const content = match[2];
  const imgMatches = content.match(/\/images\/articles\/[^"'\s)]+/g);
  if (imgMatches) {
    const unique = [...new Set(imgMatches)];
    const preferred = unique.find(u => !/-\d+x\d+\.\w+$/.test(u)) || unique[0];
    fileImageMap[slug] = preferred;
  }
}

// 3. Print results as a mapping
console.log("Image mapping:\n");
for (const [slug, img] of Object.entries(fileImageMap)) {
  console.log(`"${slug}": IMG("articles/${img.replace("/images/articles/", "")}"),`);
}
