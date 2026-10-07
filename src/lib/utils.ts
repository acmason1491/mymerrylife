import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} 分鐘`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} 小時 ${m} 分鐘` : `${h} 小時`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://mymerrylife.com";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function assetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

const START_PROFITABLE_BLOG_OLD_IMAGES: Record<string, string> = {
  "start-profitable-blog-makeup-g50e3f4d7d_640.jpg": "makeup-g50e3f4d7d_640.jpg",
  "start-profitable-blog-make-money-online.svg": "make-money-online.jpg",
  "start-profitable-blog-health_fitness-1.svg": "health_fitness-1.jpg",
  "start-profitable-blog-relationships.svg": "relationships.jpg",
  "start-profitable-blog-pets.svg": "pets.jpg",
  "start-profitable-blog-art.svg": "art.jpg",
  "start-profitable-blog-crafts.svg": "crafts.jpg",
  "start-profitable-blog-personal-growth.svg": "personal-growth.jpg",
  "start-profitable-blog-personal-finance.svg": "personal-finance.jpg",
  "start-profitable-blog-Parenting.svg": "Parenting.jpg",
  "start-profitable-blog-travel-and-food.svg": "travel-and-food.jpg",
  "start-profitable-blog-Cooking-niche.svg": "Cooking-niche.jpg",
  "start-profitable-blog-fashion-niche.svg": "fashion-niche.jpg",
  "start-profitable-blog-gardening-niche.svg": "gardening-niche.jpg",
  "start-profitable-blog-photography-niche.svg": "photography-niche.jpg",
  "start-profitable-blog-leadership-niche.svg": "leadership-niche.jpg",
  "start-profitable-blog-affiliate-marketing-5562865_640.webp": "affiliate-marketing-5562865_640.png",
  "start-profitable-blog-klook-affiliate-program-min-min.png": "klook-affiliate-program-min-min.png",
  "start-profitable-blog-kkday-affiliate-program-min-min.png": "kkday-affiliate-program-min-min.png",
  "start-profitable-blog-create-a-stunning-ebook-in-2-minutes.-min-768x402-1.webp": "create-a-stunning-ebook-in-2-minutes.-min-768x402-1.png",
  "start-profitable-blog-shopping-day.webp": "shopping-day.png",
  "start-profitable-blog-seo-g1664627f8_640-min.webp": "seo-g1664627f8_640-min.png",
  "start-profitable-blog-網站設計-min.png": "網站設計-min.png",
};

export function normalizeContentAssetPaths(content: string, postSlug?: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  let normalized = content.replaceAll("/mymerrylife/images/", `${basePath}/images/`);

  if (postSlug === "start-profitable-blog") {
    for (const [currentImage, oldImage] of Object.entries(START_PROFITABLE_BLOG_OLD_IMAGES)) {
      normalized = normalized.replaceAll(
        `${basePath}/images/articles/${currentImage}`,
        `${basePath}/images/articles/wp-original/start-profitable-blog/${oldImage}`,
      );
    }
  }

  return normalized;
}

export function getReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, "").length;
  return Math.max(1, Math.ceil(words / 300));
}
