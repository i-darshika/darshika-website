import Link from "next/link";
import { portfolio, servicesPage, type Project } from "@/data/content";
import { ArrowUpRight } from "@/components/Icons";
import ShareButtons from "@/components/ShareButtons";

const pad = (n: number) => String(n).padStart(2, "0");

// Individual portfolio project: text-only case study with a spec sheet, overview,
// services delivered, client testimonial (when there is one) and next/previous projects.
export function ProjectCaseStudy({ p }: { p: Project }) {
  const index = portfolio.findIndex((x) => x.slug === p.slug);
  const prev = portfolio[(index - 1 + portfolio.length) % portfolio.length];
  const next = portfolio[(index + 1) % portfolio.length];
  const firstWord = p.title.toLowerCase().replace(/^the\s+/, "").split(" ")[0];
  const quote = servicesPage.testimonials.find((t) =>
    t.name.toLowerCase().replace(/^the\s+/, "").startsWith(firstWord),
  );

  return (
    <>
      <section className="wrap case-hero">
        <nav className="post-crumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/digital-marketing-portfolio">Portfolio</Link>
        </nav>
        <div className="case-hero-head">
          <span className="case-hero-num" aria-hidden>
            {pad(index + 1)}
          </span>
          <div>
            <p className="eyebrow">Case study · {p.kicker}</p>
            <h1>{p.title}</h1>
            <p className="case-hero-tagline">{p.tagline}</p>
          </div>
        </div>
        <dl className="case-specs">
          {p.meta.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section-space case-overview">
        <div>
          <p className="eyebrow">The brand</p>
          <h2 className="svc-section-title">{p.overviewHeading}</h2>
        </div>
        <div className="case-overview-copy">
          {p.overview.map((t) => (
            <p key={t.slice(0, 24)}>{t}</p>
          ))}
        </div>
        <aside className="case-focus">
          <p className="eyebrow">Focus areas</p>
          <ol>
            {p.highlights.map((h, i) => (
              <li key={h}>
                <span>{pad(i + 1)}</span>
                {h}
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="wrap case-services">
        <div className="post-more-head">
          <h2 className="display-heading">
            What I <em>delivered</em>
          </h2>
        </div>
        <div className="case-services-grid">
          {p.services.map((s, i) => (
            <article key={s.title} className="case-service">
              <span className="case-service-num">{pad(i + 1)}</span>
              <h3>{s.title}</h3>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {quote && (
        <section className="wrap section-space">
          <figure className="case-quote">
            <span className="case-quote-mark" aria-hidden>
              “
            </span>
            <blockquote>{quote.quote}</blockquote>
            <figcaption>
              <strong>{quote.name}</strong>
              <span>{quote.type.replace(/[()]/g, "")}</span>
            </figcaption>
          </figure>
        </section>
      )}

      <section className={`wrap case-share${quote ? "" : " is-spaced"}`}>
        <p className="eyebrow">Share this project</p>
        <div>
          <ShareButtons />
        </div>
      </section>

      <nav className="case-pager" aria-label="More projects">
        <Link href={`/portfolio/${prev.slug}`} className="case-pager-link">
          <span className="eyebrow">← Previous project</span>
          <span className="case-pager-title">{prev.title}</span>
        </Link>
        <Link href={`/portfolio/${next.slug}`} className="case-pager-link is-next">
          <span className="eyebrow">Next project →</span>
          <span className="case-pager-title">
            {next.title}
            <span className="case-pager-arrow" aria-hidden>
              <ArrowUpRight />
            </span>
          </span>
        </Link>
      </nav>
    </>
  );
}
