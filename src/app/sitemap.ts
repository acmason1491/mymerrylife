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

  const slugs = ["wordpress-basics", "choose-domain-name", "woocommerce-setup", "seo-basics", "html-semantic-tags", "css-flexbox-guide", "javascript-basics", "react-components", "nodejs-basics", "html-notes", "css-notes", "js-notes-1", "js-notes-2", "js-notes-dom", "react-notes", "backend-notes-1", "backend-notes-2", "backend-notes-3", "start-profitable-blog", "makemoney-1", "makemoney-2", "avoid-fb-block", "hitleap-intro", "hitleap-vs-bighits4u", "fiverr-intro", "aweber-landing-page", "aweber-broadcast", "aweber-campaigns", "self-host-wordpress", "bluehost-setup", "wordpress-move", "hostgator-setup", "google-site-free", "designrr-ebook", "thrive-suite", "sticky-table-of-contents", "mouse-without-borders"];
  const postPages = slugs.map((slug) => ({
    url: `${baseUrl}/posts/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const courseSlugs = ["blog-setup", "company-website", "ecommerce-setup", "online-course-platform"];
  const coursePages = courseSlugs.map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...postPages, ...coursePages];
}
