import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { organizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "關於我們",
  description: "My Merry Life 是一個致力於幫助新手學習 WordPress 網站架設的免費教學平台",
};

export default function AboutPage() {
  const jsonLd = organizationSchema();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb items={[{ label: "關於我們", href: "/about" }]} />
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">關於 My Merry Life</h1>
      <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-500">
        <p>
          My Merry Life 是一個免費的 WordPress 教學平台，我們的使命是幫助完全沒有程式經驗的新手，
          能夠獨立建立屬於自己的網站。
        </p>
        <p>
          我們相信，在這個數位時代，每個人都應該有能力在網路上建立自己的品牌。
          無論是個人部落格、公司官方網站、購物商店還是線上課程平台，
          只要跟著我們的步驟，你也能做到。
        </p>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">我們的理念</h2>
        <ul className="space-y-3">
          <li><strong>免費教育：</strong>基礎教學永遠免費，讓每個人都有學習的機會。</li>
          <li><strong>實作導向：</strong>不談理論，只教實際上線可用的技術。</li>
          <li><strong>持續更新：</strong>跟著 WordPress 版本持續更新內容。</li>
          <li><strong>新手友善：</strong>從最基礎開始，確保每一步都聽得懂。</li>
        </ul>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
