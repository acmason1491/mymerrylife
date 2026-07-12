import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const COURSES_DIR = 'src/app/courses/[slug]/course-content';
const IMAGES_DIR = 'public/images/courses';
const SITE = 'https://mymerrylife.com';

if (!existsSync(IMAGES_DIR)) mkdirSync(IMAGES_DIR, { recursive: true });
if (!existsSync(COURSES_DIR)) mkdirSync(COURSES_DIR, { recursive: true });

const COURSES = {
  "blog-setup": {
    title: "個人部落格(Blog)架設",
    label: "免費課程 - Blog",
    lessons: [
      { slug: "getting_started_blog", title: "個人部落格(Blog)架設教學 – 前言", module: "個人部落格(Blog)架設" },
      { slug: "hosting_and_domain_name_blog", title: "登入 Bluehost 平台開始註冊網域名和租用虛擬主機", module: "步驟一: 註冊網域名、租用虛擬主機並安裝 WordPress" },
      { slug: "wordpress_set_up_blog", title: "安裝 WordPress", module: "步驟一: 註冊網域名、租用虛擬主機並安裝 WordPress" },
      { slug: "bluehost_settings_blog", title: "Bluehost 控制面板設定", module: "步驟二： bluehost 和 WordPress 相關設定" },
      { slug: "wordpress_settings_blog", title: "WordPress 控制面板設定", module: "步驟二： bluehost 和 WordPress 相關設定" },
      { slug: "choose_thrive_theme_package-blog", title: "根據你的架站需求選擇最經濟實惠的外掛組合！", module: "步驟三：網站編輯與設計" },
      { slug: "thrive_suite_blog", title: "安裝 Thrive Architect 與 Thrive Theme Builder 外掛", module: "步驟三：網站編輯與設計" },
      { slug: "basic_framework-blog", title: "網站主要頁面的創建與編輯", module: "步驟三：網站編輯與設計" },
      { slug: "optimizing_your_website-blog", title: "網站主題及主要頁面的優化", module: "步驟三：網站編輯與設計" },
    ]
  },
  "company-website": {
    title: "公司官方網站架設",
    label: "免費課程 - Company",
    lessons: [
      { slug: "getting_started_company", title: "架設 WordPress 公司官方網站 – 前言", module: "公司官方網站架設" },
      { slug: "hosting_and_domain_name-company", title: "註冊網域名 & 租用虛擬主機 - Bluehost", module: "步驟一: 註冊網域名、租用虛擬主機並安裝 WordPress" },
      { slug: "wordpress_set_up-company", title: "安裝 WordPress", module: "步驟一: 註冊網域名、租用虛擬主機並安裝 WordPress" },
      { slug: "bluehost_settings-company", title: "Bluehost 控制面板設定", module: "步驟二： bluehost 和 WordPress 相關設定" },
      { slug: "wordpress_settings-company", title: "WordPress 控制面板設定", module: "步驟二： bluehost 和 WordPress 相關設定" },
      { slug: "choose_thrive_theme_package-company", title: "根據你的架站需求選擇最經濟實惠的外掛組合！", module: "步驟三：網站編輯與設計" },
      { slug: "thrive_suite-company", title: "安裝 Thrive Architect 與 Thrive Theme Builder 外掛", module: "步驟三：網站編輯與設計" },
      { slug: "basic_framework-company", title: "網站主要頁面的創建與編輯", module: "步驟三：網站編輯與設計" },
      { slug: "optimizing_your_website-company", title: "網站主題及主要頁面的優化", module: "步驟三：網站編輯與設計" },
    ]
  },
  "ecommerce-setup": {
    title: "購物網站架設",
    label: "免費課程 - Store",
    lessons: [
      { slug: "getting_started_woocommerce", title: "架設 WordPress 購物網站 – 前言", module: "購物網站架設" },
      { slug: "hosting_and_domain_name-woocommerce", title: "註冊網域名 & 租用虛擬主機 - Bluehost", module: "步驟一: 註冊網域名、租用虛擬主機並安裝 WordPress" },
      { slug: "wordpress_set_up-woocommerce", title: "安裝 WordPress", module: "步驟一: 註冊網域名、租用虛擬主機並安裝 WordPress" },
      { slug: "bluehost_settings-woocommerce", title: "Bluehost 控制面板設定", module: "步驟二： bluehost 和 WordPress 相關設定" },
      { slug: "wordpress_settings-woocommerce", title: "WordPress 控制面板設定", module: "步驟二： bluehost 和 WordPress 相關設定" },
      { slug: "choose_thrive_theme_package-woocommerce", title: "根據你的架站需求選擇最經濟實惠的外掛組合！", module: "步驟三：網站編輯與設計" },
      { slug: "thrive_suite-woocommerce", title: "外掛購買與安裝 (Thrive Architect + Thrive Theme Builder)", module: "步驟三：網站編輯與設計" },
      { slug: "basic_framework-woocommerce", title: "網站主要頁面的創建與編輯", module: "步驟三：網站編輯與設計" },
      { slug: "optimizing_your_website-woocommerce", title: "網站主題及主要頁面的優化", module: "步驟三：網站編輯與設計" },
      { slug: "install_woocommerce", title: "安裝 WooCommerce 外掛", module: "步驟四：建立購物網站主頁" },
      { slug: "woocommerce_setting", title: "WooCommerce 基本設定", module: "步驟四：建立購物網站主頁" },
      { slug: "thrive_theme_builder_for_shop", title: "在 Thrive Theme Builder 中選擇並套用模板", module: "步驟四：建立購物網站主頁" },
      { slug: "build_categories_products_woocommerce", title: "建立產品類別並發布第一個產品到商店", module: "步驟五：編輯購物網站主頁" },
      { slug: "customized_template_woocommerce", title: "客製化購物網站模板", module: "步驟五：編輯購物網站主頁" },
      { slug: "registration_form_woocommerce", title: "建立會員註冊功能", module: "步驟五：編輯購物網站主頁" },
      { slug: "woocommerce_delivery_and_payment", title: "WooCommerce 金流、物流設定", module: "步驟六：金流、物流串接" },
      { slug: "order_testing_woocommerce", title: "購物下單測試", module: "步驟六：金流、物流串接" },
      { slug: "ecpay_registration_woocommerce", title: "綠界科技會員註冊 & 設定", module: "步驟六：金流、物流串接" },
    ]
  },
  "online-course-platform": {
    title: "打造屬於自己的線上課程平台 - 建立可以販售的線上課程",
    label: "進階課程",
    lessons: [
      { slug: "getting_started_online_course", title: "前言 & 預先準備事項", module: "第一章：架設 WordPress 網站" },
      { slug: "hosting_and_domain_name_online_course", title: "註冊網域名 & 租用虛擬主機 – Bluehost", module: "第一章：架設 WordPress 網站" },
      { slug: "wordpress_set_up-company-2", title: "安裝 WordPress", module: "第一章：架設 WordPress 網站" },
      { slug: "bluehost_settings-company-2", title: "Bluehost 控制面板設定", module: "第一章：架設 WordPress 網站" },
      { slug: "wordpress_settings-company-2", title: "WordPress 控制面板設定", module: "第一章：架設 WordPress 網站" },
      { slug: "choose_thrive_theme_package-company-2", title: "根據你的架站需求選擇最經濟實惠的外掛組合！", module: "第一章：架設 WordPress 網站" },
      { slug: "thrive_suite-company-2", title: "安裝 Thrive Suite 所有外掛", module: "第一章：架設 WordPress 網站" },
      { slug: "basic_framework-company-2", title: "網站主要頁面的創建與編輯", module: "第一章：架設 WordPress 網站" },
      { slug: "optimizing_your_website-company-2", title: "網站主題及主要頁面的優化", module: "第一章：架設 WordPress 網站" },
      { slug: "thrive_apprentice-wizard", title: "Thrive Apprentice 設定精靈", module: "第二章：建立線上課程" },
      { slug: "thrive-_apprentice_settings", title: "Thrive Apprentice 基本設定", module: "第二章：建立線上課程" },
      { slug: "build_your_first_class", title: "建立第一個課程", module: "第二章：建立線上課程" },
      { slug: "customize_your_school_templates", title: "自定義課程網頁模板", module: "第二章：建立線上課程" },
      { slug: "create_a_sales_page", title: "建立銷售課程", module: "第二章：建立線上課程" },
      { slug: "install_woocommerce_ta", title: "安裝 WooCommerce 外掛及設置", module: "第三章：銷售線上課程" },
      { slug: "setting_up_your_product_in_woocommerce", title: "在 WooCommerce 中新增線上課程產品", module: "第三章：銷售線上課程" },
      { slug: "thrive_theme_builder_for_apprentice", title: "在 Thrive Theme Builder 中選擇並套用模板", module: "第三章：銷售線上課程" },
      { slug: "customized_check_out_page_template", title: "客製化結帳頁面模板", module: "第三章：銷售線上課程" },
      { slug: "build_a_sales_page_for_online_course", title: "製作課程的銷售業面 (Sales Page)", module: "第三章：銷售線上課程" },
      { slug: "woocommerce_payment_settings", title: "WooCommerce 金流、物流設定", module: "第三章：銷售線上課程" },
      { slug: "order_testing_woocommerce-apprentice", title: "銷售頁面下單測試", module: "第三章：銷售線上課程" },
      { slug: "ecpay_registration_apprentice", title: "綠界科技會員註冊 & 設定", module: "第三章：銷售線上課程" },
      { slug: "apprentice_membership_management_pages", title: "新增會員相關頁面", module: "第四章：會員管理" },
      { slug: "apprentice_header_custom_menu", title: "編輯 Header 主選單項目", module: "第四章：會員管理" },
      { slug: "registration_form_woocommerce-apprentice-2-2", title: "主選單優化 (Optimization) – 會員專屬名稱及圖像", module: "第四章：會員管理" },
    ]
  }
};

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function extractContent(html, lessonTitle) {
  // Remove scripts, styles, nav, header, footer
  let clean = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');

  // Try to find the main content area - look for the lesson content
  // In Thrive Apprentice, content is usually in .tva-content or similar
  const mainMatch = clean.match(/<div[^>]*class="[^"]*tva-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<div[^>]*class="[^"]*tva-sidebar/i);
  
  let content = '';
  if (mainMatch) {
    content = mainMatch[1];
  } else {
    // Fallback: try to get content after first <h1> and before the sidebar
    const h1Match = clean.match(/<h1[^>]*>[\s\S]*?<\/h1>([\s\S]*?)(?:<div[^>]*class="[^"]*sidebar|$)/i);
    if (h1Match) content = h1Match[1];
    else content = clean;
  }

  // Convert relative URLs to absolute
  content = content.replace(/src="\//g, `src="${SITE}/`);

  // Extract image URLs for downloading
  const imgUrls = [];
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
  let m;
  while ((m = imgRegex.exec(content)) !== null) {
    imgUrls.push(m[1]);
  }
  
  // Remove links that point to external sites (keep only text)
  content = content.replace(/<a[^>]*href="https?:\/\/(?!mymerrylife\.com)[^"]*"[^>]*>([\s\S]*?)<\/a>/gi, '$1');
  // Keep internal links but remove the href for static export
  content = content.replace(/<a[^>]*>(.*?)<\/a>/gi, '$1');
  
  // Clean up excessive whitespace
  content = content.replace(/\n{3,}/g, '\n\n');
  
  // Wrap in div
  return { content: `<div class="lesson-content">\n${content.trim()}\n</div>`, imgUrls };
}

function generateContentFile(courseKey, lesson, content, imgUrls) {
  const lines = [`const content = \`${content}\`;\n`, `\nexport default content;\n`];
  return lines.join('');
}

async function downloadImage(url, destPath) {
  if (existsSync(destPath)) return 'skipped';
  try {
    // Use http for mymerrylife.com
    const response = await fetch(url.replace('http://', 'http://'));
    if (!response.ok) return 'failed';
    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync(destPath, buffer);
    return 'downloaded';
  } catch (err) {
    return 'failed';
  }
}

async function main() {
  let totalDownloaded = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  for (const [courseKey, course] of Object.entries(COURSES)) {
    const courseImgDir = join(IMAGES_DIR, courseKey);
    if (!existsSync(courseImgDir)) mkdirSync(courseImgDir, { recursive: true });

    for (const lesson of course.lessons) {
      const url = `${SITE}/course/${lesson.slug}/`;
      const contentFile = join(COURSES_DIR, `${lesson.slug}.tsx`);

      if (existsSync(contentFile)) {
        console.log(`SKIP (exists): ${lesson.slug}`);
        continue;
      }

      try {
        console.log(`FETCH: ${lesson.title} (${url})`);
        const response = await fetch(url);
        const html = await response.text();
        
        const { content, imgUrls } = extractContent(html, lesson.title);
        
        if (content.length < 50) {
          console.log(`  WARN: Very short content (${content.length} chars) for ${lesson.slug}`);
        }

        // Download images
        for (const imgUrl of imgUrls) {
          // Use original filename
          const urlObj = new URL(imgUrl);
          const filename = urlObj.pathname.split('/').pop();
          const destPath = join(courseImgDir, filename);
          
          const result = await downloadImage(imgUrl, destPath);
          if (result === 'downloaded') { totalDownloaded++; console.log(`  IMG DL: ${filename}`); }
          else if (result === 'skipped') { totalSkipped++; }
          else { totalFailed++; console.log(`  IMG FAIL: ${filename} from ${imgUrl}`); }
        }

        // Write content file
        const fileContent = generateContentFile(courseKey, lesson, content, imgUrls);
        writeFileSync(contentFile, fileContent, 'utf8');
        console.log(`  OK: ${lesson.slug} (${imgUrls.length} images)`);

      } catch (err) {
        console.error(`  ERROR: ${lesson.slug} - ${err.message}`);
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Images downloaded: ${totalDownloaded}, skipped: ${totalSkipped}, failed: ${totalFailed}`);
}

main().catch(console.error);
