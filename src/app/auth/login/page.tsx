import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./form";

export const metadata: Metadata = {
  title: "登入",
  description: "登入 My Merry Life 會員帳號",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900">歡迎回來</h1>
        <p className="mt-2 text-slate-500">登入您的帳號繼續學習</p>
      </div>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-slate-500">
        還沒有帳號？{" "}
        <Link href="/auth/register" className="text-blue-600 hover:underline">免費註冊</Link>
      </p>
    </div>
  );
}
