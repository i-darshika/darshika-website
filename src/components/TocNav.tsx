"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/data/content";

// Sticky "On this page" list that highlights the section currently being read.
export function TocNav({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    const update = () => {
      const line = window.innerHeight * 0.3;
      let current = headings[0]?.id ?? "";
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h.id;
        else break;
      }
      setActive(current);
    };
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  return (
    <ol className="toc-list">
      {items.map((i) => (
        <li key={i.id} className={i.level === 3 ? "is-sub" : undefined}>
          <a
            href={`#${i.id}`}
            className={i.id === active ? "is-active" : undefined}
            aria-current={i.id === active ? "location" : undefined}
          >
            {i.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
