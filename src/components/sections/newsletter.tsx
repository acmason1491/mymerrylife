"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        addToast("訂閱成功！我們會定期寄送教學內容給您", "success");
        setEmail("");
      } else {
        const data = await res.json();
        addToast(data.error || "訂閱失敗，請稍後再試", "error");
      }
    } catch {
      addToast("網路錯誤，請稍後再試", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-14 text-center sm:px-16">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="relative">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">訂閱教學電子報</h2>
            <p className="mt-3 text-lg text-blue-100">
              每週收到最新的網站架設技巧、WordPress 教學與網路趨勢
            </p>
            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md gap-3">
              <Input
                type="email"
                placeholder="輸入您的 Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-white/20 bg-white/10 text-white placeholder:text-blue-200 focus-visible:ring-white/50"
              />
              <Button type="submit" disabled={loading} className="gap-2 bg-white text-blue-600 hover:bg-blue-50">
                {loading ? "送出中..." : "訂閱"} <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-4 text-xs text-blue-200">
              隨時可以取消訂閱，我們不會寄送垃圾郵件
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
