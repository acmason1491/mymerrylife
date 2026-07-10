import { SectionHeader } from "@/components/shared/section-header";
import { PostCard } from "@/components/shared/post-card";
import type { PostListItem } from "@/types";

interface FeaturedPostsProps {
  posts: PostListItem[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts.length) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          title="最新文章"
          subtitle="掌握最新網站架設技巧與網路趨勢"
          linkHref="/posts"
          linkLabel="查看全部文章"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
