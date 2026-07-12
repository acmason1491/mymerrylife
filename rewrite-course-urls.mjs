import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const COURSES_DIR = 'src/app/courses/[slug]/course-content';
const COURSES = {
  "blog-setup": {
    lessons: [
      "getting_started_blog","hosting_and_domain_name_blog","wordpress_set_up_blog",
      "bluehost_settings_blog","wordpress_settings_blog","choose_thrive_theme_package-blog",
      "thrive_suite_blog","basic_framework-blog","optimizing_your_website-blog"
    ]
  },
  "company-website": {
    lessons: [
      "getting_started_company","hosting_and_domain_name-company","wordpress_set_up-company",
      "bluehost_settings-company","wordpress_settings-company","choose_thrive_theme_package-company",
      "thrive_suite-company","basic_framework-company","optimizing_your_website-company"
    ]
  },
  "ecommerce-setup": {
    lessons: [
      "getting_started_woocommerce","hosting_and_domain_name-woocommerce","wordpress_set_up-woocommerce",
      "bluehost_settings-woocommerce","wordpress_settings-woocommerce","choose_thrive_theme_package-woocommerce",
      "thrive_suite-woocommerce","basic_framework-woocommerce","optimizing_your_website-woocommerce",
      "install_woocommerce","woocommerce_setting","thrive_theme_builder_for_shop",
      "build_categories_products_woocommerce","customized_template_woocommerce","registration_form_woocommerce",
      "woocommerce_delivery_and_payment","order_testing_woocommerce","ecpay_registration_woocommerce"
    ]
  },
  "online-course-platform": {
    lessons: [
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
  }
};

const lessonToCourse = {};
for (const [courseKey, course] of Object.entries(COURSES)) {
  for (const slug of course.lessons) {
    lessonToCourse[slug] = courseKey;
  }
}

const imgRegex = /src="https?:\/\/mymerrylife\.com\/wp-content\/uploads\/[^"]+"/gi;
const urlRegex = /https?:\/\/mymerrylife\.com\/wp-content\/uploads\/[^"]+/;

let totalFiles = 0;
let totalReplacements = 0;

const slugs = readdirSync(COURSES_DIR).filter(f => f.endsWith('.tsx')).map(f => f.replace('.tsx', ''));

for (const slug of slugs) {
  const courseKey = lessonToCourse[slug];
  if (!courseKey) { console.log('SKIP (no course):', slug); continue; }

  const filePath = join(COURSES_DIR, slug + '.tsx');
  let content = readFileSync(filePath, 'utf8');

  const matches = content.match(imgRegex);
  if (!matches) continue;

  let count = 0;
  content = content.replace(imgRegex, (match) => {
    const url = match.match(urlRegex)[0];
    const filename = url.split('/').pop();
    const newSrc = '/images/courses/' + courseKey + '/' + filename;
    count++;
    return 'src="' + newSrc + '"';
  });

  writeFileSync(filePath, content, 'utf8');
  totalFiles++;
  totalReplacements += count;
  console.log(slug + ': ' + count + ' replacements');
}

console.log('\nDone: ' + totalFiles + ' files, ' + totalReplacements + ' total replacements');
