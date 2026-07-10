"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

const contactSchema = z.object({
  name: z.string().min(1, "請輸入姓名"),
  email: z.string().email("請輸入有效的 Email"),
  subject: z.string().optional(),
  message: z.string().min(10, "請輸入至少 10 個字"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        addToast("訊息已送出，我們會盡快回覆您", "success");
        reset();
      } else {
        addToast("送出失敗，請稍後再試", "error");
      }
    } catch {
      addToast("網路錯誤，請稍後再試", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">姓名 *</label>
        <Input {...register("name")} placeholder="您的姓名" />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Email *</label>
        <Input type="email" {...register("email")} placeholder="您的 Email" />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">主旨</label>
        <Input {...register("subject")} placeholder="主旨（選填）" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">訊息 *</label>
        <textarea
          {...register("message")}
          rows={5}
          className="flex w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          placeholder="請輸入您的訊息..."
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>
      <Button type="submit" disabled={loading} className="gap-2">
        <Send className="h-4 w-4" /> {loading ? "送出中..." : "送出訊息"}
      </Button>
    </form>
  );
}
