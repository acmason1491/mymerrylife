import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/types";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1 text-sm text-slate-500">
        <li>
          <Link href="/" className="hover:text-slate-700 transition-colors">首頁</Link>
        </li>
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" />
            {i === items.length - 1 ? (
              <span className="text-slate-900 font-medium">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-slate-700 transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
