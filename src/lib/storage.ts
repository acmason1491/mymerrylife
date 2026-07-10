export interface Comment {
  id: string;
  postSlug: string;
  author: string;
  content: string;
  createdAt: string;
}

export function getComments(postSlug: string): Comment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`comments:${postSlug}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addComment(postSlug: string, author: string, content: string): Comment[] {
  const comments = getComments(postSlug);
  const newComment: Comment = {
    id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    postSlug,
    author,
    content,
    createdAt: new Date().toISOString(),
  };
  comments.push(newComment);
  localStorage.setItem(`comments:${postSlug}`, JSON.stringify(comments));
  return comments;
}

export function getBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("bookmarks");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(slug: string): string[] {
  const bookmarks = getBookmarks();
  const idx = bookmarks.indexOf(slug);
  if (idx === -1) {
    bookmarks.push(slug);
  } else {
    bookmarks.splice(idx, 1);
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  return bookmarks;
}

export function isBookmarked(slug: string): boolean {
  return getBookmarks().includes(slug);
}

export function getProgress(courseSlug: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`progress:${courseSlug}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleLesson(courseSlug: string, lessonIndex: number): number[] {
  const progress = getProgress(courseSlug);
  const idx = progress.indexOf(lessonIndex);
  if (idx === -1) {
    progress.push(lessonIndex);
  } else {
    progress.splice(idx, 1);
  }
  localStorage.setItem(`progress:${courseSlug}`, JSON.stringify(progress));
  return progress;
}
