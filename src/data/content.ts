// Typed access to content.json, generated from the live WordPress pages.
import data from "./content.json";

export type ServiceDetail = (typeof data.serviceDetails)[number];
export type Project = (typeof data.portfolio)[number];
export type Post = (typeof data.posts)[number];

export const { serviceDetails, servicesPage, about, portfolio, posts } = data;

// The live services list links to slugs that 404; map rows to the real service pages.
const serviceRoutes: Record<string, string> = {
  "Social Media Marketing": "/social-media-marketing-services",
  "Graphic Designing": "/graphic-designing-services",
  "Search Engine Optimization": "/search-engine-optimization-service",
  "Website Designing": "/website-development-services",
};
export const serviceRoute = (title: string) => serviceRoutes[title.replace(/\s+/g, " ")] ?? "/digital-marketing-services";

// Blog order on the live site: newest first.
export const postsByDate = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso: string, style: "long" | "short" = "long") =>
  new Date(iso).toLocaleDateString("en-US", style === "long" ? { month: "long", day: "numeric", year: "numeric" } : { month: "short", day: "numeric", year: "numeric" });

const decode = (t: string) =>
  t.replace(/&amp;/g, "&").replace(/&#8217;|&rsquo;/g, "’").replace(/&nbsp;/g, " ").replace(/&[a-z0-9#]+;/gi, "");

// Card/tab summary per post (newest first): trimmed excerpt, read time and section headings.
export const postSummaries = postsByDate.map((p) => {
  const words = p.html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const raw = decode(p.excerpt.replace(/\s*(…|\[…\]|\.\.\.)\s*$/, "")).trim();
  // End on the last full sentence (a period after a letter, so "1." list markers don't count).
  const ends = [...raw.matchAll(/[A-Za-z’)]\.(?=\s|$)/g)].map((m) => (m.index ?? 0) + 2);
  const cut = ends.length ? ends[ends.length - 1] : 0;
  const excerpt = cut > 120 ? raw.slice(0, cut) : `${raw}…`;
  const topics = [...p.html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)]
    .map((m) => decode(m[1].replace(/<[^>]+>/g, "")).replace(/^\d+\.\s*/, "").trim())
    .filter((t) => t && !/^(introduction|conclusion)$/i.test(t))
    .slice(0, 4);
  return {
    slug: p.slug,
    title: p.title,
    date: p.date,
    readTime: Math.max(1, Math.round(words / 200)),
    excerpt,
    topics,
  };
});

export type TocItem = { id: string; text: string; level: 2 | 3 };

// Clean a WordPress post body for the article page: drop images and empty spacer
// paragraphs, give headings anchor ids, and collect a table of contents
// (h2s, plus h3s when a post has fewer than four h2s).
export function prepareArticle(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const h2Count = (html.match(/<h2[\s>]/g) ?? []).length;
  const out = html
    .replace(/<figure[\s\S]*?<\/figure>/g, "")
    .replace(/<img[^>]*>/g, "")
    .replace(/<p>(\s|&nbsp;| )*<\/p>/g, "")
    .replace(/<(h[23])([^>]*)>([\s\S]*?)<\/\1>/g, (_m, tag: string, attrs: string, inner: string) => {
      const text = decode(inner.replace(/<[^>]+>/g, "")).trim();
      let id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "section";
      while (used.has(id)) id += "-2";
      used.add(id);
      const level = tag === "h2" ? 2 : 3;
      if (level === 2 || h2Count < 4) toc.push({ id, text: text.replace(/^\d+\.\s*/, ""), level });
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
    });
  return { html: out, toc };
}
