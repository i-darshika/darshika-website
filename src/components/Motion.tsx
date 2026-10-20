"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// useLayoutEffect warns during SSR; this component only renders on the client after hydration.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Site-wide motion, mirroring the live theme:
 * - ScrollSmoother (smooth: 1.3) on pointer devices
 * - [data-anim="chars"]   letters rise in on load (hero name, page titles)
 * - [data-anim="fade-up"] fades up when scrolled into view (footer); data-delay in seconds
 */
export default function Motion() {
  const pathname = usePathname();

  // Smooth scrolling lives for the whole session.
  useIsoLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !finePointer) return;
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.3,
      effects: false,
      normalizeScroll: false,
    });
    return () => smoother.kill();
  }, []);

  // Per-page entrance animations.
  useIsoLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>('[data-anim="chars"]');
      if (reduce) {
        gsap.set(chars, { visibility: "visible" });
        return;
      }

      chars.forEach((el) => {
        const split = SplitText.create(el, { type: "chars", mask: "chars" });
        gsap.set(el, { visibility: "visible" });
        gsap.from(split.chars, {
          yPercent: 110,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          delay: Number(el.dataset.delay ?? 0.2),
          onComplete: () => split.revert(),
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-anim="fade-up"]').forEach((el) => {
        gsap.from(el, {
          y: 100,
          autoAlpha: 0,
          duration: 1.6,
          ease: "power3.out",
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    });

    // Images and fonts change heights after load; keep trigger positions accurate.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    const t = setTimeout(refresh, 600);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  // New page: start at the top (ScrollSmoother keeps its own position).
  useEffect(() => {
    ScrollSmoother.get()?.scrollTop(0);
  }, [pathname]);

  return null;
}
