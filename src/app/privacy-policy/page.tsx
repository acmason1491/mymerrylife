import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export const metadata: Metadata = {
  title: "隱私權政策",
  description: "My Merry Life 隱私權政策",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb items={[{ label: "隱私權政策", href: "/privacy-policy" }]} />
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">隱私權政策</h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-slate-500">
        <p>本隱私權政策說明 My Merry Life 如何收集、使用和保護您的個人資料。</p>
        <h2 className="text-xl font-semibold text-slate-900 pt-4">1. 資料收集</h2>
        <p>當您使用我們的服務時，我們可能收集您提供的姓名、電子郵件地址等資訊。</p>
        <h2 className="text-xl font-semibold text-slate-900 pt-4">2. 資料使用</h2>
        <p>我們收集的資訊僅用於提供、維護和改善我們的服務。</p>
        <h2 className="text-xl font-semibold text-slate-900 pt-4">3. 第三方服務</h2>
        <p>我們可能使用第三方服務（如 Google Analytics）來分析網站使用情況。</p>
        <p className="pt-4 text-sm">最後更新日期：2024 年 1 月</p>
      </div>
    </div>
  );
}
