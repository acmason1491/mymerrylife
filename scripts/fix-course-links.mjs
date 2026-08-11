import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const CONTENT_DIR = "src/app/courses/[slug]/course-content";

// Pattern: <a ... href="" ... class="tcb-button-link tva-resource-link ...">
// These are Thrive resource links that need URLs restored

const REPLACEMENTS = {
  "getting_started_blog.tsx": [
    "https://startablog.mymerrylife.com/canva",    // Canva
    "https://startablog.mymerrylife.com/fiverr",   // Fiverr
    "http://mymerrylife.com/start_a_profitable_blog/", // Blog post
  ],
  "getting_started_company.tsx": [
    "https://startablog.mymerrylife.com/canva",
    "https://startablog.mymerrylife.com/fiverr",
  ],
  "getting_started_woocommerce.tsx": [
    "https://startablog.mymerrylife.com/canva",
    "https://startablog.mymerrylife.com/fiverr",
  ],
  "getting_started_online_course.tsx": [
    "https://startablog.mymerrylife.com/canva",
    "https://startablog.mymerrylife.com/fiverr",
  ],
  "basic_framework-blog.tsx": [
    "https://docs.google.com/document/d/1VRQwhPcA0d0bA59dnlbar26gXRugEFTp5-jiYdqvAYA/edit?usp=sharing",
  ],
  "basic_framework-company.tsx": [
    "https://docs.google.com/document/d/1VRQwhPcA0d0bA59dnlbar26gXRugEFTp5-jiYdqvAYA/edit?usp=sharing",
  ],
  "basic_framework-company-2.tsx": [
    "https://docs.google.com/document/d/1VRQwhPcA0d0bA59dnlbar26gXRugEFTp5-jiYdqvAYA/edit?usp=sharing",
  ],
  "basic_framework-woocommerce.tsx": [
    "https://docs.google.com/document/d/1VRQwhPcA0d0bA59dnlbar26gXRugEFTp5-jiYdqvAYA/edit?usp=sharing",
  ],
};

for (const [filename, urls] of Object.entries(REPLACEMENTS)) {
  let content = readFileSync(join(CONTENT_DIR, filename), "utf-8");
  let replaced = 0;
  for (const url of urls) {
    const oldHref = 'href=""';
    const idx = content.indexOf(oldHref);
    if (idx >= 0) {
      const before = content.substring(0, idx);
      const after = content.substring(idx + oldHref.length);
      content = before + `href="${url}"` + after;
      replaced++;
    }
  }
  if (replaced > 0) {
    writeFileSync(join(CONTENT_DIR, filename), content);
    console.log(`Fixed ${replaced}/${urls.length} links in ${filename}`);
  }
}

console.log("Done.");
