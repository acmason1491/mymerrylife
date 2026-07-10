import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
              完全免費 · 從零開始
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              從零開始，
              <br />
              <span className="text-blue-600">打造你的網路事業</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-500 sm:text-xl">
              不需要任何程式背景，只要會上網、會打字，跟著我們的免費教學步驟，
              一步步建立屬於自己的 WordPress 網站、部落格、購物商店或線上課程平台。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/courses">
                <Button size="lg" className="gap-2">
                  免費開始學習 <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/posts">
                <Button variant="outline" size="lg" className="gap-2">
                  <Play className="h-5 w-5" /> 瀏覽文章
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                完全免費
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                手把手教學
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                終身學習
              </span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img
              src={assetPath("/images/hero/hero-illustration.svg")}
              alt="網站架設教學插圖"
              className="w-full h-auto"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
