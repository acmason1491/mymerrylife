import { writeFileSync } from "node:fs";

const apiUrl = "https://mymerrylife.com/wp-json/wp/v2/posts?per_page=100&_fields=slug,link,title,excerpt,featured_media";
const response = await fetch(apiUrl);

if (!response.ok) {
  throw new Error(`WordPress API returned ${response.status}`);
}

const posts = await response.json();
const media = new Map();

for (const post of posts) {
  if (!post.featured_media || media.has(post.featured_media)) continue;
  const mediaResponse = await fetch(`https://mymerrylife.com/wp-json/wp/v2/media/${post.featured_media}?_fields=source_url`);
  if (mediaResponse.ok) media.set(post.featured_media, (await mediaResponse.json()).source_url ?? null);
}

const result = posts.map((post) => ({
  slug: post.slug,
  link: post.link,
  title: post.title?.rendered ?? "",
  excerpt: post.excerpt?.rendered ?? "",
  featuredMedia: post.featured_media ? media.get(post.featured_media) ?? null : null,
}));

writeFileSync(".original-posts.json", JSON.stringify(result, null, 2));
console.log(`Audited ${result.length} original posts`);
