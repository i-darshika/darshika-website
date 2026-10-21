"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@/components/Icons";

export type BlogTab = {
  slug: string;
  title: string;
  date: string;
  readTime: number;
  excerpt: string;
  topics: string[];
};

// Home-page blog section: numbered vertical tabs on the left, the selected article's
// summary panel on the right. Stacks to scrollable pill tabs on small screens.
export function BlogTabs({ posts }: { posts: BlogTab[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const keys: Record<string, number> = {
      ArrowDown: i + 1,
      ArrowRight: i + 1,
      ArrowUp: i - 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: posts.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (keys[e.key] + posts.length) % posts.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="blog-tabs">
      <div className="blog-tablist" role="tablist" aria-label="Blog articles" aria-orientation="vertical">
        {posts.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`blog-tab-${i}`}
              aria-selected={on}
              aria-controls={`blog-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`blog-tab${on ? " is-active" : ""}`}
            >
              <span className="blog-tab-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="blog-tab-body">
                <span className="blog-tab-date">{p.date}</span>
                <span className="blog-tab-title">{p.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      {posts.map((p, i) => (
        <div
          key={p.slug}
          role="tabpanel"
          id={`blog-panel-${i}`}
          aria-labelledby={`blog-tab-${i}`}
          hidden={i !== active}
          className="blog-panel"
        >
          <div className="blog-panel-top">
            <span className="eyebrow">Blog · {p.readTime} min read</span>
            <span className="blog-panel-count" aria-hidden>
              {String(i + 1).padStart(2, "0")}
              <small>/{String(posts.length).padStart(2, "0")}</small>
            </span>
          </div>
          <h3>{p.title}</h3>
          <p className="blog-panel-excerpt">{p.excerpt}</p>
          {p.topics.length > 0 && (
            <div className="blog-panel-topics">
              <p className="eyebrow">In this article</p>
              <ul>
                {p.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          )}
          <Link href={`/${p.slug}`} className="button-primary blog-panel-cta">
            Read Article
            <ArrowUpRight />
          </Link>
        </div>
      ))}
    </div>
  );
}
