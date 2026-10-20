"use client";

import { useEffect, useRef, useState } from "react";

// Two-part cursor follower from the live theme: a 6px dot and a trailing 40px ring that grows over links.
export default function Cursor() {
  const inner = useRef<HTMLDivElement>(null);
  const outer = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      const t = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (inner.current) {
        inner.current.style.transform = t;
        inner.current.style.opacity = "1";
      }
      if (outer.current) {
        outer.current.style.transform = t;
        outer.current.style.opacity = "0.5";
      }
    };
    const over = (e: MouseEvent) => {
      const hot = (e.target as Element | null)?.closest("a, button, input, textarea, [role=button]");
      document.documentElement.classList.toggle("cursor-hover", !!hot);
    };
    const leave = () => {
      if (inner.current) inner.current.style.opacity = "0";
      if (outer.current) outer.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={outer}
        aria-hidden
        style={{ opacity: 0 }}
        className="cursor-outer pointer-events-none fixed left-0 top-0 z-[10000000] -ml-5 -mt-5 h-10 w-10 rounded-full border-2 border-white transition-[transform,opacity,width,height,margin] duration-[600ms] ease-out"
      />
      <div
        ref={inner}
        aria-hidden
        style={{ opacity: 0 }}
        className="cursor-inner pointer-events-none fixed left-0 top-0 z-[10000001] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white transition-[transform,opacity] duration-[400ms] ease-out"
      />
    </>
  );
}
