import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/context/auth-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My Merry Life — 免費 WordPress 網站架設教學",
    template: "%s | My Merry Life",
  },
  description: "從零開始學習如何自行架設網站，免費 WordPress 教學，新手快速入門。包含個人部落格、公司官網、購物商店與線上課程平台。",
  keywords: ["WordPress教學", "網站架設", "免費教學", "部落格架設", "購物網站", "線上課程"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://acmason1491.github.io/mymerrylife"),
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: "My Merry Life",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={cn(inter.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" type="application/rss+xml" title="My Merry Life RSS Feed" href="/rss.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "My Merry Life",
              url: "https://acmason1491.github.io/mymerrylife",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased">
        <ToastProvider>
          <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <BackToTop />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
