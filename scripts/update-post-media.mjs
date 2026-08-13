import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

const posts = JSON.parse(readFileSync(".original-posts.json", "utf8"));
const postsDir = "public/images/posts";
mkdirSync(postsDir, { recursive: true });

const decodeHtml = (value) => value
  .replace(/&#8211;|&#x2013;/gi, "–")
  .replace(/&#8212;|&#x2014;/gi, "—")
  .replace(/&#038;|&amp;/gi, "&")
  .replace(/&#8217;|&#x2019;/gi, "’")
  .replace(/&#8216;|&#x2018;/gi, "‘")
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&quot;/gi, '"')
  .replace(/<[^>]+>/g, "");

const originalPosts = posts.map((post) => ({
  ...post,
  title: decodeHtml(post.title),
  excerpt: decodeHtml(post.excerpt),
}));

const findOriginal = (predicate, label) => {
  const matches = originalPosts.filter(predicate);
  if (matches.length !== 1) throw new Error(`${label}: expected 1 match, found ${matches.length}`);
  return matches[0];
};

const sourceMap = {
  "backend-notes-3": () => findOriginal((p) => p.title === "後端開發 筆記 – 3", "backend-notes-3"),
  "react-notes": () => findOriginal((p) => p.title === "React 筆記 – 前端框架", "react-notes"),
  "css-notes": () => findOriginal((p) => p.title === "CSS – 筆記", "css-notes"),
  "html-notes": () => findOriginal((p) => p.title === "HTML – 筆記", "html-notes"),
  "backend-notes-2": () => findOriginal((p) => p.title === "後端開發 筆記 – 2", "backend-notes-2"),
  "backend-notes-1": () => findOriginal((p) => p.title === "後端開發 筆記 – 1", "backend-notes-1"),
  "js-notes-2": () => findOriginal((p) => p.title === "JavaScript 筆記 – 2", "js-notes-2"),
  "js-notes-dom": () => findOriginal((p) => p.title === "JavaScript 筆記 – DOM", "js-notes-dom"),
  "js-notes-1": () => findOriginal((p) => p.title === "JavaScript 筆記 – 1", "js-notes-1"),
  "start-profitable-blog": () => findOriginal((p) => p.title.startsWith("如何建立一個可賺錢的部落格"), "start-profitable-blog"),
  "mouse-without-borders": () => findOriginal((p) => p.title.includes("Mouse Without Borders"), "mouse-without-borders"),
  "sticky-table-of-contents": () => findOriginal((p) => p.title.includes("Sticky Table of Contents"), "sticky-table-of-contents"),
  "thrive-suite": () => findOriginal((p) => p.title.startsWith("超好用的 WordPress"), "thrive-suite"),
  "designrr-ebook": () => findOriginal((p) => p.title.toLowerCase().includes("designrr"), "designrr-ebook"),
  "google-site-free": () => findOriginal((p) => p.title.includes("Google協作平台"), "google-site-free"),
  "hostgator-setup": () => findOriginal((p) => p.title.includes("HostGator"), "hostgator-setup"),
  "wordpress-move": () => findOriginal((p) => p.title.includes("手動搬家"), "wordpress-move"),
  "bluehost-setup": () => findOriginal((p) => p.title.toLowerCase().includes("bluehost 快速"), "bluehost-setup"),
  "self-host-wordpress": () => findOriginal((p) => p.title.startsWith("如何自行架設網站"), "self-host-wordpress"),
  "aweber-campaigns": () => findOriginal((p) => p.title.includes("Campaigns"), "aweber-campaigns"),
  "aweber-broadcast": () => findOriginal((p) => p.title.includes("自動化的群發"), "aweber-broadcast"),
  "aweber-landing-page": () => findOriginal((p) => p.title.includes("AWeber 新功能介紹"), "aweber-landing-page"),
  "fiverr-intro": () => findOriginal((p) => p.title.includes("Fiverr 網站介紹"), "fiverr-intro"),
  "hitleap-vs-bighits4u": () => findOriginal((p) => p.title.includes("BIGHITS4U"), "hitleap-vs-bighits4u"),
  "hitleap-intro": () => findOriginal((p) => p.title.includes("如何增加網站流量") && p.title.includes("Hitleap"), "hitleap-intro"),
  "avoid-fb-block": () => findOriginal((p) => p.title.includes("避免被FB"), "avoid-fb-block"),
  "makemoney-2": () => findOriginal((p) => p.title.includes("方法 – 2"), "makemoney-2"),
  "makemoney-1": () => findOriginal((p) => p.title.includes("方法 – 1"), "makemoney-1"),
};

const metadata = {};

for (const [slug, getPost] of Object.entries(sourceMap)) {
  const post = getPost();
  if (!post.featuredMedia) throw new Error(`${slug}: original post has no featured media`);
  const url = new URL(post.featuredMedia);
  const extension = extname(url.pathname).toLowerCase() || ".jpg";
  const outputName = `${slug}${extension}`;
  const outputPath = join(postsDir, outputName);
  const response = await fetch(post.featuredMedia, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!response.ok) throw new Error(`${slug}: featured image returned ${response.status}`);
  writeFileSync(outputPath, Buffer.from(await response.arrayBuffer()));
  metadata[slug] = { title: post.title, image: `posts/${outputName}` };
  console.log(`${slug}: ${post.title} -> ${outputName}`);
}

const localCopies = {
  "javascript-basics": ["public/images/articles/js-notes-1-JavaScript-function.png", "public/images/posts/javascript-basics.png"],
};
for (const [slug, [source, destination]] of Object.entries(localCopies)) {
  copyFileSync(source, destination);
  metadata[slug] = { image: "posts/javascript-basics.png" };
}

metadata["react-components"] = { image: metadata["react-notes"].image };
metadata["nodejs-basics"] = { image: metadata["backend-notes-1"].image };

let mockData = readFileSync("src/lib/mock-data.ts", "utf8");
for (const [slug, data] of Object.entries(metadata)) {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const linePattern = new RegExp(`(\\{[^\\n]*slug: "${escapedSlug}"[^\\n]*\\})`);
  const lineMatch = mockData.match(linePattern);
  if (!lineMatch) throw new Error(`Could not find ${slug} in mock-data.ts`);
  let line = lineMatch[1];
  if (data.title) line = line.replace(/title: "(?:\\\\.|[^"\\\\])*"/, `title: ${JSON.stringify(data.title)}`);
  line = line.replace(/coverImage: [^,]+/, `coverImage: IMG(${JSON.stringify(data.image)})`);
  mockData = mockData.replace(lineMatch[1], line);
}
writeFileSync("src/lib/mock-data.ts", mockData);

let postPage = readFileSync("src/app/posts/[slug]/page.tsx", "utf8");
for (const [slug, data] of Object.entries(metadata)) {
  if (!data.title) continue;
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(\\s+"${escapedSlug}":\\s*\\{\\s*title:\\s*)"(?:\\\\.|[^"\\\\])*"`);
  const match = postPage.match(pattern);
  if (!match) throw new Error(`Could not find ${slug} in posts page`);
  postPage = postPage.replace(match[0], `${match[1]}${JSON.stringify(data.title)}`);
}
writeFileSync("src/app/posts/[slug]/page.tsx", postPage);

console.log("Updated thumbnails and original titles.");
