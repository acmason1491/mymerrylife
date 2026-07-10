import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PostCard } from "@/components/shared/post-card";
import type { PostListItem } from "@/types";
import { CATEGORIES } from "@/lib/constants";

interface Props { params: Promise<{ slug: string }> }

const MOCK_POSTS: PostListItem[] = [
  { id: "1", title: "WordPress 基礎設定完整指南", slug: "wordpress-basics", excerpt: "從安裝到完成基本設定，一步步帶你操作 WordPress 後台。", coverImage: null, publishedAt: "2026-06-15", readingTime: 8, author: { name: "管理員", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [] },
  { id: "2", title: "如何選擇適合的網域名稱", slug: "choose-domain-name", excerpt: "網域名稱是網站的第一印象，教你如何選擇最好的域名。", coverImage: null, publishedAt: "2026-06-10", readingTime: 5, author: { name: "管理員", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [] },
  { id: "3", title: "WooCommerce 購物車設定教學", slug: "woocommerce-setup", excerpt: "一步步帶你在 WordPress 上建立完整的網路商店。", coverImage: null, publishedAt: "2026-06-05", readingTime: 12, author: { name: "管理員", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [] },
  { id: "4", title: "SEO 基礎入門：讓你的文章被 Google 看見", slug: "seo-basics", excerpt: "了解搜尋引擎優化的核心概念，提升網站流量。", coverImage: null, publishedAt: "2026-05-28", readingTime: 7, author: { name: "管理員", image: null }, category: { name: "部落格經營", slug: "blogging" }, tags: [] },
  { id: "5", title: "HTML 語意化標籤使用指南", slug: "html-semantic-tags", excerpt: "了解 HTML5 語意化標籤的正確使用方式，提升網站可讀性與 SEO。", coverImage: null, publishedAt: "2026-05-20", readingTime: 6, author: { name: "管理員", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [] },
  { id: "6", title: "CSS Flexbox 完全攻略", slug: "css-flexbox-guide", excerpt: "從基礎到進階，徹底掌握 Flexbox 排版技巧。", coverImage: null, publishedAt: "2026-05-15", readingTime: 10, author: { name: "管理員", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [] },
];

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return { title: "分類不存在" };
  return { title: `${cat.name} 分類文章`, description: `瀏覽所有 ${cat.name} 分類的文章` };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const posts = MOCK_POSTS.filter((p) => p.category?.slug === slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={[
        { label: "文章", href: "/posts" },
        { label: cat.name, href: `/category/${slug}` },
      ]} />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">{cat.name}</h1>
      <p className="mt-2 text-slate-500">{posts.length} 篇文章</p>
      {posts.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      ) : (
        <div className="py-20 text-center text-slate-400">
          <p className="text-lg">此分類尚無文章</p>
        </div>
      )}
    </div>
  );
}
