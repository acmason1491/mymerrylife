import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchPageClient } from "./client";

export const metadata: Metadata = {
  title: "搜尋",
  description: "搜尋 My Merry Life 上的文章與課程",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl px-4 py-10"><p className="text-center text-slate-400">載入中...</p></div>}>
      <SearchPageClient />
    </Suspense>
  );
}
