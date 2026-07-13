import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/shared/bookmark-button";
import { formatDate } from "@/lib/utils";
import type { PostListItem } from "@/types";

interface PostCardProps {
  post: PostListItem;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  "WordPress 教學": "from-blue-600 to-indigo-700",
  "前端開發": "from-emerald-500 to-teal-700",
  "JavaScript": "from-yellow-500 to-orange-600",
  "後端開發": "from-purple-600 to-violet-800",
  "部落格經營": "from-rose-500 to-pink-700",
  "網賺技巧": "from-amber-500 to-red-600",
  "好用工具": "from-cyan-500 to-blue-600",
};

const CATEGORY_EMOJI: Record<string, string> = {
  "WordPress 教學": "W",
  "前端開發": "<>",
  "JavaScript": "JS",
  "後端開發": "{}",
  "部落格經營": "B",
  "網賺技巧": "M",
  "好用工具": "T",
};

function PostCover({ post }: { post: PostListItem }) {
  if (post.coverImage) {
    return (
      <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl">
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    );
  }

  const gradient = CATEGORY_GRADIENTS[post.category?.name ?? ""] ?? "from-slate-600 to-slate-800";
  const label = CATEGORY_EMOJI[post.category?.name ?? ""] ?? "P";

  return (
    <div className={`-mx-6 -mt-6 mb-4 h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
      <span className="text-5xl font-bold text-white/80 select-none">{label}</span>
    </div>
  );
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card hover className="group h-full">
        <PostCover post={post} />
        <CardContent>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {post.category && (
              <Badge variant="default">{post.category.name}</Badge>
            )}
            {post.tags?.slice(0, 2).map((t) => (
              <Badge key={t.tag.name} variant="outline">{t.tag.name}</Badge>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              {post.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} 分鐘閱讀
              </span>
            </div>
            <BookmarkButton slug={post.slug} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
