import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/section-header";
import { PostCard } from "@/components/shared/post-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import type { PostListItem } from "@/types";

export const metadata: Metadata = {
  title: "文章列表 | My Merry Life",
  description: "瀏覽所有 WordPress 教學、前端開發、後端開發、部落格經營等文章",
};

const MOCK_POSTS: PostListItem[] = [
  { id: "1", title: "WordPress 基礎設定完整指南", slug: "wordpress-basics", excerpt: "從安裝到完成基本設定，一步步帶你操作 WordPress 後台。", coverImage: null, publishedAt: "2026-06-15", readingTime: 8, author: { name: "管理員", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [] },
  { id: "2", title: "如何選擇適合的網域名稱", slug: "choose-domain-name", excerpt: "網域名稱是網站的第一印象，教你如何選擇最好的域名。", coverImage: null, publishedAt: "2026-06-10", readingTime: 5, author: { name: "管理員", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [] },
  { id: "3", title: "WooCommerce 購物車設定教學", slug: "woocommerce-setup", excerpt: "一步步帶你在 WordPress 上建立完整的網路商店。", coverImage: null, publishedAt: "2026-06-05", readingTime: 12, author: { name: "管理員", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [] },
  { id: "4", title: "SEO 基礎入門：讓你的文章被 Google 看見", slug: "seo-basics", excerpt: "了解搜尋引擎優化的核心概念，提升網站流量。", coverImage: null, publishedAt: "2026-05-28", readingTime: 7, author: { name: "管理員", image: null }, category: { name: "部落格經營", slug: "blogging" }, tags: [] },
  { id: "5", title: "HTML 語意化標籤使用指南", slug: "html-semantic-tags", excerpt: "了解 HTML5 語意化標籤的正確使用方式。", coverImage: null, publishedAt: "2026-05-20", readingTime: 6, author: { name: "管理員", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [] },
  { id: "6", title: "CSS Flexbox 完全攻略", slug: "css-flexbox-guide", excerpt: "從基礎到進階，徹底掌握 Flexbox 排版技巧。", coverImage: null, publishedAt: "2026-05-15", readingTime: 10, author: { name: "管理員", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [] },
  { id: "7", title: "JavaScript 基礎入門", slug: "javascript-basics", excerpt: "JavaScript 是網頁互動的核心，從變數開始學起。", coverImage: null, publishedAt: "2026-05-10", readingTime: 15, author: { name: "管理員", image: null }, category: { name: "JavaScript", slug: "javascript" }, tags: [] },
  { id: "8", title: "React 元件開發實戰", slug: "react-components", excerpt: "學習 React 元件化開發，建立可重用的 UI 元件。", coverImage: null, publishedAt: "2026-05-05", readingTime: 12, author: { name: "管理員", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [] },
  { id: "9", title: "Node.js 後端開發入門", slug: "nodejs-basics", excerpt: "使用 JavaScript 開發伺服器端應用程式。", coverImage: null, publishedAt: "2026-04-28", readingTime: 10, author: { name: "管理員", image: null }, category: { name: "後端開發", slug: "backend" }, tags: [] },
];

export default function PostsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={[{ label: "文章", href: "/posts" }]} />
      <SectionHeader title="所有文章" subtitle="掌握最新網站架設技巧與網路趨勢" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_POSTS.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
