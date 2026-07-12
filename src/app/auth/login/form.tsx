"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { login } from "@/lib/auth";
import { useAuth } from "@/context/auth-context";

const loginSchema = z.object({
  email: z.string().email("請輸入有效的 Email"),
  password: z.string().min(6, "密碼至少 6 個字元"),
});

type LoginData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { refresh } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginData) {
    setLoading(true);
    const { user, error } = await login(data.email, data.password);
    if (user) {
      await refresh();
      addToast("登入成功", "success");
      window.location.href = "/dashboard";
    } else {
      addToast(error || "登入失敗", "error");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
        <Input type="email" {...register("email")} placeholder="your@email.com" />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">密碼</label>
        <Input type="password" {...register("password")} placeholder="••••••" />
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>
      <Button type="submit" disabled={loading} className="w-full gap-2" size="lg">
        <LogIn className="h-4 w-4" /> {loading ? "登入中..." : "登入"}
      </Button>
    </form>
  );
}
