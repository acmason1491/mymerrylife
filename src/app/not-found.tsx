import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 — 頁面不存在",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-8xl font-bold text-slate-200">404</span>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">頁面不存在</h1>
      <p className="mt-2 text-slate-500">您要找的頁面可能已被移除或連結錯誤</p>
      <Link href="/" className="mt-8">
        <Button size="lg">返回首頁</Button>
      </Link>
    </div>
  );
}
