import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/section-header";
import { CourseCard } from "@/components/shared/course-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import type { CourseListItem } from "@/types";

export const metadata: Metadata = {
  title: "課程列表 | My Merry Life",
  description: "從零開始學習 WordPress 網站架設",
};

const MOCK_COURSES: CourseListItem[] = [
  { id: "c1", title: "個人部落格架設", slug: "blog-setup", description: "從零開始建立自己的 WordPress 部落格，不需任何程式背景", excerpt: "不需要任何程式背景，跟著步驟就能完成", coverImage: null, price: 0, level: "BEGINNER", duration: 120, lessonCount: 9, category: { name: "WordPress 教學", slug: "wordpress" } },
  { id: "c2", title: "公司官方網站架設", slug: "company-website", description: "為您的企業打造專業的公司網站，節省高額設計費用", excerpt: "節省高額設計費用，自己動手做", coverImage: null, price: 0, level: "BEGINNER", duration: 150, lessonCount: 9, category: { name: "WordPress 教學", slug: "wordpress" } },
  { id: "c3", title: "WordPress 購物網站教學", slug: "ecommerce-setup", description: "使用 WooCommerce 建立功能完整的網路商店", excerpt: "WooCommerce 完整教學，從安裝到上線", coverImage: null, price: 0, level: "INTERMEDIATE", duration: 240, lessonCount: 18, category: { name: "WordPress 教學", slug: "wordpress" } },
  { id: "c4", title: "線上課程平台打造", slug: "online-course-platform", description: "使用 Thrive Apprentice 建立可銷售的線上課程", excerpt: "Thrive Apprentice + WooCommerce 完整整合", coverImage: null, price: 0, level: "INTERMEDIATE", duration: 360, lessonCount: 24, category: { name: "WordPress 教學", slug: "wordpress" } },
  { id: "c5", title: "前端開發基礎", slug: "frontend-basics", description: "HTML、CSS、JavaScript 網頁前端核心技術", excerpt: "掌握現代前端開發的核心技能", coverImage: null, price: 0, level: "BEGINNER", duration: 480, lessonCount: 30, category: { name: "前端開發", slug: "frontend" } },
  { id: "c6", title: "React 框架實戰", slug: "react-practice", description: "從基礎到實戰，掌握 React 生態系", excerpt: "元件化開發、Hooks、狀態管理", coverImage: null, price: 0, level: "INTERMEDIATE", duration: 360, lessonCount: 20, category: { name: "前端開發", slug: "frontend" } },
];

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={[{ label: "課程", href: "/courses" }]} />
      <SectionHeader title="所有課程" subtitle="系統化學習，從入門到精通" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_COURSES.map((course) => <CourseCard key={course.id} course={course} />)}
      </div>
    </div>
  );
}
