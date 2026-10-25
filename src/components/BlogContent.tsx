"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { postSummaries } from "@/data/content";
import { ArrowUpRight } from "@/components/Icons";

type Summary = (typeof postSummaries)[number];

const dateParts = (iso: string) => {
  const d = new Date(iso);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleDateString("en-US", { month: "short" }),
    year: d.getFullYear(),
    full: d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  };
};

// Paper-style article card: big date stamp, read time, title, excerpt and topics.
export function PostCard({ post, featured = false }: { post: Summary; featured?: boolean }) {
  const d = dateParts(post.date);
  return (
    <article className={`post-card${featured ? " is-featured" : ""}`}>
      <Link href={`/${post.slug}`} className="post-card-link">
        <div className="post-card-head">
          <time className="post-card-date" dateTime={post.date}>
            <span className="post-card-day">{d.day}</span>
            <span className="post-card-month">
              {d.month}
              <br />
              {d.year}
            </span>
          </time>
          <span className="post-card-read">
            {featured && <span className="post-card-badge">Latest</span>}
            {post.readTime} min read
          </span>
        </div>
        <div className="post-card-body">
          <h2>{post.title}</h2>
          <p className="post-card-excerpt">{post.excerpt}</p>
          {post.topics.length > 0 && (
            <ul className="post-card-topics" aria-label="Topics">
              {post.topics.slice(0, featured ? 4 : 3).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
          <span className="post-card-cta">
            Read Article
            <span className="post-card-line" aria-hidden />
            <ArrowUpRight />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function BlogContent() {
  const s = useSearchParams().get("s"),
    q = s?.trim().toLowerCase();
  const list = q
    ? postSummaries.filter((p) =>
        (p.title + " " + p.excerpt + " " + p.topics.join(" ")).toLowerCase().includes(q),
      )
    : postSummaries;
  const [featured, ...rest] = q ? [undefined, ...list] : list;
  return (
    <>
      <section className="wrap blog-intro">
        <h1>
          Insights &amp; Strategies for Effective{" "}
          <em>Digital Marketing Success</em>
        </h1>
        <p>
          Practical guides on SEO, social media and AI-driven marketing to help
          your brand grow online.
        </p>
      </section>
      <section className="wrap section-space blog-list">
        {q && (
          <p className="search-results" role="status">
            {list.length} result{list.length === 1 ? "" : "s"} for &ldquo;{s}
            &rdquo; · <Link href="/blog">Clear</Link>
          </p>
        )}
        {featured && <PostCard post={featured} featured />}
        {rest.length > 0 && (
          <div className="post-grid">
            {rest.map((p) => p && <PostCard key={p.slug} post={p} />)}
          </div>
        )}
      </section>
    </>
  );
}
