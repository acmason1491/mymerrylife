"use client";

import { useEffect } from "react";
import { ChevronDown, ChevronRight, FileText, CheckCircle, Circle } from "lucide-react";
import { useLessonProgress } from "@/stores/lesson-progress";

interface LessonViewerProps {
  lessons: { title: string; duration: number }[];
  content: string[];
  courseSlug: string;
}

export function LessonViewer({ lessons, content, courseSlug }: LessonViewerProps) {
  const completedByCourse = useLessonProgress((s) => s.completedByCourse);
  const openByCourse = useLessonProgress((s) => s.openByCourse);
  const fetch = useLessonProgress((s) => s.fetch);
  const toggle = useLessonProgress((s) => s.toggle);
  const setOpen = useLessonProgress((s) => s.setOpen);
  const completed = completedByCourse[courseSlug] ?? [];
  const openLesson = openByCourse[courseSlug] ?? null;

  useEffect(() => {
    fetch(courseSlug);
  }, [courseSlug, fetch]);

  return (
    <div className="space-y-3">
      {lessons.map((lesson, i) => (
        <div key={i} className="rounded-lg border border-slate-200 overflow-hidden">
          <div className="flex w-full items-center gap-3 bg-white px-4 py-3 hover:bg-slate-50 transition-colors">
            <button
              type="button"
              onClick={() => setOpen(courseSlug, openLesson === i ? null : i)}
              aria-expanded={openLesson === i}
              className="flex min-w-0 flex-1 items-center gap-3 text-left"
            >
              {openLesson === i ? (
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
              )}
              <FileText className="h-4 w-4 shrink-0 text-blue-500" />
              <span className="flex-1 text-sm font-medium text-slate-700">
                {String(i + 1).padStart(2, "0")} {lesson.title}
              </span>
              <span className="text-xs text-slate-400">{lesson.duration} 分鐘</span>
            </button>
            <button
              type="button"
              onClick={() => toggle(courseSlug, i)}
              aria-label={completed.includes(i) ? `標記${lesson.title}為未完成` : `標記${lesson.title}為已完成`}
              className="shrink-0 rounded-full"
            >
              {completed.includes(i) ? (
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              ) : (
                <Circle className="h-5 w-5 text-slate-300" />
              )}
            </button>
          </div>
          {openLesson === i && content[i] && (
            <div className="border-t border-slate-200 bg-white px-6 py-5">
              <div
                className="lesson-content-wrapper prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: content[i] }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
