"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PostCard } from "@/components/shared/post-card";
import type { PostListItem } from "@/types";

const MOCK_POSTS: PostListItem[] = [
  { id: "1", title: "WordPress 基礎設定完整指南", slug: "wordpress-basics", excerpt: "從安裝到完成基本設定，一步步帶你操作 WordPress 後台。", coverImage: null, publishedAt: "2026-06-15", readingTime: 8, author: { name: "管理員", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [] },
  { id: "2", title: "如何選擇適合的網域名稱", slug: "choose-domain-name", excerpt: "網域名稱是網站的第一印象，教你如何選擇最好的域名。", coverImage: null, publishedAt: "2026-06-10", readingTime: 5, author: { name: "管理員", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [] },
  { id: "3", title: "WooCommerce 購物車設定教學", slug: "woocommerce-setup", excerpt: "一步步帶你在 WordPress 上建立完整的網路商店。", coverImage: null, publishedAt: "2026-06-05", readingTime: 12, author: { name: "管理員", image: null }, category: { name: "WordPress 教學", slug: "wordpress" }, tags: [] },
  { id: "4", title: "SEO 基礎入門：讓你的文章被 Google 看見", slug: "seo-basics", excerpt: "了解搜尋引擎優化的核心概念，提升網站流量。", coverImage: null, publishedAt: "2026-05-28", readingTime: 7, author: { name: "管理員", image: null }, category: { name: "部落格經營", slug: "blogging" }, tags: [] },
  { id: "5", title: "HTML 語意化標籤使用指南", slug: "html-semantic-tags", excerpt: "了解 HTML5 語意化標籤的正確使用方式，提升網站可讀性與 SEO。", coverImage: null, publishedAt: "2026-05-20", readingTime: 6, author: { name: "管理員", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [] },
  { id: "6", title: "CSS Flexbox 完全攻略", slug: "css-flexbox-guide", excerpt: "從基礎到進階，徹底掌握 Flexbox 排版技巧。", coverImage: null, publishedAt: "2026-05-15", readingTime: 10, author: { name: "管理員", image: null }, category: { name: "前端開發", slug: "frontend" }, tags: [] },
];

function searchPosts(query: string): PostListItem[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return MOCK_POSTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      (p.excerpt?.toLowerCase() || "").includes(q) ||
      p.category?.name.toLowerCase().includes(q)
  );
}

export function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);
  const [results, setResults] = useState<PostListItem[]>([]);

  useEffect(() => {
    setResults(searchPosts(q));
  }, [q]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">搜尋</h1>
      <form onSubmit={handleSubmit} className="relative mt-6">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋文章、課程..."
          className="h-13 pl-12 pr-12 text-lg"
          autoFocus
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(""); router.push("/search"); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </form>

      <div className="mt-10">
        {q && results.length === 0 && (
          <p className="text-center text-slate-400">沒有找到「{q}」的相關結果</p>
        )}
        {results.length > 0 && (
          <>
            <p className="mb-6 text-sm text-slate-400">找到 {results.length} 筆結果</p>
            <div className="grid gap-6 sm:grid-cols-2">
              {results.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
