import { create } from "zustand";
import { getProgress, toggleLesson } from "@/lib/storage";

interface LessonProgressState {
  completedByCourse: Record<string, number[]>;
  openByCourse: Record<string, number | null>;
  fetch: (courseSlug: string) => Promise<void>;
  toggle: (courseSlug: string, index: number) => Promise<void>;
  setOpen: (courseSlug: string, index: number | null) => void;
}

export const useLessonProgress = create<LessonProgressState>((set) => ({
  completedByCourse: {},
  openByCourse: {},
  fetch: async (courseSlug) => {
    const completed = await getProgress(courseSlug);
    set((s) => ({ completedByCourse: { ...s.completedByCourse, [courseSlug]: completed } }));
  },
  toggle: async (courseSlug, index) => {
    const completed = await toggleLesson(courseSlug, index);
    set((s) => ({ completedByCourse: { ...s.completedByCourse, [courseSlug]: completed } }));
  },
  setOpen: (courseSlug, index) =>
    set((s) => ({ openByCourse: { ...s.openByCourse, [courseSlug]: index } })),
}));
