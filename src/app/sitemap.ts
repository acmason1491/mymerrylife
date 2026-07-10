import type { MetadataRoute } from "next";
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/posts`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/courses`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
  ];

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const slugs = ["wordpress-basics", "choose-domain-name", "woocommerce-setup", "seo-basics", "html-semantic-tags", "css-flexbox-guide"];
  const postPages = slugs.map((slug) => ({
    url: `${baseUrl}/posts/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const courseSlugs = ["blog-setup", "company-website", "ecommerce-setup", "online-course-platform", "frontend-basics", "react-practice"];
  const coursePages = courseSlugs.map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...postPages, ...coursePages];
}
