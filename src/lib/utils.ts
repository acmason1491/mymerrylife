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

const LEGACY_CONTENT_LINK_REDIRECTS: Record<string, string> = {
  "mymerrylife.com/category/makemoney": "/category/make-money/",
  "mymerrylife.com/surfshark_vpn": "https://surfshark.com/",
  "mymerrylife.com/aweber-advocate-2": "https://www.aweber.com/",
  "mymerrylife.com/aweber/1422": "https://www.aweber.com/",
  "mymerrylife.com/aweber/1510": "/posts/aweber-broadcast/",
  "mymerrylife.com/aweber/1534": "/posts/aweber-campaigns/",
  "mymerrylife.com/%e6%b2%92%e6%9c%89%e7%b6%b2%e7%ab%99%e5%97%8e-%e6%95%99%e4%bd%a0%e5%a6%82%e4%bd%95%e8%a3%bd%e4%bd%9c%e4%b8%80%e9%a0%81%e5%bc%8f%e5%bb%a3%e5%91%8a%e7%b6%b2%e9%a0%81%e4%b8%a6%e5%88%a9%e7%94%a8%e9%9b%bb": "/posts/aweber-landing-page/",
  "mymerrylife.com/%e5%a6%82%e4%bd%95%e4%bd%bf%e7%94%a8-aweber-%e7%b6%b2%e7%ab%99%e5%b0%8d%e5%ae%a2%e6%88%b6%e9%80%b2%e8%a1%8c%e7%be%a4%e7%99%bc%e5%8a%9f%e8%83%bd-%e9%9b%bb%e5%ad%90%e9%83%b5%e4%bb%b6%e8%a1%8c%e9%8a%b7": "/posts/aweber-broadcast/",
  "mymerrylife.com/%e5%a6%82%e4%bd%95%e5%9c%a8-aweber-%e5%b9%b3%e5%8f%b0%e5%bb%ba%e7%ab%8b%e4%b8%80%e5%80%8b%e7%b3%bb%e5%88%97%e7%9a%84%e5%bb%a3%e5%91%8a%e6%b4%bb%e5%8b%95-campaigns-aweber-%e6%95%99%e5%ad%b8": "/posts/aweber-campaigns/",
  "mymerrylife.com/javascript-%e7%ad%86%e8%a8%98-dom": "/posts/js-notes-dom/",
  "mymerrylife.com/javascript-%e7%ad%86%e8%a8%98-1": "/posts/js-notes-1/",
  "mymerrylife.com/thrive_suite": "https://thrivethemes.com/affiliates/ref.php?id=11702&url=8407",
  "mymerrylife.com/bluehost": "https://bluehost.sjv.io/c/2967884/795082/11352",
  "mymerrylife.com/thrive_architect": "https://thrivethemes.com/affiliates/ref.php?id=11702&url=8410",
  "mymerrylife.com/thrive_theme_builder": "https://thrivethemes.com/affiliates/ref.php?id=11702&url=8408",
  "mymerrylife.com/thrive_quiz_builder": "https://thrivethemes.com/affiliates/ref.php?id=11702&url=8412",
  "mymerrylife.com/thrive_leads": "https://thrivethemes.com/affiliates/ref.php?id=11702&url=8413",
  "mymerrylife.com/thrive_comments": "https://thrivethemes.com/affiliates/ref.php?id=11702&url=8414",
  "mymerrylife.com/thrive_ovation": "https://thrivethemes.com/ovation/",
  "mymerrylife.com/thrive_ultimatum": "https://thrivethemes.com/affiliates/ref.php?id=11702&url=8415",
  "mymerrylife.com/thrive_automator": "https://thrivethemes.com/affiliates/ref.php?id=11702&url=8416",
  "mymerrylife.com/thrive_apprentice": "https://thrivethemes.com/affiliates/ref.php?id=11702&url=8411",
  "mymerrylife.com/canva": "https://www.canva.com/join/fyg-shp-lxb",
  "mymerrylife.com/designrr2024": "https://masonhou--page1.thrivecart.com/designrr-offer-one-time-payment/",
  "mymerrylife.com/hostgator": "https://partners.hostgator.com/c/2967884/177309/3094",
  "mymerrylife.com/hostinger": "https://www.hostinger.com/",
  "mymerrylife.com/fiverr": "https://www.fiverr.com/pe/kLpPeGA",
  "mymerrylife.com/mouse_without_borders": "https://learn.microsoft.com/en-us/windows/powertoys/mouse-without-borders",
  "mymerrylife.com/courses/getting_started_blog": "/courses/blog-setup/",
  "mymerrylife.com/thrive-apprentice-member-dashboard": "/courses/online-course-platform/",
  "mymerrylife.com/%e5%a6%82%e4%bd%95%e4%bd%bf%e7%94%a8-bluehost-%e5%bf%ab%e9%80%9f%e6%9e%b6%e8%a8%ad%e7%b6%b2%e7%ab%99-%e7%b0%a1%e5%96%ae%e3%80%81%e6%98%93%e5%ad%b8-%e6%96%b0%e6%89%8b%e5%85%8d%e8%b2%bb": "/posts/bluehost-setup/",
  "mymerrylife.com/%e5%a6%82%e4%bd%95%e4%bd%bf%e7%94%a8-hostgator-%e5%bf%ab%e9%80%9f%e6%9e%b6%e8%a8%ad%e7%b6%b2%e7%ab%99-%e7%b0%a1%e5%96%ae%e3%80%81%e6%98%93%e5%ad%b8-%e6%96%b0%e6%89%8b%e5%85%8d%e8%b2%bb": "/posts/hostgator-setup/",
  "mymerrylife.com/%e5%a6%82%e4%bd%95%e8%87%aa%e8%a1%8c%e6%9e%b6%e8%a8%ad%e7%b6%b2%e7%ab%99-%e6%96%b0%e6%89%8b%e5%85%8d%e8%b2%bb%e6%95%99%e5%ad%b8-wordpress": "/posts/self-host-wordpress/",
  "mymerrylife.com/designrr": "/posts/designrr-ebook/",
  "mymerrylife.com/hitleap-vs-bighits4u": "/posts/hitleap-vs-bighits4u/",
  "mymerrylife.com/hitleap-introduction": "/posts/hitleap-intro/",
  "mymerrylife.com/makemoney2": "/posts/makemoney-2/",
  "mymerrylife.com/makemoneyonline": "/posts/makemoney-1/",
  "mymerrylife.com/avoidfbblock": "/posts/avoid-fb-block/",
  "mymerrylife.com/start_a_profitable_blog": "/posts/start-profitable-blog/",
  "mymerrylife.com/thrive-suite": "/posts/thrive-suite/",
  "mymerrylife.com/thrive_themes_quiz": "/posts/thrive-suite/",
  "mymerrylife.com/courses/start_up_a_shopping-site": "/courses/ecommerce-setup/",
  "startablog.mymerrylife.com/bluehost": "https://bluehost.sjv.io/c/2967884/795082/11352",
  "startablog.mymerrylife.com/hostgator": "https://partners.hostgator.com/c/2967884/177309/3094",
  "startablog.mymerrylife.com/siteground": "https://www.siteground.com/",
  "startablog.mymerrylife.com/architect": "https://thrivethemes.com/affiliates/ref.php?id=11702&url=8410",
  "startablog.mymerrylife.com/getresponse": "https://www.getresponse.com/",
  "startablog.mymerrylife.com/aweber": "https://www.aweber.com/",
  "startablog.mymerrylife.com/canva": "https://www.canva.com/join/fyg-shp-lxb",
  "startablog.mymerrylife.com/prettylinks": "https://prettylinks.com/",
  "startablog.mymerrylife.com/fiverr": "https://www.fiverr.com/pe/kLpPeGA",
  "startablog.mymerrylife.com/thrive_suite": "https://thrivethemes.com/affiliates/ref.php?id=11702&url=8407",
  "startablog.mymerrylife.com/theme_builder": "https://thrivethemes.com/affiliates/ref.php?id=11702&url=8408",
  "startablog.mymerrylife.com/updraftplus": "https://updraftplus.com/",
  "hitleap.com/by/masonhou": "https://bighits4u.com/by/masonhou",
  "hitleap.com/": "https://bighits4u.com/by/masonhou",
};

export function normalizeContentLinks(content: string, pageSlug?: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return content.replace(/\bhref\s*=\s*(['"])(.*?)\1/gi, (attribute, quote: string, href: string) => {
    let url: URL;
    try {
      url = new URL(href);
    } catch {
      return attribute;
    }

    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    const pathname = url.pathname.toLowerCase().replace(/\/+$/, "") || "/";
    let destination: string | undefined;

    if (hostname === "mymerrylife.com" && pathname === "/course/registration_form") {
      const courseSlug = ["ecommerce-setup", "online-course-platform"].includes(pageSlug ?? "")
        ? pageSlug
        : "online-course-platform";
      destination = `/courses/${courseSlug}/#course-outline`;
    } else {
      destination = LEGACY_CONTENT_LINK_REDIRECTS[`${hostname}${pathname}`];
    }

    if (!destination) {
      if (url.protocol === "http:" && ["mymerrylife.com", "startablog.mymerrylife.com"].includes(hostname)) {
        return `href=${quote}${href.replace(/^http:/i, "https:")}${quote}`;
      } else {
        return attribute;
      }
    }

    if (destination.startsWith("/")) destination = `${basePath}${destination}`;
    return `href=${quote}${destination.replaceAll("&", "&amp;")}${quote}`;
  });
}

export function getReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, "").length;
  return Math.max(1, Math.ceil(words / 300));
}
