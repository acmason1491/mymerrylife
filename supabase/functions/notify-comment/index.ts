// Supabase Edge Function: 文章收到新留言時寄 Email 通知
// 觸發方式：public.notify_comment_webhook() trigger（見下方 SQL 註解）
// 所需的 secrets（沿用既有）：RESEND_API_KEY, NOTIFY_TO, NOTIFY_FROM, WEBHOOK_SECRET
//
// 配套 trigger SQL（貼到 SQL Editor 執行，<> 內換成真實值）：
//   create or replace function public.notify_comment_webhook()
//   returns trigger language plpgsql security definer as $$
//   declare
//     function_url text := 'https://<PROJECT_REF>.supabase.co/functions/v1/notify-comment';
//     post_title text; author_name text;
//   begin
//     select p.title into post_title from public.posts p where p.id = NEW.post_id;
//     select pr.name into author_name from public.profiles pr where pr.id = NEW.user_id;
//     perform net.http_post(
//       url := function_url,
//       headers := jsonb_build_object(
//         'Content-Type', 'application/json',
//         'Authorization', 'Bearer <ANON_KEY>',
//         'x-webhook-secret', '<WEBHOOK_SECRET>'
//       ),
//       body := jsonb_build_object('record', jsonb_build_object(
//         'post_title', coalesce(post_title, '(未知文章)'),
//         'author_name', coalesce(author_name, '訪客'),
//         'content', NEW.content,
//         'created_at', NEW.created_at
//       ))
//     );
//     return new;
//   end;
//   $$;
//   drop trigger if exists comments_notify on public.comments;
//   create trigger comments_notify
//   after insert on public.comments
//   for each row execute function public.notify_comment_webhook();

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const expectedSecret = Deno.env.get("WEBHOOK_SECRET") ?? "";
  if (!expectedSecret || req.headers.get("x-webhook-secret") !== expectedSecret) {
    return new Response("Unauthorized", { status: 401 });
  }

  let record: Record<string, unknown>;
  try {
    ({ record } = await req.json());
  } catch {
    return new Response("Bad Request", { status: 400 });
  }
  if (!record || typeof record !== "object") {
    return new Response("Bad Request", { status: 400 });
  }

  const apiKey = Deno.env.get("RESEND_API_KEY") ?? "";
  const to = Deno.env.get("NOTIFY_TO") ?? "";
  const from = Deno.env.get("NOTIFY_FROM") ?? "My Merry Life <onboarding@resend.dev>";
  if (!apiKey || !to) {
    return new Response("Missing email configuration", { status: 500 });
  }

  const subject = `【文章留言】${String(record.post_title || "未知文章")} — ${String(record.author_name || "訪客")}`;
  const html =
    `<h3>你的文章收到新留言</h3>` +
    `<p><b>文章：</b>${escapeHtml(record.post_title)}</p>` +
    `<p><b>留言者：</b>${escapeHtml(record.author_name)}</p>` +
    `<p><b>內容：</b></p><p>${escapeHtml(record.content).replaceAll("\n", "<br>")}</p>` +
    `<p><small>時間：${escapeHtml(record.created_at)}</small></p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });

  if (!res.ok) {
    const detail = await res.text();
    return new Response(`Email failed: ${detail}`, { status: 502 });
  }
  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
