"use client";

import { useState } from "react";
import { Minus, Plus } from "@/components/Icons";

type Item = { title: string; text?: string; html?: string; items?: string[] };

// Numbered accordion: open item turns lime with a lime top rule (service + portfolio pages).
export function NumberedAccordion({ items, defaultOpen = 0 }: { items: Item[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div>
      {items.map((it, i) => {
        const active = open === i;
        return (
          <div key={it.title} className={`border-t ${active ? "border-accent" : "border-transparent"}`}>
            <button
              type="button"
              aria-expanded={active}
              onClick={() => setOpen(active ? null : i)}
              className={`flex w-full items-center gap-0 py-[15px] text-left text-xl font-medium leading-7 transition-colors ${active ? "text-accent" : "text-white hover:text-accent"}`}
            >
              <span className="w-[90px] shrink-0 text-sm font-normal">{i + 1}.</span>
              <span className="flex-1">{it.title}</span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden" inert={!active}>
                <div className="pb-4 pl-[90px] text-sm text-muted">
                  {it.text && <p>{it.text}</p>}
                  {it.items && (
                    <ul className="space-y-0">
                      {it.items.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// FAQ accordion with a plus/minus toggle and HTML answers.
export function FaqAccordion({ items }: { items: { q: string; html: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-[5px]">
      {items.map((it, i) => {
        const active = open === i;
        return (
          <div key={it.q} className="border-b border-line-soft">
            <button
              type="button"
              aria-expanded={active}
              onClick={() => setOpen(active ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-[30px] text-left text-2xl font-medium"
            >
              {it.q}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line">
                {active ? <Minus /> : <Plus />}
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden" inert={!active}>
                <div
                  className="max-w-[496px] pb-[30px] text-sm leading-[1.4] text-muted [&_strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: it.html }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
