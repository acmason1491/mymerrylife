"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, FileText, CheckCircle, Circle } from "lucide-react";
import { getProgress, toggleLesson } from "@/lib/storage";

interface LessonViewerProps {
  lessons: { title: string; duration: number }[];
  content: string[];
  courseSlug: string;
}

export function LessonViewer({ lessons, content, courseSlug }: LessonViewerProps) {
  const [openLesson, setOpenLesson] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    getProgress(courseSlug).then(setCompleted);
  }, [courseSlug]);

  const handleToggle = async (index: number) => {
    const updated = await toggleLesson(courseSlug, index);
    setCompleted(updated);
  };

  return (
    <div className="space-y-3">
      {lessons.map((lesson, i) => (
        <div key={i} className="rounded-lg border border-slate-200 overflow-hidden">
          <button
            onClick={() => setOpenLesson(openLesson === i ? null : i)}
            className="flex w-full items-center gap-3 bg-white px-4 py-3 text-left hover:bg-slate-50 transition-colors"
          >
            {openLesson === i ? (
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
            ) : (
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
            )}
            <button
              onClick={(e) => { e.stopPropagation(); handleToggle(i); }}
              className="shrink-0"
            >
              {completed.includes(i) ? (
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              ) : (
                <Circle className="h-5 w-5 text-slate-300" />
              )}
            </button>
            <FileText className="h-4 w-4 shrink-0 text-blue-500" />
            <span className="flex-1 text-sm font-medium text-slate-700">
              {String(i + 1).padStart(2, "0")} {lesson.title}
            </span>
            <span className="text-xs text-slate-400">{lesson.duration} 分鐘</span>
          </button>
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
