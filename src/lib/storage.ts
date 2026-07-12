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
    const { data } = await supabase
      .from("comments")
      .select("id, content, created_at, profiles!inner(name)")
      .eq("posts.slug", postSlug)
      .order("created_at", { ascending: false });
    if (data) {
      return data.map((c: any) => ({
        id: String(c.id),
        postSlug,
        author: c.profiles?.name ?? "Anonymous",
        content: c.content,
        createdAt: c.created_at,
      }));
    }
  } catch {}
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`comments:${postSlug}`);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export async function addComment(postSlug: string, author: string, content: string): Promise<Comment[]> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: post } = await supabase.from("posts").select("id").eq("slug", postSlug).single();
      if (post) {
        await supabase.from("comments").insert({ content, post_id: post.id, user_id: user.id });
      }
    }
    return getComments(postSlug);
  } catch {}
  if (typeof window === "undefined") return [];
  try {
    const comments = JSON.parse(localStorage.getItem(`comments:${postSlug}`) ?? "[]");
    comments.push({ id: crypto.randomUUID?.() ?? `${Date.now()}`, postSlug, author, content, createdAt: new Date().toISOString() });
    localStorage.setItem(`comments:${postSlug}`, JSON.stringify(comments));
    return comments;
  } catch { return []; }
}

export async function getBookmarks(): Promise<string[]> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("bookmarks").select("posts!inner(slug)").eq("user_id", user.id);
      if (data) return data.map((b: any) => b.posts?.slug).filter(Boolean);
    }
  } catch {}
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("bookmarks") ?? "[]"); } catch { return []; }
}

export async function toggleBookmark(slug: string): Promise<string[]> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: post } = await supabase.from("posts").select("id").eq("slug", slug).single();
      if (post) {
        const existing = await supabase.from("bookmarks").select("id").eq("user_id", user.id).eq("post_id", post.id).maybeSingle();
        if (existing.data) {
          await supabase.from("bookmarks").delete().eq("id", existing.data.id);
        } else {
          await supabase.from("bookmarks").insert({ user_id: user.id, post_id: post.id });
        }
      }
      return getBookmarks();
    }
  } catch {}
  if (typeof window === "undefined") return [];
  try {
    const bm = JSON.parse(localStorage.getItem("bookmarks") ?? "[]");
    const idx = bm.indexOf(slug);
    idx === -1 ? bm.push(slug) : bm.splice(idx, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bm));
    return bm;
  } catch { return []; }
}

export async function isBookmarked(slug: string): Promise<boolean> {
  return (await getBookmarks()).includes(slug);
}

export async function getProgress(courseSlug: string): Promise<number[]> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("progress").select("lessons!inner(order)").eq("user_id", user.id).eq("lessons.courses.slug", courseSlug);
      if (data) return data.map((p: any) => p.lessons?.order).filter((o: any) => o != null);
    }
  } catch {}
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(`progress:${courseSlug}`) ?? "[]"); } catch { return []; }
}

export async function toggleLesson(courseSlug: string, lessonIndex: number): Promise<number[]> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: lesson } = await supabase.from("lessons").select("id").eq("order", lessonIndex).eq("courses.slug", courseSlug).single();
      if (lesson) {
        const existing = await supabase.from("progress").select("id, completed").eq("user_id", user.id).eq("lesson_id", lesson.id).maybeSingle();
        if (existing.data) {
          await supabase.from("progress").update({ completed: !existing.data.completed }).eq("id", existing.data.id);
        } else {
          await supabase.from("progress").insert({ user_id: user.id, lesson_id: lesson.id, completed: true });
        }
      }
      return getProgress(courseSlug);
    }
  } catch {}
  if (typeof window === "undefined") return [];
  try {
    const p = JSON.parse(localStorage.getItem(`progress:${courseSlug}`) ?? "[]");
    const idx = p.indexOf(lessonIndex);
    idx === -1 ? p.push(lessonIndex) : p.splice(idx, 1);
    localStorage.setItem(`progress:${courseSlug}`, JSON.stringify(p));
    return p;
  } catch { return []; }
}
