import Link from "next/link";
import type { ReactNode } from "react";
import { TocNav } from "@/components/TocNav";

export type LegalSection = { id: string; title: string; body: ReactNode };

// Shared layout for policy pages: text hero, sticky contents list, readable prose.
export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <header className="wrap post-hero">
        <nav className="post-crumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <span>Legal</span>
        </nav>
        <p className="eyebrow post-hero-kicker">Last updated · {updated}</p>
        <h1>{title}</h1>
        <p className="legal-intro">{intro}</p>
      </header>
      <section className="wrap post-layout legal-layout">
        <aside className="post-aside">
          <details className="post-toc" open>
            <summary className="eyebrow">On this page</summary>
            <TocNav items={sections.map((s) => ({ id: s.id, text: s.title, level: 2 }))} />
          </details>
        </aside>
        <article className="post-article">
          <div className="prose-wp post-prose legal-prose">
            {sections.map((s, i) => (
              <section key={s.id}>
                <h2 id={s.id}>
                  <span className="legal-num">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
