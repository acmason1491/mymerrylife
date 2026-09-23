"use client";

import { Button } from "@/components/ui/button";
import { useLessonProgress } from "@/stores/lesson-progress";

interface StartLearningButtonProps {
  courseSlug: string;
  lessonCount: number;
}

export function StartLearningButton({ courseSlug, lessonCount }: StartLearningButtonProps) {
  const fetch = useLessonProgress((s) => s.fetch);
  const setOpen = useLessonProgress((s) => s.setOpen);

  const handleClick = async () => {
    await fetch(courseSlug);
    const completed = useLessonProgress.getState().completedByCourse[courseSlug] ?? [];
    const target =
      Array.from({ length: lessonCount }, (_, i) => i).find((i) => !completed.includes(i)) ?? 0;
    setOpen(courseSlug, target);
    document.getElementById("course-outline")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Button className="w-full gap-2" size="lg" onClick={handleClick}>
      立即開始學習
    </Button>
  );
}
