// Supabase Edge Function: 有人送出聯絡表單就在 DB 寫入 contacts 後寄 Email 通知
// 觸發方式：Dashboard → Database → Webhooks → contacts 表 INSERT → 呼叫此 function
// 所需 secrets（supabase secrets set）：
//   RESEND_API_KEY  Resend 的 API key（re_...）
//   NOTIFY_TO       收通知的信箱，例如 hello@mymerrylife.com
//   NOTIFY_FROM     寄件者，免費版未驗證網域時用 onboarding@resend.dev
//   WEBHOOK_SECRET  自訂亂數，webhook 的自訂 header 必須帶同樣的值

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

  const subject = `【網站留言】${String(record.subject || "（無主旨）")} — ${String(record.name || "訪客")}`;
  const html =
    `<h3>網站收到新的聯絡訊息</h3>` +
    `<p><b>姓名：</b>${escapeHtml(record.name)}</p>` +
    `<p><b>Email：</b>${escapeHtml(record.email)}</p>` +
    `<p><b>主旨：</b>${escapeHtml(record.subject || "（無）")}</p>` +
    `<p><b>訊息：</b></p><p>${escapeHtml(record.message).replaceAll("\n", "<br>")}</p>` +
    `<p><small>建立時間：${escapeHtml(record.created_at)}</small></p>`;

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
