"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FAQS } from "@/lib/constants";

export function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <section className="border-t border-slate-100 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            常見問題
          </h2>
          <p className="mt-3 text-lg text-slate-500">
            想了解更多？看看其他人常問的問題
          </p>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all"
            >
              <button
                onClick={() => setOpenId(openId === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-slate-50"
                aria-expanded={openId === i}
              >
                <span className="text-base font-medium text-slate-900">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-slate-400 transition-transform duration-200",
                    openId === i && "rotate-180"
                  )}
                />
              </button>
              {openId === i && (
                <div className="border-t border-slate-100 px-6 py-5">
                  <p className="text-base leading-relaxed text-slate-500">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
