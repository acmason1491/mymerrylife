import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, Star } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/components/shared/bookmark-button";
import { LessonProgress } from "@/components/shared/lesson-progress";
import { LessonViewer } from "@/components/shared/lesson-viewer";
import { formatDuration } from "@/lib/utils";
import { LESSON_CONTENT } from "./lesson-content-registry";

interface Props { params: Promise<{ slug: string }> }

const COURSES: Record<string, { title: string; description: string; category: string; catSlug: string; level: string; duration: number; price: number; lessons: { title: string; duration: number }[] }> = {
  "blog-setup": {
    title: "個人部落格架設", description: "從零開始建立自己的 WordPress 部落格，不需要任何程式背景。跟著我們的步驟，你將學會如何申請網域、租用主機、安裝 WordPress、選擇主題、建立頁面，最後發布你的第一篇文章。", category: "WordPress 教學", catSlug: "wordpress", level: "初學者", duration: 120, price: 0,
    lessons: [{ title: "前置與準備事項", duration: 10 }, { title: "購買網站空間與網址申請", duration: 15 }, { title: "安裝 WordPress", duration: 10 }, { title: "Bluehost 控制面板設定", duration: 15 }, { title: "WordPress 控制面板設定", duration: 15 }, { title: "選擇 Thrive Theme 套裝組合", duration: 10 }, { title: "安裝 Thrive Suite 外掛", duration: 10 }, { title: "主要頁面框架建立與編輯", duration: 20 }, { title: "網站主題與主要頁面優化", duration: 15 }],
  },
  "company-website": {
    title: "公司官方網站架設", description: "為您的企業打造專業的公司網站，節省高額設計費用。涵蓋品牌形象頁面設計、服務介紹、聯絡表單、SEO 優化等完整企業網站功能。", category: "WordPress 教學", catSlug: "wordpress", level: "初學者", duration: 150, price: 0,
    lessons: [{ title: "前置與準備事項", duration: 10 }, { title: "購買網站空間與網址申請", duration: 15 }, { title: "安裝 WordPress", duration: 10 }, { title: "Bluehost 控制面板設定", duration: 15 }, { title: "WordPress 控制面板設定", duration: 15 }, { title: "選擇 Thrive Theme 套裝組合", duration: 10 }, { title: "安裝 Thrive Suite 外掛", duration: 10 }, { title: "主要頁面框架建立與編輯", duration: 30 }, { title: "網站主題與主要頁面優化", duration: 25 }],
  },
  "ecommerce-setup": {
    title: "WordPress 購物網站教學", description: "使用 WooCommerce 建立功能完整的網路商店。從安裝設定到商品上架、金流串接、物流設定、訂單處理，完整電商架設教學。", category: "WordPress 教學", catSlug: "wordpress", level: "中級", duration: 240, price: 0,
    lessons: [{ title: "前置與準備事項", duration: 10 }, { title: "購買網站空間與網址申請", duration: 15 }, { title: "安裝 WordPress", duration: 10 }, { title: "控制面板設定", duration: 15 }, { title: "選擇外掛組合", duration: 10 }, { title: "外掛購買與安裝", duration: 10 }, { title: "主要頁面框架建立與編輯", duration: 20 }, { title: "網站主題與主要頁面優化", duration: 15 }, { title: "安裝 WooCommerce", duration: 10 }, { title: "WooCommerce 相關設定", duration: 20 }, { title: "Thrive Theme Builder 選擇模板", duration: 10 }, { title: "建立產品類別與發布產品", duration: 20 }, { title: "客製化購物網站模板", duration: 20 }, { title: "會員註冊功能", duration: 15 }, { title: "金流物流設定", duration: 20 }, { title: "購物下單測試", duration: 15 }, { title: "綠界科技註冊與設定", duration: 15 }],
  },
  "online-course-platform": {
    title: "線上課程平台打造", description: "使用 Thrive Apprentice 與 WooCommerce 建立可銷售的線上課程平台。從課程建立、銷售頁設計到會員管理，完整流程教學。", category: "WordPress 教學", catSlug: "wordpress", level: "中級", duration: 360, price: 0,
    lessons: [{ title: "前置與準備事項", duration: 10 }, { title: "購買網站空間與網址申請", duration: 15 }, { title: "安裝 WordPress", duration: 10 }, { title: "控制面板設定", duration: 15 }, { title: "選擇外掛組合", duration: 10 }, { title: "外掛購買與安裝", duration: 10 }, { title: "主要頁面框架建立與編輯", duration: 20 }, { title: "網站主題與主要頁面優化", duration: 15 }, { title: "Thrive Apprentice 設定精靈", duration: 15 }, { title: "Thrive Apprentice 基本設定", duration: 15 }, { title: "建立第一個課程", duration: 20 }, { title: "自定義課程網頁模板", duration: 20 }, { title: "製作課程銷售頁面", duration: 25 }, { title: "安裝 WooCommerce 外掛", duration: 10 }, { title: "在 WooCommerce 新增產品", duration: 15 }, { title: "Thrive Theme Builder 課程模板", duration: 15 }, { title: "客製化結帳頁模板", duration: 20 }, { title: "WooCommerce 金流設定", duration: 20 }, { title: "購買訂單測試", duration: 15 }, { title: "綠界科技註冊與設定", duration: 15 }, { title: "會員管理頁面", duration: 15 }, { title: "Header 主選單編輯", duration: 10 }, { title: "主選單優化", duration: 10 }],
  },

};

export async function generateStaticParams() {
  return Object.keys(COURSES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSES[slug];
  if (!course) return { title: "課程不存在" };
  return { title: course.title, description: course.description };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = COURSES[slug];

  if (!course) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">課程不存在</h1>
        <Link href="/courses" className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline">
          <ArrowLeft className="h-4 w-4" /> 返回課程列表
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumb items={[{ label: "課程", href: "/courses" }, { label: course.title, href: `/courses/${slug}` }]} />
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link href={`/category/${course.catSlug}`}><Badge variant="default">{course.category}</Badge></Link>
            <Badge variant="secondary">{course.level}</Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">{course.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">{course.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {course.lessons.length} 單元</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {formatDuration(course.duration)}</span>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 mb-3">
            <Star className="h-4 w-4" /> 完全免費
          </span>
          <Button className="w-full gap-2" size="lg">立即開始學習</Button>
          <div className="mt-4">
            <LessonProgress courseSlug={slug} lessonCount={course.lessons.length} />
          </div>
          <div className="mt-3">
            <BookmarkButton slug={slug} />
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">課程大綱</h2>
        <LessonViewer
          lessons={course.lessons}
          content={LESSON_CONTENT[slug] || []}
          courseSlug={slug}
        />
      </div>
    </div>
  );
}
