import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { FaqSection } from "@/components/sections/faq-section";
import { faqSchema } from "@/lib/seo";
import { FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "常見問題",
  description: "關於 WordPress 架設、網站經營的常見問題解答",
};

export default function FaqPage() {
  const jsonLd = faqSchema(FAQS.map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb items={[{ label: "常見問題", href: "/faq" }]} />
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">常見問題</h1>
      <p className="mt-3 text-lg text-slate-500">想了解更多？看看其他人常問的問題</p>
      <div className="mt-10">
        <FaqSection />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
