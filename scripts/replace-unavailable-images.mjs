import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const outputDir = "public/images/articles";
mkdirSync(outputDir, { recursive: true });

function escapeXml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char]);
}

function writePlaceholder(filename, title, subtitle) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#17324d"/>
  <rect x="70" y="70" width="1140" height="580" rx="28" fill="#246b8f"/>
  <circle cx="180" cy="180" r="64" fill="#f6c85f"/>
  <path d="M150 180h60M180 150v60" stroke="#17324d" stroke-width="14" stroke-linecap="round"/>
  <text x="280" y="210" fill="#fff" font-family="Arial, sans-serif" font-size="54" font-weight="700">${escapeXml(title)}</text>
  <text x="140" y="360" fill="#d8edf5" font-family="Arial, sans-serif" font-size="32">${escapeXml(subtitle)}</text>
  <text x="140" y="570" fill="#b8d7e4" font-family="Arial, sans-serif" font-size="24">本機媒體備援圖</text>
</svg>`;
  writeFileSync(`${outputDir}/${filename}`, svg);
}

const campaign = readFileSync("src/app/posts/[slug]/post-content/aweber-campaigns.tsx", "utf8");
let step = 0;
const campaignFixed = campaign.replace(/<img\b[^>]*src="https:\/\/help\.aweber\.com[^\"]+"[^>]*>/gi, (tag) => {
  step++;
  const alt = tag.match(/\balt="([^"]*)"/)?.[1] || `Campaign step ${step}`;
  const filename = `aweber-campaigns-step-${String(step).padStart(2, "2")}.svg`;
  writePlaceholder(filename, "AWeber Campaigns", alt);
  return `<img src="/mymerrylife/images/articles/${filename}" alt="${alt}" />`;
});
writeFileSync("src/app/posts/[slug]/post-content/aweber-campaigns.tsx", campaignFixed);

const money = readFileSync("src/app/posts/[slug]/post-content/makemoney-1.tsx", "utf8");
const moneyFilename = "traffic-exchange-reference.svg";
writePlaceholder(moneyFilename, "Traffic Exchange", "原始 Gigacircle 圖片無法從來源伺服器取得");
writeFileSync(
  "src/app/posts/[slug]/post-content/makemoney-1.tsx",
  money.replace(/<img\b[^>]*src="https:\/\/s6\.gigacircle\.com[^\"]+"[^>]*>/i, `<img src="/mymerrylife/images/articles/${moneyFilename}" alt="Traffic exchange reference" />`),
);

console.log(`Replaced ${step} blocked AWeber images and 1 unavailable Gigacircle image.`);
