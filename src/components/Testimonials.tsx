"use client";

import { useEffect, useState } from "react";
import { Quote } from "@/components/Icons";

type T = { quote: string; name: string; type: string };

export default function Testimonials({ items }: { items: T[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="relative rounded-[15px] bg-light-3 p-8 md:px-[60px] md:py-10 lg:h-[496px] lg:w-[880px]">
      <Quote className="h-[77px] w-[100px] text-ink opacity-20" />
      <div className="relative mt-6 overflow-hidden">
        <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${i * 100}%)` }}>
          {items.map((t) => (
            <figure key={t.name} className="w-full shrink-0 pr-4">
              <blockquote className="text-xl leading-[1.3] md:text-[28px]">{t.quote}</blockquote>
              <figcaption className="mt-10 border-t border-black/15 pt-[31px]">
                <p className="text-lg">{t.name}</p>
                <p className="mt-2 text-ink-soft">{t.type}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-8 flex gap-2">
        {items.map((t, n) => (
          <button
            key={t.name}
            type="button"
            aria-label={`Show testimonial ${n + 1}`}
            onClick={() => setI(n)}
            className={`h-2 rounded-full transition-all ${n === i ? "w-8 bg-ink" : "w-2 bg-ink/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
