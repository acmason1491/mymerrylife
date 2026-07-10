import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PostCard } from "@/components/shared/post-card";
import type { PostListItem } from "@/types";

interface Props { params: Promise<{ slug: string }> }

const MOCK_POSTS: PostListItem[] = [
  { id: "1", title: "WordPress 基礎設定完整指南", slug: "wordpress-basics", excerpt: "從安裝到完成基本設定，一步步帶你操作 WordPress 後台。", coverImage: null, publishedAt: "2026-06-15", readingTime: 8, author: { name: "管理員", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [] },
  { id: "3", title: "WooCommerce 購物車設定教學", slug: "woocommerce-setup", excerpt: "一步步帶你在 WordPress 上建立完整的網路商店。", coverImage: null, publishedAt: "2026-06-05", readingTime: 12, author: { name: "管理員", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [] },
  { id: "4", title: "SEO 基礎入門：讓你的文章被 Google 看見", slug: "seo-basics", excerpt: "了解搜尋引擎優化的核心概念，提升網站流量。", coverImage: null, publishedAt: "2026-05-28", readingTime: 7, author: { name: "管理員", image: null }, category: { name: "部落格經營", slug: "blogging" }, tags: [] },
  { id: "5", title: "HTML 語意化標籤使用指南", slug: "html-semantic-tags", excerpt: "了解 HTML5 語意化標籤的正確使用方式，提升網站可讀性與 SEO。", coverImage: null, publishedAt: "2026-05-20", readingTime: 6, author: { name: "管理員", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [] },
  { id: "6", title: "CSS Flexbox 完全攻略", slug: "css-flexbox-guide", excerpt: "從基礎到進階，徹底掌握 Flexbox 排版技巧。", coverImage: null, publishedAt: "2026-05-15", readingTime: 10, author: { name: "管理員", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [] },
];

const TAGS = ["WordPress", "入門", "WooCommerce", "購物網站", "SEO", "流量", "HTML", "前端", "CSS", "Flexbox"];

export async function generateStaticParams() {
  return TAGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = TAGS.find((t) => t === slug);
  if (!tag) return { title: "標籤不存在" };
  return { title: `#${tag} 標籤文章`, description: `瀏覽所有標籤為 ${tag} 的文章` };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tag = TAGS.find((t) => t === slug);
  if (!tag) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={[
        { label: "文章", href: "/posts" },
        { label: `#${tag}`, href: `/tag/${slug}` },
      ]} />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">#{tag}</h1>
      <p className="mt-2 text-slate-500">相關文章</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_POSTS.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
