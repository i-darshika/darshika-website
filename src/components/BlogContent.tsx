"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatDate, postsByDate } from "@/data/content";





export default function BlogContent() {
  const s = useSearchParams().get("s");
  const q = s?.trim().toLowerCase();
  const list = q ? postsByDate.filter((p) => (p.title + " " + p.excerpt).toLowerCase().includes(q)) : postsByDate;

  return (
    <>
      <section className="wrap">
        <div className="grid gap-8 border-b border-line pb-[141px] pt-[140px] lg:grid-cols-[740px_410px] lg:items-end lg:justify-between lg:px-[3px]">
          <h1 className="text-[40px] font-medium leading-[1.2] md:text-[55px]">Insights &amp; Strategies for Effective Digital Marketing Success</h1>
          <p className="max-w-[410px] leading-[1.4] text-muted">
            Crafting new bright brands, unique visual systems and digital experience focused on a wide range of original collabs.
          </p>
        </div>
      </section>

      <section className="bg-[#0e0f11]">
        <div className="wrap">
          <div className="border-b border-line px-0 pb-[140px] pt-[140px] lg:px-[15px]">
            {q && (
              <p className="mb-10 text-muted">
                {list.length} result{list.length === 1 ? "" : "s"} for &ldquo;{s}&rdquo; · <Link href="/blog" className="text-accent">Clear</Link>
              </p>
            )}
            <div className="grid gap-[60px] md:grid-cols-3">
              {list.map((p) => (
                <article key={p.slug}>
                  <Link href={`/${p.slug}`} className="group block overflow-hidden">
                    <Image src={p.image} alt={p.title} width={382} height={275} className="aspect-[382/275] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </Link>
                  <Link href={`/${p.slug}`} className="mt-5 block text-[19px] font-semibold leading-[1.8] hover:text-accent">
                    {p.title}
                  </Link>
                  <p className="mt-[22px] text-[11px] font-semibold uppercase text-muted-2">{formatDate(p.date, "short")}</p>
                  <Link
                    href={`/${p.slug}`}
                    className="mt-[42px] flex h-12 items-center border-t border-[#999]/20 text-[15px] font-bold text-muted-2 hover:text-accent"
                  >
                    Read More
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

