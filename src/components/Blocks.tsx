import { Children, isValidElement, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@/components/Icons";

// Plain-text length of a heading, so CSS can size it to fit on one line.
const textLength = (node: ReactNode): number =>
  Children.toArray(node).reduce<number>((n, c) => {
    if (typeof c === "string" || typeof c === "number") return n + String(c).length;
    if (isValidElement<{ children?: ReactNode }>(c)) return n + textLength(c.props.children);
    return n;
  }, 0);

export function SectionHead({
  label,
  tag,
  title,
  aside,
  link,
  tone = "dark",
  className = "",
}: {
  label: string;
  tag: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  link?: { label: string; href: string };
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={`section-heading ${tone === "light" ? "heading-light" : ""} ${className}`}
    >
      <div className="section-kicker">
        <span className="eyebrow">{label}</span>
        <span className="section-tag">{tag}</span>
      </div>
      <div className="section-heading-body">
        <div className="section-heading-title">
          <h2 style={{ "--chars": textLength(title) } as React.CSSProperties}>{title}</h2>
        </div>
        <div className="section-heading-aside">
          {aside && <p>{aside}</p>}
          {link && (
            <Link className="text-link" href={link.href}>
              {link.label}
              <ArrowUpRight />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
export function PageTitle({ title, crumb }: { title: string; crumb?: string }) {
  return (
    <section className="page-title wrap">
      <div className="page-title-top">
        <span className="eyebrow">Darshika Raj</span>
        <span className="title-star" aria-hidden>
          ✳
        </span>
      </div>
      <h1>{title}</h1>
      {crumb && (
        <p className="page-crumb">
          ( <Link href="/">Pages</Link>
          <span>—</span>
          {crumb} )
        </p>
      )}
      <div className="page-title-rule" />
    </section>
  );
}
export function DotTags({
  tags,
  className = "",
}: {
  tags: string[];
  className?: string;
}) {
  return (
    <div className={`dot-tags ${className}`}>
      {tags.map((t, i) => (
        <span key={t + i}>{t}</span>
      ))}
    </div>
  );
}
export function WordMarquee({
  words,
  tone = "dark",
}: {
  words: string[];
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={`word-marquee ${tone === "light" ? "text-ink" : ""}`}
    >
      <span className="sr-only">{words.join(", ")}</span>
      <div className="marquee" aria-hidden>
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i}>
            {w}
            <span className="marquee-star">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
