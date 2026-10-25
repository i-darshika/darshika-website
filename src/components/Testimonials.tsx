"use client";
import { useEffect, useState } from "react";
import { Quote } from "@/components/Icons";
type T = { quote: string; name: string; type: string };
export default function Testimonials({ items }: { items: T[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  // Auto-advance every 7s; pauses while hovered or focused, and restarts the
  // countdown whenever a slide is picked by hand.
  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setI((v) => (v + 1) % items.length), 7000);
    return () => clearTimeout(id);
  }, [i, paused, items.length]);
  return (
    <div
      className="testimonial-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Quote className="testimonial-quote" />
      <div className="testimonial-window">
        <div
          className="testimonial-track"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {items.map((t, n) => (
            <figure key={t.name} aria-hidden={n !== i}>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <p>{t.name}</p>
                <span>{t.type}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="testimonial-dots">
        {items.map((t, n) => (
          <button
            key={t.name}
            type="button"
            aria-label={`Show testimonial ${n + 1}`}
            aria-pressed={n === i}
            onClick={() => setI(n)}
            className={n === i ? "is-active" : ""}
          />
        ))}
      </div>
    </div>
  );
}
