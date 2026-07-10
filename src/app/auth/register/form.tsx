"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

const registerSchema = z.object({
  name: z.string().min(1, "請輸入名稱"),
  email: z.string().email("請輸入有效的 Email"),
  password: z.string().min(6, "密碼至少 6 個字元"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "密碼不一致",
  path: ["confirmPassword"],
});

type RegisterData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterData) {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });
      if (res.ok) {
        addToast("註冊成功！請登入", "success");
        window.location.href = "/auth/login";
      } else {
        const err = await res.json();
        addToast(err.error || "註冊失敗", "error");
      }
    } catch {
      addToast("網路錯誤", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">名稱</label>
        <Input {...register("name")} placeholder="您的名稱" />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
        <Input type="email" {...register("email")} placeholder="your@email.com" />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">密碼</label>
        <Input type="password" {...register("password")} placeholder="至少 6 碼" />
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">確認密碼</label>
        <Input type="password" {...register("confirmPassword")} placeholder="再次輸入密碼" />
        {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
      </div>
      <Button type="submit" disabled={loading} className="w-full gap-2" size="lg">
        <UserPlus className="h-4 w-4" /> {loading ? "註冊中..." : "免費註冊"}
      </Button>
    </form>
  );
}
