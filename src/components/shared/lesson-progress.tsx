"use client";

import { useEffect } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { useLessonProgress } from "@/stores/lesson-progress";

interface LessonProgressProps {
  courseSlug: string;
  lessonCount: number;
}

export function LessonProgress({ courseSlug, lessonCount }: LessonProgressProps) {
  const completed = useLessonProgress((s) => s.completedByCourse[courseSlug] ?? []);
  const fetch = useLessonProgress((s) => s.fetch);

  useEffect(() => {
    fetch(courseSlug);
  }, [courseSlug, fetch]);

  const progress = lessonCount > 0 ? Math.round((completed.length / lessonCount) * 100) : 0;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">學習進度</span>
        <span className="text-slate-500">{completed.length} / {lessonCount} 單元 ({progress}%)</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

interface LessonCheckboxProps {
  courseSlug: string;
  lessonIndex: number;
  title: string;
}

export function LessonCheckbox({ courseSlug, lessonIndex, title }: LessonCheckboxProps) {
  const completed = useLessonProgress((s) => s.completedByCourse[courseSlug] ?? []);
  const fetch = useLessonProgress((s) => s.fetch);
  const toggle = useLessonProgress((s) => s.toggle);
  const checked = completed.includes(lessonIndex);

  useEffect(() => {
    fetch(courseSlug);
  }, [courseSlug, fetch]);

  return (
    <button
      onClick={() => toggle(courseSlug, lessonIndex)}
      className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 text-left transition-all ${
        checked
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm"
      }`}
    >
      {checked ? (
        <CheckCircle className="h-6 w-6 shrink-0 text-emerald-500" />
      ) : (
        <Circle className="h-6 w-6 shrink-0 text-slate-300" />
      )}
      <span className={`flex-1 font-medium ${checked ? "text-slate-400 line-through" : "text-slate-900"}`}>
        {title}
      </span>
    </button>
  );
}
