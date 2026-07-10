import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PostCard } from "@/components/shared/post-card";
import { MOCK_POSTS, TAGS } from "@/lib/mock-data";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return TAGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = TAGS.find((t) => t === slug);
  if (!tag) return { title: "標籤不存在" };
  return { title: `#${tag} 標籤文章`, description: `瀏覽所有標籤為 ${tag} 的文章` };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tag = TAGS.find((t) => t === slug);
  if (!tag) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={[
        { label: "文章", href: "/posts" },
        { label: `#${tag}`, href: `/tag/${slug}` },
      ]} />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">#{tag}</h1>
      <p className="mt-2 text-slate-500">相關文章</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_POSTS.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
