import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./form";

export const metadata: Metadata = {
  title: "免費註冊",
  description: "註冊 My Merry Life 會員，開始免費學習 WordPress 網站架設",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900">免費註冊</h1>
        <p className="mt-2 text-slate-500">建立帳號，開始你的學習之旅</p>
      </div>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-slate-500">
        已經有帳號？{" "}
        <Link href="/auth/login" className="text-blue-600 hover:underline">登入</Link>
      </p>
    </div>
  );
}
