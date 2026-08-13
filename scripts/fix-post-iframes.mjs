import { readFileSync, writeFileSync } from "node:fs";

const pages = {
  "bluehost-setup": "https://mymerrylife.com/%e5%a6%82%e4%bd%95%e4%bd%bf%e7%94%a8-bluehost-%e5%bf%ab%e9%80%9f%e6%9e%b6%e8%a8%ad%e7%b6%b2%e7%ab%99-%e7%b0%a1%e5%96%ae%e3%80%81%e6%98%93%e5%ad%b8-%e6%96%b0%e6%89%8b%e5%85%8d%e8%b2%bb/",
  "hostgator-setup": "https://mymerrylife.com/%e5%a6%82%e4%bd%95%e4%bd%bf%e7%94%a8-hostgator-%e5%bf%ab%e9%80%9f%e6%9e%b6%e8%a8%ad%e7%b6%b2%e7%ab%99-%e7%b0%a1%e5%96%ae%e3%80%81%e6%98%93%e5%ad%b8-%e6%96%b0%e6%89%8b%e5%85%8d%e8%b2%bb/",
  "self-host-wordpress": "https://mymerrylife.com/%e5%a6%82%e4%bd%95%e8%87%aa%e8%a1%8c%e6%9e%b6%e8%a8%ad%e7%b6%b2%e7%ab%99-%e6%96%b0%e6%89%8b%e5%85%8d%e8%b2%bb%e6%95%99%e5%ad%b8-wordpress/",
  "thrive-suite": "https://mymerrylife.com/thrive-suite/",
};

for (const [slug, url] of Object.entries(pages)) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${slug}: original page returned ${response.status}`);
  const html = await response.text();
  const matches = [...html.matchAll(/(?:youtube\.com\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{6,})/g)];
  const videoId = matches[0]?.[1];
  if (!videoId) {
    console.log(`${slug}: no YouTube video found`);
    continue;
  }
  const file = `src/app/posts/[slug]/post-content/${slug}.tsx`;
  let content = readFileSync(file, "utf8");
  content = content.replace(/<iframe(?![^>]*\bsrc=)([^>]*)><\/iframe>/, `<iframe$1 src="https://www.youtube.com/embed/${videoId}?rel=0&amp;modestbranding=1&amp;controls=1&amp;fs=1"></iframe>`);
  writeFileSync(file, content);
  console.log(`${slug}: restored YouTube ${videoId}`);
}
