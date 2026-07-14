import type { Metadata } from "next";
import Link from "next/link";
import { Tag } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { PostCard } from "@/components/shared/post-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { MOCK_POSTS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "文章列表 | My Merry Life",
  description: "瀏覽所有 WordPress 教學、前端開發、後端開發、部落格經營等文章",
};

interface TagGroup {
  name: string;
  description: string;
  matchTags: string[];
}

const TAG_GROUPS: TagGroup[] = [
  { name: "WordPress 網站架設", description: "從網域、主機到 WordPress 安裝與設定，打造自己的網站", matchTags: ["WordPress", "WooCommerce", "購物網站"] },
  { name: "前端開發 (HTML/CSS)", description: "網頁前端基礎：HTML 結構與 CSS 樣式設計", matchTags: ["HTML", "CSS", "Flexbox", "前端"] },
  { name: "JavaScript", description: "JavaScript 程式語言從基礎到進階", matchTags: ["JavaScript", "DOM"] },
  { name: "React", description: "React 元件化開發與現代前端框架", matchTags: ["React"] },
  { name: "後端開發", description: "Node.js、資料庫與 API 開發", matchTags: ["後端", "Node.js", "MySQL", "MongoDB", "API"] },
  { name: "部落格經營與 SEO", description: "讓更多人看見你的內容，提升網站流量與排名", matchTags: ["部落格", "SEO", "流量"] },
  { name: "網賺技巧", description: "網路賺錢方法與技巧分享", matchTags: ["網賺"] },
  { name: "好用工具", description: "提升工作效率的必備工具與服務", matchTags: ["好用工具"] },
];

function groupPostsByTag() {
  const groups: Map<string, typeof MOCK_POSTS> = new Map();
  TAG_GROUPS.forEach((g) => groups.set(g.name, []));

  for (const post of MOCK_POSTS) {
    let assigned = false;
    for (const group of TAG_GROUPS) {
      if (post.tags?.some((t) => group.matchTags.includes(t.tag.name))) {
        groups.get(group.name)!.push(post);
        assigned = true;
        break;
      }
    }
    if (!assigned) {
      const fallback = groups.get("WordPress 網站架設")!;
      fallback.push(post);
    }
  }

  return groups;
}

export default function PostsPage() {
  const groups = groupPostsByTag();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={[{ label: "文章", href: "/posts" }]} />
      <SectionHeader title="所有文章" subtitle="掌握最新網站架設技巧與網路趨勢" />

      <div className="mt-4 mb-10 flex flex-wrap gap-2">
        {TAG_GROUPS.map((g) => {
          const posts = groups.get(g.name) ?? [];
          if (posts.length === 0) return null;
          return (
            <Link key={g.name} href={`#group-${g.name}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-slate-100 text-sm px-3 py-1.5">
                <Tag className="h-3 w-3 mr-1.5" />
                {g.name} ({posts.length})
              </Badge>
            </Link>
          );
        })}
      </div>

      {TAG_GROUPS.map((group) => {
        const posts = groups.get(group.name) ?? [];
        if (posts.length === 0) return null;
        return (
          <section key={group.name} id={`group-${group.name}`} className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">{group.name}</h2>
            <p className="text-sm text-slate-500 mb-6">{group.description}</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
