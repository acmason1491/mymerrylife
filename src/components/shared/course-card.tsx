import Link from "next/link";
import { Clock, BookOpen, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CourseListItem } from "@/types";

interface CourseCardProps {
  course: CourseListItem;
}

const levelLabels: Record<string, string> = {
  BEGINNER: "初學者",
  INTERMEDIATE: "中級",
  ADVANCED: "進階",
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <Card hover className="group h-full">
        {course.coverImage && (
          <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl">
            <img
              src={course.coverImage}
              alt={course.title}
              className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <CardContent>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {course.category && (
              <Badge variant="default">{course.category.name}</Badge>
            )}
            <Badge variant="secondary">{levelLabels[course.level] || course.level}</Badge>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {course.title}
          </h3>
          {course.excerpt && (
            <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2">
              {course.excerpt}
            </p>
          )}
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {course.lessonCount} 單元
            </span>
            {course.duration && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {course.duration} 分鐘
              </span>
            )}
          </div>
          {course.price > 0 && (
            <div className="mt-3">
              <span className="text-lg font-bold text-blue-600">NT${course.price}</span>
            </div>
          )}
          {course.price === 0 && (
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-medium text-emerald-700">
                <Star className="h-3 w-3" /> 免費
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
