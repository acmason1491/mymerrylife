import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { load } from "cheerio";

const outputDirectory = path.resolve(process.argv[2] || "out");
const siteOrigin = "https://mymerrylife.com";
const checkedLinks = new Map();
const htmlFiles = [];

function collectHtmlFiles(directory) {
  for (const entry of readdirSync(directory)) {
    const fullPath = path.join(directory, entry);
    if (statSync(fullPath).isDirectory()) {
      collectHtmlFiles(fullPath);
    } else if (entry.endsWith(".html")) {
      htmlFiles.push(fullPath);
    }
  }
}

function pagePath(filePath) {
  const relative = path.relative(outputDirectory, filePath).replaceAll(path.sep, "/");
  return `/${relative.replace(/(?:index)?\.html$/, "").replace(/\/$/, "")}/`;
}

function localFileForUrl(url) {
  let urlPath = decodeURIComponent(url.pathname);
  if (urlPath.startsWith("/mymerrylife/")) urlPath = urlPath.slice("/mymerrylife".length);
  if (!urlPath.startsWith("/")) urlPath = `/${urlPath}`;
  if (urlPath.endsWith("/")) urlPath += "index.html";
  else if (!path.posix.extname(urlPath)) urlPath += "/index.html";

  const localPath = path.resolve(outputDirectory, `.${urlPath}`);
  return localPath.startsWith(outputDirectory) ? localPath : null;
}

collectHtmlFiles(outputDirectory);

for (const filePath of htmlFiles) {
  const $ = load(readFileSync(filePath, "utf8"));
  $("a[href]").each((_, element) => {
    const href = $(element).attr("href")?.trim();
    if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(href)) return;

    let url;
    try {
      url = new URL(href, siteOrigin);
    } catch {
      return;
    }

    const source = pagePath(filePath);
    const key = url.href;
    if (!checkedLinks.has(key)) checkedLinks.set(key, { url: key, sources: [] });
    checkedLinks.get(key).sources.push(source);
  });
}

const links = [...checkedLinks.values()];
let cursor = 0;
const concurrency = 12;

async function checkNext() {
  while (cursor < links.length) {
    const link = links[cursor++];
    const url = new URL(link.url);

    if (url.hostname === "mymerrylife.com" || url.hostname === "www.mymerrylife.com") {
      const filePath = localFileForUrl(url);
      link.status = filePath && statSyncSafe(filePath) ? 200 : 404;
      link.checkedAgainst = "static export";
      continue;
    }

    try {
      const response = await fetch(url, {
        headers: { "user-agent": "Mozilla/5.0 (compatible; MyMerryLifeLinkAudit/1.0)" },
        signal: AbortSignal.timeout(15000),
      });
      link.status = response.status;
      link.finalUrl = response.url;
      await response.body?.cancel();
    } catch (error) {
      link.status = "error";
      link.error = error instanceof Error ? error.message : String(error);
    }
  }
}

function statSyncSafe(filePath) {
  try {
    return statSync(filePath).isFile();
  } catch {
    return false;
  }
}

await Promise.all(Array.from({ length: concurrency }, () => checkNext()));

const counts = {};
for (const { status } of links) {
  const category = typeof status === "number" ? String(status) : status;
  counts[category] = (counts[category] || 0) + 1;
}

const report = {
  html_files_scanned: htmlFiles.length,
  unique_links_checked: links.length,
  status_counts: counts,
  broken_links: links.filter((link) => link.status === 404),
  blocked_or_unverified: links.filter((link) => link.status === "error" || link.status === 401 || link.status === 403),
};

console.log(JSON.stringify(report, null, 2));
