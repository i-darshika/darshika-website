"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type Card = { image: string; title: string; sub: string };

// About-page strip: glides one card to the right every 5s (8s move), looping forever, like the live Swiper.
export default function GallerySlider({ cards }: { cards: Card[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const first = el.children[0] as HTMLElement;
    const second = el.children[1] as HTMLElement;
    const step = second.offsetLeft - first.offsetLeft;
    const setWidth = step * cards.length;
    const wrap = gsap.utils.wrap(-setWidth * 2, -setWidth);
    gsap.set(el, { x: -setWidth });
    const tween = gsap.to(el, {
      x: `+=${step}`,
      duration: 8,
      ease: "power2.inOut",
      repeat: -1,
      repeatDelay: 5,
      modifiers: { x: (x) => `${wrap(parseFloat(x))}px` },
    });
    return () => {
      tween.kill();
    };
  }, [cards.length]);

  const strip = [...cards, ...cards, ...cards];
  return (
    <div className="overflow-hidden">
      <div ref={track} className="flex w-max gap-[50px] will-change-transform">
        {strip.map((g, i) => (
          <figure key={i} className={`relative w-[260px] shrink-0 md:w-[319px] ${i % 2 ? "mt-0" : "mt-[50px]"}`}>
            <Image src={g.image} alt={`${g.title} – ${g.sub}`} width={319} height={405} className="aspect-[319/405] w-full rounded-[10px] object-cover" />
            <figcaption className="absolute bottom-0 left-0 rounded-tr-[20px] bg-bg px-5 pb-1 pt-[10px]">
              <span className="block text-[15px] font-medium">{g.title}</span>
              <span className="block text-[13px] font-light text-muted">{g.sub}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
