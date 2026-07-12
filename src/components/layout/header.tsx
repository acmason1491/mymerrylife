"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, userName, loading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            M
          </span>
          My Merry Life
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/search">
            <Button variant="ghost" size="icon">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </Button>
          </Link>
          {loading ? null : user ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-medium text-blue-600">
                    {userName?.charAt(0) ?? "U"}
                  </div>
                  {userName ?? "會員"}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                登出
              </Button>
            </div>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">登入</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">免費註冊</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="flex items-center justify-center rounded-lg p-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="選單"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2 border-slate-100" />
            {loading ? null : user ? (
              <>
                <Link href="/dashboard" className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600" onClick={() => setMobileOpen(false)}>
                  {userName ?? "會員"} 儀表板
                </Link>
                <button
                  className="rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-600"
                  onClick={() => { logout(); setMobileOpen(false); }}
                >
                  登出
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600" onClick={() => setMobileOpen(false)}>
                  登入
                </Link>
                <Link href="/auth/register" className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white" onClick={() => setMobileOpen(false)}>
                  免費註冊
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
