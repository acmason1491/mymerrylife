import { assetPath } from "@/lib/utils";
import type { PostListItem, CourseListItem } from "@/types";

const IMG = (p: string) => assetPath(`/images/${p}`);
const T = (name: string, slug: string) => ({ tag: { name, slug } });

export const MOCK_POSTS: PostListItem[] = [
   { id: "1", title: "WordPress 基礎設定完整指南", slug: "wordpress-basics", excerpt: "從安裝到完成基本設定，一步步帶你操作 WordPress 後台。", coverImage: IMG("posts/wordpress-basics.png"), publishedAt: "2026-06-15", readingTime: 8, author: { name: "管理員", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [T("WordPress", "wordpress"), T("入門", "beginner")] },
   { id: "2", title: "如何選擇適合的網域名稱", slug: "choose-domain-name", excerpt: "網域名稱是網站的第一印象，教你如何選擇最好的域名。", coverImage: IMG("posts/choose-domain-name.png"), publishedAt: "2026-06-10", readingTime: 5, author: { name: "管理員", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [T("WordPress", "wordpress"), T("入門", "beginner")] },
   { id: "3", title: "WooCommerce 購物車設定教學", slug: "woocommerce-setup", excerpt: "一步步帶你在 WordPress 上建立完整的網路商店。", coverImage: IMG("posts/woocommerce-setup.png"), publishedAt: "2026-06-05", readingTime: 12, author: { name: "管理員", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [T("WooCommerce", "woocommerce"), T("購物網站", "ecommerce")] },
   { id: "4", title: "SEO 基礎入門：讓你的文章被 Google 看見", slug: "seo-basics", excerpt: "了解搜尋引擎優化的核心概念，提升網站流量。", coverImage: IMG("posts/seo-basics.png"), publishedAt: "2026-05-28", readingTime: 7, author: { name: "管理員", image: null }, category: { name: "部落格經營", slug: "blogging" }, tags: [T("SEO", "seo"), T("流量", "traffic")] },
   { id: "5", title: "HTML 語意化標籤使用指南", slug: "html-semantic-tags", excerpt: "了解 HTML5 語意化標籤的正確使用方式，提升網站可讀性與 SEO。", coverImage: IMG("posts/html-semantic-tags.png"), publishedAt: "2026-05-20", readingTime: 6, author: { name: "管理員", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [T("HTML", "html"), T("前端", "frontend")] },
   { id: "6", title: "CSS Flexbox 完全攻略", slug: "css-flexbox-guide", excerpt: "從基礎到進階，徹底掌握 Flexbox 排版技巧。", coverImage: IMG("posts/css-flexbox-guide.png"), publishedAt: "2026-05-15", readingTime: 10, author: { name: "管理員", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [T("CSS", "css"), T("Flexbox", "flexbox")] },
   { id: "7", title: "JavaScript 基礎入門", slug: "javascript-basics", excerpt: "JavaScript 是網頁互動的核心，從變數開始學起。", coverImage: null, publishedAt: "2026-05-10", readingTime: 15, author: { name: "管理員", image: null }, category: { name: "JavaScript", slug: "javascript" }, tags: [T("JavaScript", "javascript"), T("入門", "beginner")] },
   { id: "8", title: "React 元件開發實戰", slug: "react-components", excerpt: "學習 React 元件化開發，建立可重用的 UI 元件。", coverImage: null, publishedAt: "2026-05-05", readingTime: 12, author: { name: "管理員", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [T("React", "react"), T("前端", "frontend")] },
   { id: "9", title: "Node.js 後端開發入門", slug: "nodejs-basics", excerpt: "使用 JavaScript 開發伺服器端應用程式。", coverImage: null, publishedAt: "2026-04-28", readingTime: 10, author: { name: "管理員", image: null }, category: { name: "後端開發", slug: "backend" }, tags: [T("Node.js", "nodejs"), T("後端", "backend")] },
];

export const MOCK_COURSES: CourseListItem[] = [
  { id: "c1", title: "個人部落格架設", slug: "blog-setup", description: "從零開始建立自己的 WordPress 部落格", excerpt: "不需要任何程式背景，跟著步驟就能完成", coverImage: IMG("courses/blog-setup.png"), price: 0, level: "BEGINNER", duration: 120, lessonCount: 9, category: { name: "WordPress 教學", slug: "wordpress" } },
  { id: "c2", title: "公司官方網站架設", slug: "company-website", description: "為您的企業打造專業的公司網站", excerpt: "節省高額設計費用，自己動手做", coverImage: IMG("courses/company-website.png"), price: 0, level: "BEGINNER", duration: 150, lessonCount: 9, category: { name: "WordPress 教學", slug: "wordpress" } },
  { id: "c3", title: "購物網站架設", slug: "ecommerce-setup", description: "建立屬於自己的網路商店", excerpt: "WooCommerce 完整教學，從安裝到上線", coverImage: IMG("courses/ecommerce-setup.png"), price: 0, level: "INTERMEDIATE", duration: 240, lessonCount: 18, category: { name: "WordPress 教學", slug: "wordpress" } },
  { id: "c4", title: "線上課程平台打造", slug: "online-course-platform", description: "建立可銷售的線上課程平台", excerpt: "Thrive Apprentice + WooCommerce 完整整合", coverImage: IMG("courses/online-course-platform.png"), price: 0, level: "INTERMEDIATE", duration: 360, lessonCount: 24, category: { name: "WordPress 教學", slug: "wordpress" } },
  { id: "c5", title: "前端開發基礎", slug: "frontend-basics", description: "HTML、CSS、JavaScript 網頁前端核心技術", excerpt: "掌握現代前端開發的核心技能", coverImage: IMG("courses/frontend-basics.png"), price: 0, level: "BEGINNER", duration: 480, lessonCount: 23, category: { name: "前端開發", slug: "frontend" } },
  { id: "c6", title: "React 框架實戰", slug: "react-practice", description: "從基礎到實戰，掌握 React 生態系", excerpt: "元件化開發、Hooks、狀態管理", coverImage: IMG("courses/react-practice.png"), price: 0, level: "INTERMEDIATE", duration: 360, lessonCount: 18, category: { name: "前端開發", slug: "frontend" } },
];

export const TAGS = [
  { name: "WordPress", slug: "wordpress" },
  { name: "入門", slug: "beginner" },
  { name: "WooCommerce", slug: "woocommerce" },
  { name: "購物網站", slug: "ecommerce" },
  { name: "SEO", slug: "seo" },
  { name: "流量", slug: "traffic" },
  { name: "HTML", slug: "html" },
  { name: "前端", slug: "frontend" },
  { name: "CSS", slug: "css" },
  { name: "Flexbox", slug: "flexbox" },
  { name: "JavaScript", slug: "javascript" },
  { name: "React", slug: "react" },
  { name: "Node.js", slug: "nodejs" },
  { name: "後端", slug: "backend" },
];
