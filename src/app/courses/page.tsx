import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/section-header";
import { CourseCard } from "@/components/shared/course-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { MOCK_COURSES } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "課程列表 | My Merry Life",
  description: "從零開始學習 WordPress 網站架設",
};

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={[{ label: "課程", href: "/courses" }]} />
      <SectionHeader title="所有課程" subtitle="系統化學習，從入門到精通" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_COURSES.map((course) => <CourseCard key={course.id} course={course} />)}
      </div>
    </div>
  );
}
