"use client";

import { useState, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";
import { isBookmarked, toggleBookmark } from "@/lib/storage";

interface BookmarkButtonProps {
  slug: string;
}

export function BookmarkButton({ slug }: BookmarkButtonProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    isBookmarked(slug).then(setActive);
  }, [slug]);

  const handleClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = await toggleBookmark(slug);
    setActive(updated.includes(slug));
  }, [slug]);

  return (
    <button
      onClick={handleClick}
      aria-label={active ? "取消收藏" : "加入收藏"}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
        active
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
      }`}
    >
      <Heart className={`h-4 w-4 ${active ? "fill-current" : ""}`} />
      {active ? "已收藏" : "收藏"}
    </button>
  );
}
