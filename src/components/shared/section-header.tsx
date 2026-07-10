import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  linkHref?: string;
  linkLabel?: string;
}

export function SectionHeader({ title, subtitle, linkHref, linkLabel }: SectionHeaderProps) {
  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-lg text-slate-500">{subtitle}</p>
        )}
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
