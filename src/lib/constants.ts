export const SITE_CONFIG = {
  name: "My Merry Life",
  description: "免費 WordPress 網站架設教學平台 — 從零開始學習，建立屬於自己的網站、部落格、購物商店與線上課程",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://acmason1491.github.io/mymerrylife",
  ogImage: "/images/og-default.jpg",
  email: "hello@mymerrylife.com",
  social: {
    facebook: "https://facebook.com/mymerrylife",
    youtube: "https://youtube.com/@mymerrylife",
  },
  pagination: {
    pageSize: 12,
  },
};

export const NAV_ITEMS = [
  { label: "首頁", href: "/" },
  { label: "文章", href: "/posts" },
  { label: "課程", href: "/courses" },
  { label: "收藏", href: "/bookmarks" },
  { label: "關於", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "聯絡我們", href: "/contact" },
] as const;

export const CATEGORIES = [
  { name: "WordPress 教學", slug: "wordpress" },
  { name: "前端開發", slug: "frontend" },
  { name: "後端開發", slug: "backend" },
  { name: "JavaScript", slug: "javascript" },
  { name: "部落格經營", slug: "blogging" },
  { name: "網賺技巧", slug: "make-money" },
  { name: "好用工具", slug: "tools" },
] as const;

export const FAQS = [
  {
    question: "我是新手，不懂任何程式語言，可以自行架設網站嗎？",
    answer: "完全可以！我們的教學就是專為完全沒有程式經驗的新手設計的。你只需要會上網、會打字，跟著步驟操作即可。",
  },
  {
    question: "自行架設網站需要花很多錢嗎？",
    answer: "初期費用非常低。網域一年約 300-500 元，主機租用每月約 100-300 元起，比聘請設計師省下數萬元。",
  },
  {
    question: "我需要什麼工具來架設網站？",
    answer: "只需要一台電腦、網路連線，以及我們的免費教學。我們會一步步教你從申請網域、租用主機到完成網站。",
  },
  {
    question: "課程是免費的嗎？",
    answer: "是的，目前所有教學內容都是完全免費的。未來計畫推出進階付費課程，但基礎課程將永遠保持免費。",
  },
  {
    question: "完成課程後我能做到什麼程度？",
    answer: "完成課程後，你將能獨立架設專業的 WordPress 網站，包含公司官網、個人部落格、購物商店或線上課程平台。",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "陳小明",
    role: "部落客",
    content: "完全不懂程式也能照著做出網站，教學步驟非常清楚！",
    avatar: "/images/avatars/user-1.jpg",
  },
  {
    name: "林美玲",
    role: "創業者",
    content: "省下了好幾萬的設計費，自己做出來超有成就感！",
    avatar: "/images/avatars/user-2.jpg",
  },
  {
    name: "張大偉",
    role: "自由工作者",
    content: "從申請網域到完成網站，只花了一個週末，太值得了。",
    avatar: "/images/avatars/user-3.jpg",
  },
] as const;
