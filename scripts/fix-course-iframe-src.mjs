import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = "src/app/courses/[slug]/course-content";
const files = readdirSync(dir).filter((file) => file.endsWith(".tsx"));
let fixed = 0;

for (const file of files) {
  let content = readFileSync(join(dir, file), "utf8");
  const original = content;
  content = content.replace(/<iframe\b[^>]*>/gi, (tag) => {
    if (/\ssrc="/.test(tag)) return tag; // 已真正帶有 src（前面是空格/屬性分隔）
    const dataSrc = tag.match(/\bdata-src="([^"]+)"/);
    const dataCode = tag.match(/\bdata-code="([^"]+)"/);
    let url = dataSrc?.[1] ?? null;
    if (!url && dataCode) {
      url = `https://www.youtube.com/embed/${dataCode[1]}?rel=0&amp;modestbranding=1&amp;controls=1&amp;fs=1`;
    }
    if (!url) return tag;
    return tag.replace(/^<iframe/, `<iframe src="${url}"`);
  });
  if (content !== original) {
    writeFileSync(join(dir, file), content);
    const count = (content.match(/<iframe[^>]*\ssrc="/g) || []).length;
    fixed += count;
    console.log(`${file}: ${count} iframe(s) with src`);
  }
}
console.log(`Total iframes fixed: ${fixed}`);