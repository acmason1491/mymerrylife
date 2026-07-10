import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/section-header";
import { PostCard } from "@/components/shared/post-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { MOCK_POSTS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "文章列表 | My Merry Life",
  description: "瀏覽所有 WordPress 教學、前端開發、後端開發、部落格經營等文章",
};

export default function PostsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={[{ label: "文章", href: "/posts" }]} />
      <SectionHeader title="所有文章" subtitle="掌握最新網站架設技巧與網路趨勢" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_POSTS.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
