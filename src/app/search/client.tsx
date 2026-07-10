"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PostCard } from "@/components/shared/post-card";
import { MOCK_POSTS } from "@/lib/mock-data";
import type { PostListItem } from "@/types";

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
