import { writeFileSync } from "fs";
import { join } from "path";
import { setTimeout } from "timers/promises";

const CONTENT_DIR = "src/app/courses/[slug]/course-content";
const DELAY_MS = 500;

const files = [
  "getting_started_blog.tsx", "hosting_and_domain_name_blog.tsx", "wordpress_set_up_blog.tsx",
  "bluehost_settings_blog.tsx", "wordpress_settings_blog.tsx", "choose_thrive_theme_package-blog.tsx",
  "thrive_suite_blog.tsx", "basic_framework-blog.tsx", "optimizing_your_website-blog.tsx",
  "getting_started_company.tsx", "hosting_and_domain_name-company.tsx", "wordpress_set_up-company.tsx",
  "bluehost_settings-company.tsx", "wordpress_settings-company.tsx", "choose_thrive_theme_package-company.tsx",
  "thrive_suite-company.tsx", "basic_framework-company.tsx", "optimizing_your_website-company.tsx",
  "getting_started_woocommerce.tsx", "hosting_and_domain_name-woocommerce.tsx", "wordpress_set_up-woocommerce.tsx",
  "bluehost_settings-woocommerce.tsx", "wordpress_settings-woocommerce.tsx", "choose_thrive_theme_package-woocommerce.tsx",
  "thrive_suite-woocommerce.tsx", "basic_framework-woocommerce.tsx", "optimizing_your_website-woocommerce.tsx",
  "install_woocommerce.tsx", "woocommerce_setting.tsx", "thrive_theme_builder_for_shop.tsx",
  "build_categories_products_woocommerce.tsx", "customized_template_woocommerce.tsx",
  "registration_form_woocommerce.tsx", "woocommerce_delivery_and_payment.tsx",
  "order_testing_woocommerce.tsx", "ecpay_registration_woocommerce.tsx",
  "getting_started_online_course.tsx", "hosting_and_domain_name_online_course.tsx",
  "wordpress_set_up-company-2.tsx", "bluehost_settings-company-2.tsx", "wordpress_settings-company-2.tsx",
  "choose_thrive_theme_package-company-2.tsx", "thrive_suite-company-2.tsx",
  "basic_framework-company-2.tsx", "optimizing_your_website-company-2.tsx",
  "thrive_apprentice-wizard.tsx", "thrive-_apprentice_settings.tsx", "build_your_first_class.tsx",
  "customize_your_school_templates.tsx", "create_a_sales_page.tsx", "install_woocommerce_ta.tsx",
  "setting_up_your_product_in_woocommerce.tsx", "thrive_theme_builder_for_apprentice.tsx",
  "customized_check_out_page_template.tsx", "build_a_sales_page_for_online_course.tsx",
  "woocommerce_payment_settings.tsx", "order_testing_woocommerce-apprentice.tsx",
  "ecpay_registration_apprentice.tsx", "apprentice_membership_management_pages.tsx",
  "apprentice_header_custom_menu.tsx", "registration_form_woocommerce-apprentice-2-2.tsx",
];

function urlSlug(filename) { return filename.replace(".tsx", ""); }

function getCourseKey(filename) {
  const slug = filename.replace(".tsx", "");
  if (slug.endsWith("_blog") || slug.endsWith("-blog")) return "blog-setup";
  if (slug.endsWith("_company") || slug.endsWith("-company")) return "company-website";
  if (slug.endsWith("_woocommerce") || slug.endsWith("-woocommerce")) return "ecommerce-setup";
  return "online-course-platform";
}

async function fetchContent(filename) {
  const slug = urlSlug(filename);
  const url = `https://mymerrylife.com/course/${slug}/`;
  console.log(`Fetching: ${url}`);

  try {
    const resp = await fetch(url);
    if (!resp.ok) { console.log(`  Failed (${resp.status})`); return null; }
    const html = await resp.text();

    // Extract from <section class="tcb-post-content..."> to the closing </section>
    // This captures ALL content including multiple thrive-group-edit-config sections
    const startIdx = html.indexOf('<section class="tcb-post-content');
    if (startIdx < 0) { console.log("  No tcb-post-content found"); return null; }

    // Find the matching </section> - skip nested sections
    let depth = 0;
    let endIdx = startIdx;
    const SECTION_OPEN = '<section';
    const SECTION_CLOSE = '</section>';

    for (let i = startIdx; i < html.length; i++) {
      if (html.substring(i, i + SECTION_OPEN.length) === SECTION_OPEN) depth++;
      if (html.substring(i, i + SECTION_CLOSE.length) === SECTION_CLOSE) {
        depth--;
        if (depth === 0) { endIdx = i + SECTION_CLOSE.length; break; }
      }
    }

    const raw = html.substring(startIdx, endIdx);

    // Rewrite image URLs
    const courseKey = getCourseKey(filename);
    const rewritten = raw.replace(/https?:\/\/mymerrylife\.com\/wp-content\/uploads\//g, `/images/courses/${courseKey}/`);

    const tsx = `const content = \`<div class="lesson-content">
${rewritten}
</div>\`;

export default content;
`;

    writeFileSync(join(CONTENT_DIR, filename), tsx);

    const linkCount = (tsx.match(/href="https?:\/\//g) || []).length;
    console.log(`  Written: ${filename} (${tsx.length} chars, ${linkCount} links)`);
    return true;
  } catch (e) {
    console.log(`  Error: ${e.message}`);
    return null;
  }
}

async function main() {
  for (const filename of files) {
    await fetchContent(filename);
    await setTimeout(DELAY_MS);
  }
  console.log("\nDone.");
}

main();
