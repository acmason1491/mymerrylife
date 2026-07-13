import { createClient } from "./supabase/client";

export interface Comment {
  id: string;
  postSlug: string;
  author: string;
  content: string;
  createdAt: string;
}

export async function getComments(postSlug: string): Promise<Comment[]> {
  try {
    const supabase = createClient();
    const { data: post } = await supabase.from("posts").select("id").eq("slug", postSlug).maybeSingle();
    if (post) {
      const { data } = await supabase
        .from("comments")
        .select("id, content, created_at, profiles(name)")
        .eq("post_id", post.id)
        .order("created_at", { ascending: false });
      if (data) {
        return data.map((c) => ({
          id: String(c.id),
          postSlug,
          author: (c.profiles as { name?: string } | null)?.name ?? "Anonymous",
          content: c.content,
          createdAt: c.created_at,
        }));
      }
    }
  } catch {}
  return localGetComments(postSlug);
}

export async function addComment(postSlug: string, content: string, userName?: string): Promise<Comment[]> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: post } = await supabase.from("posts").select("id").eq("slug", postSlug).maybeSingle();
      if (post) {
        await supabase.from("comments").insert({ content, post_id: post.id, user_id: user.id });
      }
      return getComments(postSlug);
    }
  } catch {}
  return localAddComment(postSlug, content, userName);
}

async function localGetComments(postSlug: string): Promise<Comment[]> {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(`comments:${postSlug}`) ?? "[]");
  } catch { return []; }
}

async function localAddComment(postSlug: string, content: string, author?: string): Promise<Comment[]> {
  if (typeof window === "undefined") return [];
  try {
    const comments = JSON.parse(localStorage.getItem(`comments:${postSlug}`) ?? "[]");
    comments.push({
      id: crypto.randomUUID?.() ?? `${Date.now()}`,
      postSlug,
      author: author ?? "Anonymous",
      content,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(`comments:${postSlug}`, JSON.stringify(comments));
    return comments;
  } catch { return []; }
}

export async function getBookmarks(): Promise<string[]> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("bookmarks")
        .select("posts(slug)")
        .eq("user_id", user.id);
      if (data) {
        return data
          .map((b) => (b.posts as { slug?: string } | null)?.slug)
          .filter((s): s is string => !!s);
      }
    }
  } catch {}
  return localGetBookmarks();
}

export async function toggleBookmark(slug: string): Promise<string[]> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: post } = await supabase.from("posts").select("id").eq("slug", slug).maybeSingle();
      if (post) {
        const existing = await supabase
          .from("bookmarks")
          .select("id")
          .eq("user_id", user.id)
          .eq("post_id", post.id)
          .maybeSingle();
        if (existing.data) {
          await supabase.from("bookmarks").delete().eq("id", existing.data.id);
        } else {
          await supabase.from("bookmarks").insert({ user_id: user.id, post_id: post.id });
        }
      }
      return getBookmarks();
    }
  } catch {}
  return localToggleBookmark(slug);
}

export async function isBookmarked(slug: string): Promise<boolean> {
  return (await getBookmarks()).includes(slug);
}

async function localGetBookmarks(): Promise<string[]> {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("bookmarks") ?? "[]"); } catch { return []; }
}

async function localToggleBookmark(slug: string): Promise<string[]> {
  if (typeof window === "undefined") return [];
  try {
    const bm = JSON.parse(localStorage.getItem("bookmarks") ?? "[]");
    const idx = bm.indexOf(slug);
    idx === -1 ? bm.push(slug) : bm.splice(idx, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bm));
    return bm;
  } catch { return []; }
}

export async function getProgress(courseSlug: string): Promise<number[]> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: course } = await supabase.from("courses").select("id").eq("slug", courseSlug).maybeSingle();
      if (course) {
        const { data: lessons } = await supabase
          .from("lessons")
          .select("id, order")
          .eq("course_id", course.id);
        if (lessons && lessons.length > 0) {
          const lessonIds = lessons.map((l) => l.id);
          const orderMap = new Map(lessons.map((l) => [l.id, l.order]));
          const { data: progress } = await supabase
            .from("progress")
            .select("lesson_id")
            .eq("user_id", user.id)
            .eq("completed", true)
            .in("lesson_id", lessonIds);
          if (progress) {
            return progress.map((p) => orderMap.get(p.lesson_id)).filter((o): o is number => o != null);
          }
        }
      }
    }
  } catch {}
  return localGetProgress(courseSlug);
}

export async function toggleLesson(courseSlug: string, lessonIndex: number): Promise<number[]> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: course } = await supabase.from("courses").select("id").eq("slug", courseSlug).maybeSingle();
      if (course) {
        const { data: lesson } = await supabase
          .from("lessons")
          .select("id")
          .eq("course_id", course.id)
          .eq("order", lessonIndex)
          .maybeSingle();
        if (lesson) {
          const existing = await supabase
            .from("progress")
            .select("id, completed")
            .eq("user_id", user.id)
            .eq("lesson_id", lesson.id)
            .maybeSingle();
          if (existing.data) {
            await supabase.from("progress").update({ completed: !existing.data.completed }).eq("id", existing.data.id);
          } else {
            await supabase.from("progress").insert({ user_id: user.id, lesson_id: lesson.id, completed: true });
          }
        }
      }
      return getProgress(courseSlug);
    }
  } catch {}
  return localToggleLesson(courseSlug, lessonIndex);
}

async function localGetProgress(courseSlug: string): Promise<number[]> {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(`progress:${courseSlug}`) ?? "[]"); } catch { return []; }
}

async function localToggleLesson(courseSlug: string, lessonIndex: number): Promise<number[]> {
  if (typeof window === "undefined") return [];
  try {
    const p = JSON.parse(localStorage.getItem(`progress:${courseSlug}`) ?? "[]");
    const idx = p.indexOf(lessonIndex);
    idx === -1 ? p.push(lessonIndex) : p.splice(idx, 1);
    localStorage.setItem(`progress:${courseSlug}`, JSON.stringify(p));
    return p;
  } catch { return []; }
}

export async function getEnrollmentCount(): Promise<number> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { count } = await supabase
        .from("enrollments")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id);
      return count ?? 0;
    }
  } catch {}
  return 0;
}
