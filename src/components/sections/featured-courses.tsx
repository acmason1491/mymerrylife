import { SectionHeader } from "@/components/shared/section-header";
import { CourseCard } from "@/components/shared/course-card";
import type { CourseListItem } from "@/types";

interface FeaturedCoursesProps {
  courses: CourseListItem[];
}

export function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  if (!courses.length) return null;

  return (
    <section className="border-t border-slate-100 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          title="精選課程"
          subtitle="系統化學習，從入門到精通"
          linkHref="/courses"
          linkLabel="查看全部課程"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.slice(0, 4).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
