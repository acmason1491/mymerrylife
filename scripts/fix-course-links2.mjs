import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const CONTENT_DIR = "src/app/courses/[slug]/course-content";

const GOOGLE_DOCS_PRIVACY = "https://docs.google.com/document/d/1VRQwhPcA0d0bA59dnlbar26gXRugEFTp5-jiYdqvAYA/edit?usp=sharing";
const THRIVE_SUITE = "http://mymerrylife.com/thrive-suite/";

const REPLACEMENTS = {
  "choose_thrive_theme_package-blog.tsx": [THRIVE_SUITE],
  "choose_thrive_theme_package-company.tsx": [THRIVE_SUITE],
  "choose_thrive_theme_package-company-2.tsx": [THRIVE_SUITE],
  "choose_thrive_theme_package-woocommerce.tsx": [THRIVE_SUITE],
  "build_a_sales_page_for_online_course.tsx": [GOOGLE_DOCS_PRIVACY],
  "create_a_sales_page.tsx": [GOOGLE_DOCS_PRIVACY],
  "customized_check_out_page_template.tsx": [GOOGLE_DOCS_PRIVACY],
  "customized_template_woocommerce.tsx": [GOOGLE_DOCS_PRIVACY],
  "woocommerce_setting.tsx": [GOOGLE_DOCS_PRIVACY, GOOGLE_DOCS_PRIVACY],
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
