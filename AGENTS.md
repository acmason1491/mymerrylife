<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# My Merry Life — Project Sync

## Dev Commands

| Command | Description |
|---------|-------------|
| `cmd.exe /c "npm run dev"` | Start dev server |
| `cmd.exe /c "npm run build"` | Build for production (static export) |
| `npx prisma generate` | Generate Prisma client |
| `npx prisma db push` | Push schema to database |

## Project Structure

```
mymerrylife-next/
├── prisma/schema.prisma          # Database schema (13 models)
├── public/                       # Static assets, rss.xml
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout: Inter font, SEO metadata, Header/Footer/Toast/BackToTop
│   │   ├── page.tsx              # Homepage (Hero, FeaturedPosts, FeaturedCourses, Testimonials, FAQ, Newsletter)
│   │   ├── manifest.ts           # Removed (caused static export build error)
│   │   ├── sitemap.ts            # Sitemap with force-static, hardcoded slugs
│   │   ├── robots.ts             # Robots.txt with force-static
│   │   ├── posts/page.tsx        # Post list with mock data
│   │   ├── posts/[slug]/page.tsx # Post detail with mock data + generateStaticParams
│   │   ├── courses/page.tsx      # Course list with mock data
│   │   ├── courses/[slug]/page.tsx # Course detail with mock data + generateStaticParams
│   │   ├── category/[slug]/page.tsx # Category filtered posts
│   │   ├── tag/[slug]/page.tsx   # Tag filtered posts
│   │   ├── search/page.tsx       # Search with Suspense boundary + inline mock data
│   │   ├── search/client.tsx     # Search client component
│   │   ├── about/page.tsx        # About page
│   │   ├── faq/page.tsx          # FAQ page
│   │   ├── contact/page.tsx      # Contact form
│   │   ├── dashboard/page.tsx    # User dashboard (mock)
│   │   ├── auth/login/page.tsx   # Login page
│   │   ├── auth/register/page.tsx # Register page
│   │   ├── privacy-policy/page.tsx
│   │   └── terms/page.tsx
│   ├── components/
│   │   ├── ui/                   # Button, Badge, Card, Input, Skeleton, Toast
│   │   ├── layout/               # Header, Footer, ReadingProgress, BackToTop, Breadcrumb, Pagination
│   │   ├── sections/             # Hero, FeaturedPosts, FeaturedCourses, Testimonials, FaqSection, Newsletter
│   │   ├── shared/               # PostCard, CourseCard, SectionHeader, ShareButtons
│   │   └── forms/                # ContactForm
│   ├── lib/
│   │   ├── constants.ts          # Site config, nav items, categories, FAQs, testimonials
│   │   ├── utils.ts              # formatDate, formatDuration, absoluteUrl, cn
│   │   ├── seo.ts                # Schema.org JSON-LD generators
│   │   └── prisma.ts             # Stub (no real connection)
│   ├── types/index.ts            # TypeScript interfaces
│   └── styles/                   # Global CSS
└── next.config.ts                # Static export config (basePath: /mymerrylife)
```

## Build Status

✅ Build passes with `npm run build` — **70 pages** generated as static HTML.
- All dynamic routes use `generateStaticParams` with mock data arrays.
- API routes removed (incompatible with static export).
- Sitemap and robots.txt use `force-static` for static export compatibility.
- Search page wrapped in `<Suspense>` for `useSearchParams()`.
- Share buttons use inline SVG icons (lucide-react no longer exports Facebook/Twitter).
- **28 original WP articles extracted and integrated** (all 28 posts from https://mymerrylife.com/blog-2/)
- **1532 images** in `public/images/articles/` — all mymerrylife.com WP images downloaded locally
- **Post/page count**: 37 post pages, 6 course pages, 4+ category/tag pages — **88 pages total**
- **Broken images (confirmed dead)**: 5 imonline.gowp.space images removed (dead domain), 1 tracking pixel removed
- **External images (keep original URLs)**: 14 AWeber help images (403 when hotlinking), 1 gigacircle.com image (server down)
- **Client features**: Comments, bookmarks, lesson progress, Supabase Auth
- **Backend integration**: Supabase CRUD for comments/bookmarks/progress with localStorage fallback
  - `storage.ts`: Dual-mode (Supabase → localStorage) for all interactive features
  - Comments require auth (shows login prompt for unauthenticated users)
  - Lesson progress syncs across devices when logged in
  - Dashboard shows real bookmark count and enrollment count
- **Supabase schema**: 13 tables (profiles, posts, courses, lessons, comments, bookmarks, progress, enrollments, reviews, newsletters, contacts, categories, tags) with RLS policies
- **Supabase migration**: `supabase/migrations/00001_init.sql` (300 lines, includes schema + RLS + triggers)
