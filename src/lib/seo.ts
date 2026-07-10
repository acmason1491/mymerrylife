import type { Metadata } from "next";
import { absoluteUrl } from "./utils";

interface SeoInput {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  type?: "website" | "article" | "course";
}

export function generateMetadata(input: SeoInput): Metadata {
  const {
    title,
    description,
    keywords = [],
    ogImage,
    canonicalUrl,
    noIndex = false,
    publishedAt,
    updatedAt,
    author,
    type = "website",
  } = input;

  const siteName = "My Merry Life";
  const fullTitle = `${title} | ${siteName}`;
  const imageUrl = ogImage || absoluteUrl("/images/og-default.jpg");
  const canonical = canonicalUrl || undefined;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      title: fullTitle,
      description,
      type: type === "article" ? "article" : "website",
      url: canonical,
      siteName,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(updatedAt && { modifiedTime: updatedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    ...(canonical && { alternates: { canonical } }),
  };

  return metadata;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "My Merry Life",
    url: absoluteUrl("/"),
    description: "免費 WordPress 網站架設教學平台 — 從零開始學習建立網站、部落格、購物商店與線上課程",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/search")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "My Merry Life",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/logo.png"),
    description: "專業 WordPress 教學平台，幫助新手快速架設網站",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@mymerrylife.com",
      contactType: "customer service",
    },
  };
}

export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: absoluteUrl(`/posts/${post.slug}`),
    image: post.image || absoluteUrl("/images/og-default.jpg"),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
  };
}

export function courseSchema(course: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  duration?: number;
  level?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: absoluteUrl(`/courses/${course.slug}`),
    image: course.image || absoluteUrl("/images/og-default.jpg"),
    ...(course.duration && {
      timeRequired: `PT${course.duration}M`,
    }),
    ...(course.level && {
      educationalLevel: course.level,
    }),
    provider: {
      "@type": "Organization",
      name: "My Merry Life",
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
