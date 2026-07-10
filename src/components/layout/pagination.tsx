"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  basePath: string;
  totalPages: number;
  currentPage: number;
}

export function Pagination({ basePath, totalPages, currentPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  function href(page: number) {
    return page === 1 ? basePath : `${basePath}?page=${page}`;
  }

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 mt-12">
      {currentPage > 1 && (
        <Link
          href={href(currentPage - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      )}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="flex h-10 w-10 items-center justify-center text-slate-400">...</span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition-colors",
              p === currentPage
                ? "bg-blue-600 text-white"
                : "border border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            {p}
          </Link>
        )
      )}
      {currentPage < totalPages && (
        <Link
          href={href(currentPage + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
