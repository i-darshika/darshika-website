"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function Motion() {
  const path = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const topButton = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const configure = () => {
      lenisRef.current?.destroy();
      lenisRef.current = preference.matches
        ? null
        : new Lenis({
            autoRaf: true,
            smoothWheel: true,
            syncTouch: false,
            lerp: 0.09,
            anchors: { offset: -110 },
            prevent: (node) =>
              !!node.closest('[role="dialog"], .gallery-scroll'),
          });
      if (document.body.style.overflow === "hidden") lenisRef.current?.stop();
    };
    configure();
    // Preserve in-page anchors, but start a new route at its beginning.
    if (!window.location.hash) {
      if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
      else window.scrollTo({ top: 0, behavior: "instant" });
    }
    const observer = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") lenisRef.current?.stop();
      else lenisRef.current?.start();
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    preference.addEventListener("change", configure);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", configure);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [path]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setVisible(window.scrollY > 450);
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
      topButton.current?.style.setProperty(
        "--scroll-progress",
        `${progress * 360}deg`,
      );
    };
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
  }, [path]);

  const scrollToTop = () => {
    const focusContent = () =>
      document.getElementById("main-content")?.focus({ preventScroll: true });
    if (lenisRef.current)
      lenisRef.current.scrollTo(0, {
        duration: 1.15,
        onComplete: focusContent,
      });
    else {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      focusContent();
    }
  };

  return (
    <button
      ref={topButton}
      type="button"
      className={`scroll-to-top${visible ? " is-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path
          d="M12 19V5m-6 6 6-6 6 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="scroll-top-label" aria-hidden="true">
        Back to top
      </span>
    </button>
  );
}
