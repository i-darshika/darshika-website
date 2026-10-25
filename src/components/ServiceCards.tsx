"use client";

import Link from "next/link";
import type { PointerEvent } from "react";
import { ArrowUpRight } from "@/components/Icons";

export type ServiceCard = {
  num: string;
  title: string;
  href: string;
  intro: string;
  offers: string[];
};

// Services page: bento grid of cards with a soft spotlight that follows the pointer.
export function ServiceCards({ services }: { services: ServiceCard[] }) {
  const track = (e: PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div className="service-bento">
      {services.map((s) => (
        <Link key={s.num} href={s.href} className="service-card" onPointerMove={track}>
          <span className="service-card-num" aria-hidden>
            {s.num}
          </span>
          <div className="service-card-head">
            <span className="eyebrow">Service {s.num}</span>
            <span className="service-card-arrow">
              <ArrowUpRight />
            </span>
          </div>
          <h2>{s.title}</h2>
          <p className="service-card-intro">{s.intro}</p>
          <ul className="service-card-offers">
            {s.offers.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <span className="service-card-cta">Explore service</span>
        </Link>
      ))}
    </div>
  );
}
