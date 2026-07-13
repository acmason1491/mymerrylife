"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, BookOpen, MessageSquare, ArrowRight, User } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { useAuth } from "@/context/auth-context";
import { getBookmarks, getEnrollmentCount } from "@/lib/storage";

export default function DashboardPage() {
  const { user, userName, loading } = useAuth();
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [enrollmentCount, setEnrollmentCount] = useState(0);

  useEffect(() => {
    getBookmarks().then((b) => setBookmarkCount(b.length));
    getEnrollmentCount().then(setEnrollmentCount);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={[{ label: "會員中心", href: "/dashboard" }]} />
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">會員中心</h1>

      {!loading && !user && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
          <User className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-4 text-lg text-slate-500">登入即可查看您的學習進度與收藏</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/auth/login" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700">
              登入
            </Link>
            <Link href="/auth/register" className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              註冊
            </Link>
          </div>
        </div>
      )}

      {user && (
        <>
          <div className="mt-6 rounded-xl border border-slate-100 bg-blue-50 p-6">
            <p className="text-sm text-slate-500">歡迎回來，</p>
            <p className="text-xl font-bold text-slate-900">{userName ?? user.email}</p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <Link href="/bookmarks">
              <section className="group rounded-lg border border-slate-200 p-6 transition-all hover:border-blue-200 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-red-400" />
                  <h2 className="text-xl font-semibold text-slate-900">我的收藏</h2>
                </div>
                {bookmarkCount > 0 ? (
                  <p className="mt-2 text-sm text-slate-500">你收藏了 <strong className="text-blue-600">{bookmarkCount}</strong> 個項目</p>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">尚未收藏任何項目</p>
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
                {enrollmentCount > 0 ? (
                  <p className="mt-2 text-sm text-slate-500">已註冊 <strong className="text-blue-600">{enrollmentCount}</strong> 堂課程</p>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">瀏覽課程並追蹤你的單元完成進度</p>
                )}
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:underline">
                  前往課程 <ArrowRight className="h-4 w-4" />
                </div>
              </section>
            </Link>

            <Link href="/posts">
              <section className="group rounded-lg border border-slate-200 p-6 transition-all hover:border-blue-200 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-6 w-6 text-emerald-400" />
                  <h2 className="text-xl font-semibold text-slate-900">最新文章</h2>
                </div>
                <p className="mt-2 text-sm text-slate-500">瀏覽最新的網站架設與開發教學</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:underline">
                  瀏覽文章 <ArrowRight className="h-4 w-4" />
                </div>
              </section>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
