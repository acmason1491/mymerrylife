import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ReadingProgress } from "@/components/layout/reading-progress";
import { ShareButtons } from "@/components/shared/share-buttons";
import { Badge } from "@/components/ui/badge";
import { formatDate, absoluteUrl } from "@/lib/utils";

interface Props { params: Promise<{ slug: string }> }

const POSTS: Record<string, { title: string; excerpt: string; content: string; category: string; catSlug: string; publishedAt: string; tags?: string[] }> = {
  "wordpress-basics": {
    title: "WordPress 基礎設定完整指南",
    excerpt: "從安裝到完成基本設定",
    content: `<h2>什麼是 WordPress？</h2><p>WordPress 是全球最受歡迎的內容管理系統（CMS），超過 40% 的網站使用 WordPress 架設。它完全免費、開放原始碼，而且不需要任何程式背景就能操作。</p><h2>安裝 WordPress</h2><p>大多數主機商（如 Bluehost）都提供一鍵安裝 WordPress 的功能。登入你的主機控制面板，找到 WordPress 安裝程式，按照步驟即可完成。</p><h2>基本設定</h2><p>安裝完成後，登入後台（yourdomain.com/wp-admin），你會看到 WordPress 儀表板。這裡是你管理整個網站的核心中樞。</p><ul><li><strong>一般設定</strong>：網站標題、描述、時區</li><li><strong>閱讀設定</strong>：首頁顯示方式、Feed 顯示數量</li><li><strong>永久連結設定</strong>：建議設定為「文章名稱」以獲得最佳 SEO</li></ul>`,
    category: "WordPress 教學", catSlug: "wordpress", publishedAt: "2026-06-15", tags: ["WordPress", "入門"],
  },
  "choose-domain-name": {
    title: "如何選擇適合的網域名稱",
    excerpt: "網域名稱是網站的第一印象",
    content: `<h2>為什麼網域名稱很重要？</h2><p>網域名稱（Domain Name）是使用者在網路上找到你的第一道門。好的域名不僅容易記憶，也能提升品牌信任度。</p><h2>選擇域名的原則</h2><ul><li><strong>簡短好記</strong>：越短越好，避免複雜的拼寫</li><li><strong>品牌相關</strong>：與你的網站主題或品牌名稱相關</li><li><strong>避免數字與連字號</strong>：容易造成混淆</li><li><strong>選擇正確的後綴</strong>：.com 為首選，.net、.org 也常見</li></ul><h2>從哪裡購買？</h2><p>推薦在 Bluehost 或 Namecheap 等平台購買網域，通常第一年享有優惠價格。年費約 300-500 元台幣。`,
    category: "WordPress 教學", catSlug: "wordpress", publishedAt: "2026-06-10",
  },
  "woocommerce-setup": {
    title: "WooCommerce 購物車設定教學",
    excerpt: "一步步建立網路商店",
    content: `<h2>WooCommerce 簡介</h2><p>WooCommerce 是 WordPress 上最受歡迎的電子商務外掛，讓你可以輕鬆將任何 WordPress 網站變成功能完整的網路商店。</p><h2>安裝與啟用</h2><p>在 WordPress 後台 → 外掛 → 安裝新外掛，搜尋 WooCommerce，安裝並啟用。安裝精靈會引導你完成基本設定。</p><h2>核心功能設定</h2><ul><li><strong>商品類型</strong>：簡單商品、可變商品、群組商品、外部商品</li><li><strong>金流設定</strong>：支援信用卡、ATM 轉帳、貨到付款、綠界科技</li><li><strong>物流設定</strong>：宅配、超商取貨、免運門檻</li><li><strong>稅務設定</strong>：根據營業地點設定稅率</li></ul>`,
    category: "WordPress 教學", catSlug: "wordpress", publishedAt: "2026-06-05", tags: ["WooCommerce", "購物網站"],
  },
  "seo-basics": {
    title: "SEO 基礎入門：讓你的文章被 Google 看見",
    excerpt: "提升網站流量的核心技巧",
    content: `<h2>什麼是 SEO？</h2><p>SEO（搜尋引擎優化）是一系列提升網站在搜尋引擎結果頁面排名的方法。好的 SEO 能為網站帶來持續穩定的免費流量。</p><h2>核心要素</h2><ul><li><strong>關鍵字研究</strong>：了解你的目標受眾在搜尋什麼</li><li><strong>內容品質</strong>：提供有價值、原創的內容</li><li><strong>技術 SEO</strong>：網站速度、行動裝置友善、結構化資料</li><li><strong>外部連結</strong>：獲得其他網站的推薦連結</li></ul><h2>實用工具</h2><p>Google Search Console、Google Analytics、Yoast SEO、Ahrefs、SEMrush</p>`,
    category: "部落格經營", catSlug: "blogging", publishedAt: "2026-05-28", tags: ["SEO", "流量"],
  },
  "html-semantic-tags": {
    title: "HTML 語意化標籤使用指南",
    excerpt: "提升網站可讀性與 SEO",
    content: `<h2>為什麼要使用語意化標籤？</h2><p>HTML5 引入了多個語意化標籤，讓搜尋引擎和輔助技術更能理解網頁的結構與內容意義。</p><h2>常用語意標籤</h2><ul><li><code>&lt;header&gt;</code>：頁首區域</li><li><code>&lt;nav&gt;</code>：導航選單</li><li><code>&lt;main&gt;</code>：主要內容</li><li><code>&lt;article&gt;</code>：獨立文章區塊</li><li><code>&lt;section&gt;</code>：主題分區</li><li><code>&lt;aside&gt;</code>：側邊欄</li><li><code>&lt;footer&gt;</code>：頁尾</li></ul><h2>SEO 效益</h2><p>正確使用語意化標籤可以讓 Google 更精準地理解你的內容結構，有助於獲得 Rich Snippet 等進階搜尋結果展示方式。</p>`,
    category: "前端開發", catSlug: "frontend", publishedAt: "2026-05-20", tags: ["HTML", "前端"],
  },
  "css-flexbox-guide": {
    title: "CSS Flexbox 完全攻略",
    excerpt: "從基礎到進階的排版技巧",
    content: `<h2>什麼是 Flexbox？</h2><p>Flexbox 是 CSS3 引入的佈局模式，專為一維排版設計。它讓容器內的元素能夠自動調整尺寸、對齊與分佈。</p><h2>容器屬性</h2><ul><li><code>display: flex</code>：啟用 Flexbox</li><li><code>flex-direction</code>：主軸方向（row / column）</li><li><code>justify-content</code>：主軸對齊</li><li><code>align-items</code>：交錯軸對齊</li><li><code>flex-wrap</code>：是否換行</li></ul><h2>項目屬性</h2><ul><li><code>flex</code>：伸縮比例（flex-grow flex-shrink flex-basis）</li><li><code>align-self</code>：單獨對齊</li><li><code>order</code>：排列順序</li></ul>`,
    category: "前端開發", catSlug: "frontend", publishedAt: "2026-05-15", tags: ["CSS", "Flexbox"],
  },
};

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: "文章不存在" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS[slug];

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">文章不存在</h1>
        <Link href="/posts" className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline">
          <ArrowLeft className="h-4 w-4" /> 返回文章列表
        </Link>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumb items={[{ label: "文章", href: "/posts" }, { label: post.title, href: `/posts/${slug}` }]} />
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link href={`/category/${post.catSlug}`}><Badge variant="default">{post.category}</Badge></Link>
            {post.tags?.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{Math.ceil(post.content.length / 300)} 分鐘閱讀</span>
          </div>
        </header>
        <div className="prose-custom" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-6">
          <Link href="/posts" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
            <ArrowLeft className="h-4 w-4" /> 返回文章列表
          </Link>
          <ShareButtons url={absoluteUrl(`/posts/${slug}`)} title={post.title} />
        </div>
      </article>
    </>
  );
}
