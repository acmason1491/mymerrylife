export interface SeoMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  readingTime: number;
  author: { name: string | null; image: string | null };
  category: { name: string; slug: string } | null;
  tags: { tag: { name: string; slug: string } }[];
}

export interface PostDetail extends PostListItem {
  content: string;
  updatedAt: string;
}

export interface CourseListItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  excerpt: string | null;
  coverImage: string | null;
  price: number;
  level: string;
  duration: number | null;
  lessonCount: number;
  category: { name: string; slug: string } | null;
}

export interface CourseDetail extends CourseListItem {
  lessons: {
    id: string;
    title: string;
    slug: string;
    duration: number | null;
    order: number;
  }[];
}
