"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@/components/Icons";

export type WorkTab = {
  href: string;
  title: string;
  year: string;
  kicker: string;
  overview: string;
  meta: [string, string][];
  highlights: string[];
};

// Home-page portfolio section: a horizontal row of numbered project tabs above a
// two-column case-study card. Tabs become a swipeable strip on small screens.
export function WorkTabs({ projects }: { projects: WorkTab[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const pad = (n: number) => String(n).padStart(2, "0");

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const keys: Record<string, number> = {
      ArrowRight: i + 1,
      ArrowDown: i + 1,
      ArrowLeft: i - 1,
      ArrowUp: i - 1,
      Home: 0,
      End: projects.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (keys[e.key] + projects.length) % projects.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="work-tabs">
      <div className="work-tablist" role="tablist" aria-label="Portfolio projects">
        {projects.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p.href}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`work-tab-${i}`}
              aria-selected={on}
              aria-controls={`work-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`work-tab${on ? " is-active" : ""}`}
            >
              <span className="work-tab-top">
                <span>{pad(i + 1)}</span>
                <span>{p.year}</span>
              </span>
              <span className="work-tab-title">{p.title}</span>
            </button>
          );
        })}
      </div>

      {projects.map((p, i) => (
        <div
          key={p.href}
          role="tabpanel"
          id={`work-panel-${i}`}
          aria-labelledby={`work-tab-${i}`}
          hidden={i !== active}
          className="work-panel"
        >
          <span className="work-panel-ghost" aria-hidden>
            {pad(i + 1)}
          </span>
          <div className="work-panel-main">
            <span className="eyebrow">{p.kicker}</span>
            <h3>{p.title}</h3>
            <p className="work-panel-overview">{p.overview}</p>
            <ul className="work-panel-tags">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <Link href={p.href} className="button-primary work-panel-cta">
              View Case Study
              <ArrowUpRight />
            </Link>
          </div>
          <dl className="work-panel-meta">
            {p.meta.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
