import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PostCard } from "@/components/shared/post-card";
import { CATEGORIES } from "@/lib/constants";
import { MOCK_POSTS } from "@/lib/mock-data";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return { title: "分類不存在" };
  return { title: `${cat.name} 分類文章`, description: `瀏覽所有 ${cat.name} 分類的文章` };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const posts = MOCK_POSTS.filter((p) => p.category?.slug === slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={[
        { label: "文章", href: "/posts" },
        { label: cat.name, href: `/category/${slug}` },
      ]} />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">{cat.name}</h1>
      <p className="mt-2 text-slate-500">{posts.length} 篇文章</p>
      {posts.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      ) : (
        <div className="py-20 text-center text-slate-400">
          <p className="text-lg">此分類尚無文章</p>
        </div>
      )}
    </div>
  );
}
