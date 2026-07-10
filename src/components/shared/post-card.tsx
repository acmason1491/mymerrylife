import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { PostListItem } from "@/types";

interface PostCardProps {
  post: PostListItem;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card hover className="group h-full">
        {post.coverImage && (
          <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
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
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
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
        </CardContent>
      </Card>
    </Link>
  );
}
