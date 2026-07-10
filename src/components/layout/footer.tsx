import Link from "next/link";
import { SITE_CONFIG, NAV_ITEMS, CATEGORIES } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">M</span>
              My Merry Life
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              免費 WordPress 教學平台，幫助新手從零開始建立屬於自己的網站。
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-900">快速連結</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-500 transition-colors hover:text-slate-900">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-900">分類</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-sm text-slate-500 transition-colors hover:text-slate-900">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-900">聯絡我們</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Email: {SITE_CONFIG.email}</li>
              <li>
                <Link href="/contact" className="text-blue-600 hover:underline">
                  聯絡表單
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="text-xs text-slate-400 transition-colors hover:text-slate-600">
              隱私權政策
            </Link>
            <Link href="/terms" className="text-xs text-slate-400 transition-colors hover:text-slate-600">
              服務條款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
