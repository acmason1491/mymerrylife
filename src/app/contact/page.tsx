import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "聯絡我們",
  description: "有任何問題或建議？歡迎與我們聯絡",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb items={[{ label: "聯絡我們", href: "/contact" }]} />
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">聯絡我們</h1>
      <p className="mt-3 text-lg text-slate-500">
        有任何問題或建議？填寫下方表單，我們會盡快回覆您。
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
