import { writeFileSync } from 'fs';

const COURSES = {
  "blog-setup": [
    "getting_started_blog","hosting_and_domain_name_blog","wordpress_set_up_blog",
    "bluehost_settings_blog","wordpress_settings_blog","choose_thrive_theme_package-blog",
    "thrive_suite_blog","basic_framework-blog","optimizing_your_website-blog"
  ],
  "company-website": [
    "getting_started_company","hosting_and_domain_name-company","wordpress_set_up-company",
    "bluehost_settings-company","wordpress_settings-company","choose_thrive_theme_package-company",
    "thrive_suite-company","basic_framework-company","optimizing_your_website-company"
  ],
  "ecommerce-setup": [
    "getting_started_woocommerce","hosting_and_domain_name-woocommerce","wordpress_set_up-woocommerce",
    "bluehost_settings-woocommerce","wordpress_settings-woocommerce","choose_thrive_theme_package-woocommerce",
    "thrive_suite-woocommerce","basic_framework-woocommerce","optimizing_your_website-woocommerce",
    "install_woocommerce","woocommerce_setting","thrive_theme_builder_for_shop",
    "build_categories_products_woocommerce","customized_template_woocommerce","registration_form_woocommerce",
    "woocommerce_delivery_and_payment","order_testing_woocommerce","ecpay_registration_woocommerce"
  ],
  "online-course-platform": [
    "getting_started_online_course","hosting_and_domain_name_online_course","wordpress_set_up-company-2",
    "bluehost_settings-company-2","wordpress_settings-company-2","choose_thrive_theme_package-company-2",
    "thrive_suite-company-2","basic_framework-company-2","optimizing_your_website-company-2",
    "thrive_apprentice-wizard","thrive-_apprentice_settings","build_your_first_class",
    "customize_your_school_templates","create_a_sales_page","install_woocommerce_ta",
    "setting_up_your_product_in_woocommerce","thrive_theme_builder_for_apprentice",
    "customized_check_out_page_template","build_a_sales_page_for_online_course",
    "woocommerce_payment_settings","order_testing_woocommerce-apprentice","ecpay_registration_apprentice",
    "apprentice_membership_management_pages","apprentice_header_custom_menu","registration_form_woocommerce-apprentice-2-2"
  ]
};

const lines = ['// Auto-generated. Do not edit.', ''];

// Generate static imports
for (const [, lessons] of Object.entries(COURSES)) {
  for (const slug of lessons) {
    const importVar = `c_${slug.replace(/-/g, '_').replace(/\./g, '_')}`;
    lines.push(`import ${importVar} from "./course-content/${slug}";`);
  }
}

lines.push('');

// Generate arrays and export
lines.push('export const LESSON_CONTENT: Record<string, string[]> = {');
for (const [courseKey, lessons] of Object.entries(COURSES)) {
  lines.push(`  "${courseKey}": [`);
  for (const slug of lessons) {
    const importVar = `c_${slug.replace(/-/g, '_').replace(/\./g, '_')}`;
    lines.push(`    ${importVar},`);
  }
  lines.push('  ],');
}
lines.push('};');
lines.push('');

const output = lines.join('\n');
const OUT_FILE = 'src/app/courses/[slug]/lesson-content-registry.ts';
writeFileSync(OUT_FILE, output, 'utf8');
console.log(`Generated ${OUT_FILE}`);
