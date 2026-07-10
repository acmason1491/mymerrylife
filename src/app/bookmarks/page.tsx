"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PostCard } from "@/components/shared/post-card";
import { CourseCard } from "@/components/shared/course-card";
import { MOCK_POSTS, MOCK_COURSES } from "@/lib/mock-data";
import { getBookmarks } from "@/lib/storage";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const bookmarkedPosts = MOCK_POSTS.filter((p) => bookmarks.includes(p.slug));
  const bookmarkedCourses = MOCK_COURSES.filter((c) => bookmarks.includes(c.slug));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={[{ label: "我的收藏", href: "/bookmarks" }]} />
      <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight text-slate-900">
        <Heart className="h-8 w-8 text-red-500" /> 我的收藏
      </h1>

      {bookmarks.length === 0 ? (
        <div className="py-20 text-center">
          <Heart className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-4 text-lg text-slate-400">尚未收藏任何內容</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/posts" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700">
              瀏覽文章
            </Link>
            <Link href="/courses" className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              瀏覽課程
            </Link>
          </div>
        </div>
      ) : (
        <>
          {bookmarkedPosts.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">文章 ({bookmarkedPosts.length})</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bookmarkedPosts.map((post) => <PostCard key={post.id} post={post} />)}
              </div>
            </section>
          )}
          {bookmarkedCourses.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">課程 ({bookmarkedCourses.length})</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bookmarkedCourses.map((course) => <CourseCard key={course.id} course={course} />)}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
