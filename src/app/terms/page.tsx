import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export const metadata: Metadata = {
  title: "服務條款",
  description: "My Merry Life 服務條款",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb items={[{ label: "服務條款", href: "/terms" }]} />
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">服務條款</h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-slate-500">
        <p>歡迎使用 My Merry Life。使用本網站即表示您同意以下條款。</p>
        <h2 className="text-xl font-semibold text-slate-900 pt-4">1. 使用規範</h2>
        <p>您同意不會使用本網站進行任何違法或未經授權的活動。</p>
        <h2 className="text-xl font-semibold text-slate-900 pt-4">2. 智慧財產權</h2>
        <p>本網站所有內容皆受著作權保護，未經許可不得擅自複製或散佈。</p>
        <h2 className="text-xl font-semibold text-slate-900 pt-4">3. 免責聲明</h2>
        <p>本網站提供的教學內容僅供參考，我們不保證其適用於所有情況。</p>
        <p className="pt-4 text-sm">最後更新日期：2024 年 1 月</p>
      </div>
    </div>
  );
}
