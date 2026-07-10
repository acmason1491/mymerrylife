"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, BookOpen, Bookmark, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getBookmarks } from "@/lib/storage";

export default function DashboardPage() {
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    setBookmarkCount(getBookmarks().length);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={[{ label: "會員中心", href: "/dashboard" }]} />
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">會員中心</h1>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <Link href="/bookmarks">
          <section className="group rounded-lg border border-slate-200 p-6 transition-all hover:border-blue-200 hover:shadow-sm">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-red-400" />
              <h2 className="text-xl font-semibold text-slate-900">我的收藏</h2>
            </div>
            {bookmarkCount > 0 ? (
              <p className="mt-2 text-sm text-slate-500">你收藏了 <strong className="text-blue-600">{bookmarkCount}</strong> 個項目</p>
            ) : (
              <p className="mt-2 text-sm text-slate-500">尚未收藏任何項目 — 立即瀏覽文章或課程</p>
            )}
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:underline">
              查看全部 <ArrowRight className="h-4 w-4" />
            </div>
          </section>
        </Link>
        <Link href="/courses">
          <section className="group rounded-lg border border-slate-200 p-6 transition-all hover:border-blue-200 hover:shadow-sm">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-slate-900">學習進度</h2>
            </div>
            <p className="mt-2 text-sm text-slate-500">瀏覽課程並追蹤你的單元完成進度</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:underline">
              前往課程 <ArrowRight className="h-4 w-4" />
            </div>
          </section>
        </Link>
      </div>
    </div>
  );
}
