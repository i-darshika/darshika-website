"use client";
import { useEffect, useState } from "react";
import { Quote } from "@/components/Icons";
type T = { quote: string; name: string; type: string };
export default function Testimonials({ items }: { items: T[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, [items.length]);
  return (
    <div className="testimonial-card">
      <Quote className="testimonial-quote" />
      <div className="testimonial-window">
        <div
          className="testimonial-track"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {items.map((t) => (
            <figure key={t.name}>
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
