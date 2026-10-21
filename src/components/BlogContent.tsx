"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatDate, postsByDate } from "@/data/content";
export default function BlogContent() {
  const s = useSearchParams().get("s"),
    q = s?.trim().toLowerCase();
  const list = q
    ? postsByDate.filter((p) =>
        (p.title + " " + p.excerpt).toLowerCase().includes(q),
      )
    : postsByDate;
  return (
    <>
      <section className="wrap blog-intro">
        <h1>
          Insights &amp; Strategies for Effective{" "}
          <em>Digital Marketing Success</em>
        </h1>
        <p>
          Crafting new bright brands, unique visual systems and digital
          experience focused on a wide range of original collabs.
        </p>
      </section>
      <section className="wrap section-space blog-list">
        {q && (
          <p className="search-results" role="status">
            {list.length} result{list.length === 1 ? "" : "s"} for &ldquo;{s}
            &rdquo; · <Link href="/blog">Clear</Link>
          </p>
        )}
        <div className="news-grid">
          {list.map((p) => (
            <article className="news-card" key={p.slug}>
              <Link className="news-image" href={`/${p.slug}`}>
                <Image src={p.image} alt={p.title} width={500} height={360} />
              </Link>
              <p className="eyebrow">{formatDate(p.date, "short")}</p>
              <Link href={`/${p.slug}`}>
                <h2>{p.title}</h2>
              </Link>
              <Link href={`/${p.slug}`} className="text-link">
                Read More<span aria-hidden>↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
