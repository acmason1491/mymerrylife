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
   { id: "10", title: "HTML 筆記", slug: "html-notes", excerpt: "HTML (HyperText Markup Language) 是打造網頁的基石，從基本結構到常用標籤、表單與多媒體的完整筆記。", coverImage: null, publishedAt: "2026-07-10", readingTime: 10, author: { name: "Mason", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [T("HTML", "html"), T("前端", "frontend")] },
   { id: "11", title: "CSS 筆記", slug: "css-notes", excerpt: "從 CSS 基礎選擇器、盒模型、Flexbox、Grid 到動畫與響應式設計的完整學習筆記。", coverImage: null, publishedAt: "2026-07-10", readingTime: 20, author: { name: "Mason", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [T("CSS", "css"), T("前端", "frontend")] },
   { id: "12", title: "JavaScript 筆記 – 1", slug: "js-notes-1", excerpt: "JavaScript 基礎：常見函數、Lexical Structure、變數、資料型別、運算子與控制流程。", coverImage: null, publishedAt: "2026-07-10", readingTime: 15, author: { name: "Mason", image: null }, category: { name: "JavaScript", slug: "javascript" }, tags: [T("JavaScript", "javascript")] },
   { id: "13", title: "JavaScript 筆記 – 2", slug: "js-notes-2", excerpt: "JavaScript 進階：物件、陣列、函式進階、JSON、Storage、錯誤處理、非同步與模組。", coverImage: null, publishedAt: "2026-07-10", readingTime: 20, author: { name: "Mason", image: null }, category: { name: "JavaScript", slug: "javascript" }, tags: [T("JavaScript", "javascript")] },
   { id: "14", title: "JavaScript 筆記 – DOM", slug: "js-notes-dom", excerpt: "JavaScript DOM 操作：選取元素、事件處理、節點遍歷與操作、視窗事件與表單處理。", coverImage: null, publishedAt: "2026-07-10", readingTime: 15, author: { name: "Mason", image: null }, category: { name: "JavaScript", slug: "javascript" }, tags: [T("JavaScript", "javascript"), T("DOM", "dom")] },
   { id: "15", title: "React 筆記 – 前端框架", slug: "react-notes", excerpt: "React 前端框架學習筆記：SPA 概念、元件化開發、JSX、Props、State 與 Hooks。", coverImage: null, publishedAt: "2026-07-10", readingTime: 15, author: { name: "Mason", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [T("React", "react"), T("前端", "frontend")] },
   { id: "16", title: "後端開發 筆記 – 1", slug: "backend-notes-1", excerpt: "版本控制 (Git)、命令列基礎、資料結構概論、Node.js 入門與 Express 框架。", coverImage: null, publishedAt: "2026-07-10", readingTime: 20, author: { name: "Mason", image: null }, category: { name: "後端開發", slug: "backend" }, tags: [T("後端", "backend"), T("Node.js", "nodejs")] },
   { id: "17", title: "後端開發 筆記 – 2", slug: "backend-notes-2", excerpt: "MySQL 資料庫、MongoDB NoSQL 資料庫、Mongoose ODM 與綠界金流 API 整合。", coverImage: null, publishedAt: "2026-07-10", readingTime: 25, author: { name: "Mason", image: null }, category: { name: "後端開發", slug: "backend" }, tags: [T("後端", "backend"), T("MySQL", "mysql"), T("MongoDB", "mongodb")] },
   { id: "18", title: "後端開發 筆記 – 3", slug: "backend-notes-3", excerpt: "RESTful API 設計、第三方 API 串接、JWT 認證、真實專案架構與部署。", coverImage: null, publishedAt: "2026-07-10", readingTime: 20, author: { name: "Mason", image: null }, category: { name: "後端開發", slug: "backend" }, tags: [T("後端", "backend"), T("API", "api"), T("Node.js", "nodejs")] },
    { id: "19", title: "如何建立一個可賺錢的部落格 – 獲取個人的被動收入", slug: "start-profitable-blog", excerpt: "從選擇主題、架設網站、內容創作到流量變現，完整教學讓你建立能賺錢的部落格。", coverImage: null, publishedAt: "2026-07-10", readingTime: 15, author: { name: "Mason", image: null }, category: { name: "部落格經營", slug: "blogging" }, tags: [T("部落格", "blog"), T("網賺", "makemoney")] },
  { id: "20", title: "網賺初學者快速入門法 – 文章點擊賺錢方法 – 1 (Facebook)", slug: "makemoney-1", excerpt: "最簡單、容易上手的在家用網路賺錢方法", coverImage: null, publishedAt: "2026-07-10", readingTime: 5, author: { name: "Mason", image: null }, category: { name: "網賺技巧", slug: "makemoney" }, tags: [T("網賺", "makemoney")] },
  { id: "21", title: "網賺初學者快速入門法 – 文章點擊賺錢方法 – 2 (Facebook)", slug: "makemoney-2", excerpt: "進階Facebook文章點擊賺錢技巧", coverImage: null, publishedAt: "2026-07-10", readingTime: 5, author: { name: "Mason", image: null }, category: { name: "網賺技巧", slug: "makemoney" }, tags: [T("網賺", "makemoney")] },
  { id: "22", title: "分身帳號常被FB封鎖、停用嗎？– 如何避免被FB封鎖帳號", slug: "avoid-fb-block", excerpt: "教你如何避免Facebook分身帳號被封鎖", coverImage: null, publishedAt: "2026-07-10", readingTime: 5, author: { name: "Mason", image: null }, category: { name: "網賺技巧", slug: "makemoney" }, tags: [T("網賺", "makemoney")] },
  { id: "23", title: "如何增加網站流量？– 免費、簡單、好用的全自動軟體介紹(Hitleap)", slug: "hitleap-intro", excerpt: "使用Hitleap全自動增加網站流量", coverImage: null, publishedAt: "2026-07-10", readingTime: 8, author: { name: "Mason", image: null }, category: { name: "好用工具", slug: "tools" }, tags: [T("流量", "traffic")] },
  { id: "24", title: "全自動流量交換平台介紹、比較 (Hitleap vs BIGHITS4U)", slug: "hitleap-vs-bighits4u", excerpt: "比較兩個主流全自動流量交換平台", coverImage: null, publishedAt: "2026-07-10", readingTime: 10, author: { name: "Mason", image: null }, category: { name: "好用工具", slug: "tools" }, tags: [T("流量", "traffic")] },
  { id: "25", title: "自由職業者工作接案、工作外包平台 – Fiverr 網站介紹", slug: "fiverr-intro", excerpt: "Fiverr自由職業者接案平台完整介紹", coverImage: null, publishedAt: "2026-07-10", readingTime: 8, author: { name: "Mason", image: null }, category: { name: "好用工具", slug: "tools" }, tags: [T("WordPress", "wordpress")] },
  { id: "26", title: "如何註冊 AWeber ? AWeber Landing Page 製作與電子郵件行銷", slug: "aweber-landing-page", excerpt: "沒有網站也能製作一頁式廣告網頁", coverImage: null, publishedAt: "2026-07-10", readingTime: 15, author: { name: "Mason", image: null }, category: { name: "好用工具", slug: "tools" }, tags: [T("部落格", "blog")] },
  { id: "27", title: "如何使用 AWeber 網站對客戶進行自動化的群發功能 – 電子郵件行銷", slug: "aweber-broadcast", excerpt: "AWeber自動化群發郵件教學", coverImage: null, publishedAt: "2026-07-10", readingTime: 8, author: { name: "Mason", image: null }, category: { name: "好用工具", slug: "tools" }, tags: [T("部落格", "blog")] },
  { id: "28", title: "如何在 AWeber 平台建立一個自動化回覆的廣告活動 (Campaigns)", slug: "aweber-campaigns", excerpt: "AWeber Campaigns自動化回覆廣告活動教學", coverImage: null, publishedAt: "2026-07-10", readingTime: 8, author: { name: "Mason", image: null }, category: { name: "好用工具", slug: "tools" }, tags: [T("部落格", "blog")] },
  { id: "29", title: "如何自行架設網站? – 新手免費教學 (WordPress)", slug: "self-host-wordpress", excerpt: "從零開始學習自行架設WordPress網站", coverImage: null, publishedAt: "2026-07-10", readingTime: 20, author: { name: "Mason", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [T("WordPress", "wordpress"), T("入門", "beginner")] },
  { id: "30", title: "如何使用 Bluehost 快速架設網站? 簡單、易學 – 新手免費教學 (WordPress)", slug: "bluehost-setup", excerpt: "使用Bluehost快速架設WordPress網站完整教學", coverImage: null, publishedAt: "2026-07-10", readingTime: 25, author: { name: "Mason", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [T("WordPress", "wordpress"), T("入門", "beginner")] },
  { id: "31", title: "WordPress 網站手動搬家 – 更換虛擬主機網站搬家教學", slug: "wordpress-move", excerpt: "WordPress網站更換主機的手動搬家完整教學", coverImage: null, publishedAt: "2026-07-10", readingTime: 15, author: { name: "Mason", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [T("WordPress", "wordpress")] },
  { id: "32", title: "如何使用 HostGator 快速架設網站? 簡單、易學 – 新手免費教學 (WordPress)", slug: "hostgator-setup", excerpt: "使用HostGator快速架設WordPress網站完整教學", coverImage: null, publishedAt: "2026-07-10", readingTime: 25, author: { name: "Mason", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [T("WordPress", "wordpress"), T("入門", "beginner")] },
  { id: "33", title: "如何免費創建自己的網站 – Google協作平台 (Google site) 教學", slug: "google-site-free", excerpt: "免費使用Google協作平台建立自己的網站", coverImage: null, publishedAt: "2026-07-10", readingTime: 15, author: { name: "Mason", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [T("WordPress", "wordpress")] },
  { id: "34", title: "如何簡單、快速的製作精美的電子書 – designrr 設計平台介紹", slug: "designrr-ebook", excerpt: "使用designrr快速製作精美電子書", coverImage: null, publishedAt: "2026-07-10", readingTime: 12, author: { name: "Mason", image: null }, category: { name: "好用工具", slug: "tools" }, tags: [T("部落格", "blog")] },
  { id: "35", title: "超好用的 WordPress 全方位外掛 – Thrive Suite 介紹", slug: "thrive-suite", excerpt: "Thrive Architect 和 Thrive Theme Builder 完整介紹", coverImage: null, publishedAt: "2026-07-10", readingTime: 20, author: { name: "Mason", image: null }, category: { name: "好用工具", slug: "tools" }, tags: [T("WordPress", "wordpress")] },
  { id: "36", title: "如何使用 Thrive Theme Builder 構建固定式目錄 (Sticky Table of Contents)", slug: "sticky-table-of-contents", excerpt: "在長篇文章中構建固定式目錄的教學", coverImage: null, publishedAt: "2026-07-10", readingTime: 12, author: { name: "Mason", image: null }, category: { name: "好用工具", slug: "tools" }, tags: [T("WordPress", "wordpress")] },
  { id: "37", title: "如何在不同電腦之間共用滑鼠和鍵盤？– Mouse Without Borders 應用", slug: "mouse-without-borders", excerpt: "Mouse Without Borders跨電腦共用滑鼠鍵盤教學", coverImage: null, publishedAt: "2026-07-10", readingTime: 8, author: { name: "Mason", image: null }, category: { name: "好用工具", slug: "tools" }, tags: [T("好用工具", "tools")] },
];

export const MOCK_COURSES: CourseListItem[] = [
  { id: "c1", title: "個人部落格架設", slug: "blog-setup", description: "從零開始建立自己的 WordPress 部落格", excerpt: "不需要任何程式背景，跟著步驟就能完成", coverImage: IMG("courses/blog-setup.png"), price: 0, level: "BEGINNER", duration: 120, lessonCount: 9, category: { name: "WordPress 教學", slug: "wordpress" } },
  { id: "c2", title: "公司官方網站架設", slug: "company-website", description: "為您的企業打造專業的公司網站", excerpt: "節省高額設計費用，自己動手做", coverImage: IMG("courses/company-website.png"), price: 0, level: "BEGINNER", duration: 150, lessonCount: 9, category: { name: "WordPress 教學", slug: "wordpress" } },
  { id: "c3", title: "購物網站架設", slug: "ecommerce-setup", description: "建立屬於自己的網路商店", excerpt: "WooCommerce 完整教學，從安裝到上線", coverImage: IMG("courses/ecommerce-setup.png"), price: 0, level: "INTERMEDIATE", duration: 240, lessonCount: 18, category: { name: "WordPress 教學", slug: "wordpress" } },
  { id: "c4", title: "線上課程平台打造", slug: "online-course-platform", description: "建立可銷售的線上課程平台", excerpt: "Thrive Apprentice + WooCommerce 完整整合", coverImage: IMG("courses/online-course-platform.png"), price: 0, level: "INTERMEDIATE", duration: 360, lessonCount: 24, category: { name: "WordPress 教學", slug: "wordpress" } },

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
  { name: "DOM", slug: "dom" },
  { name: "MySQL", slug: "mysql" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "API", slug: "api" },
  { name: "部落格", slug: "blog" },
  { name: "網賺", slug: "makemoney" },
];
