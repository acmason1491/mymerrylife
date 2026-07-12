"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getComments, addComment, type Comment } from "@/lib/storage";

interface CommentSectionProps {
  postSlug: string;
}

export function CommentSection({ postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getComments(postSlug).then(setComments);
  }, [postSlug]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!author.trim() || !content.trim()) return;
      const updated = await addComment(postSlug, author.trim(), content.trim());
      setComments(updated);
      setContent("");
    },
    [postSlug, author, content],
  );

  return (
    <section className="mt-16 border-t border-slate-100 pt-10">
      <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
        <MessageSquare className="h-6 w-6" /> 留言 ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="你的名字"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        <textarea
          placeholder="寫下你的留言…"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        <Button type="submit" className="gap-2">
          <Send className="h-4 w-4" /> 送出留言
        </Button>
      </form>

      <div className="mt-8 space-y-4">
        {comments.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-400">成為第一個留言的人！</p>
        )}
        {[...comments].reverse().map((c) => (
          <div key={c.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                {c.author.charAt(0)}
              </div>
              <span className="font-medium text-slate-900">{c.author}</span>
              <span className="text-xs text-slate-400">
                {new Date(c.createdAt).toLocaleDateString("zh-TW", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
