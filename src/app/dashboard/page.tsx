import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export const metadata: Metadata = {
  title: "會員中心",
  description: "管理您的書籤與學習進度",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={[{ label: "會員中心", href: "/dashboard" }]} />
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">會員中心</h1>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <section className="rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900">我的書籤</h2>
          <p className="mt-2 text-sm text-slate-500">您收藏的文章將顯示在此處</p>
          <div className="mt-4 flex h-32 items-center justify-center rounded-md bg-slate-50 text-sm text-slate-400">
            尚無書籤
          </div>
        </section>
        <section className="rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900">學習進度</h2>
          <p className="mt-2 text-sm text-slate-500">追蹤您的課程完成進度</p>
          <div className="mt-4 flex h-32 items-center justify-center rounded-md bg-slate-50 text-sm text-slate-400">
            尚無進度記錄
          </div>
        </section>
      </div>
    </div>
  );
}
