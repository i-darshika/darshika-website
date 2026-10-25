import Link from "next/link";
import { serviceDetails, type ServiceDetail } from "@/data/content";
import { ArrowUpRight } from "@/components/Icons";

const pad = (n: number) => String(n).padStart(2, "0");

// Individual service page: text-only hero, open offer cards, editorial body copy,
// "why choose me" on a light band, other services and a closing call to action.
export function ServiceDetailPage({ s }: { s: ServiceDetail }) {
  const others = serviceDetails.filter((x) => x.slug !== s.slug);
  return (
    <>
      <section className="wrap svc-hero">
        <nav className="post-crumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/digital-marketing-services">Services</Link>
        </nav>
        <div className="svc-hero-grid">
          <h1>
            {s.titleLines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h1>
          <div className="svc-hero-side">
            <p>{s.intro}</p>
            <ul className="svc-tags">
              {s.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="svc-hero-actions">
              <Link href="/contact" className="button-primary">
                Start a project
                <ArrowUpRight />
              </Link>
              <a href="#offer" className="text-link">
                What&apos;s included
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
        <ol className="svc-strip" aria-label="Included in this service">
          {s.offerItems.map((o, i) => (
            <li key={o.title}>
              <span>{pad(i + 1)}</span>
              {o.title}
            </li>
          ))}
        </ol>
      </section>

      <section id="offer" className="wrap section-space svc-offer">
        <div className="svc-offer-head">
          <div>
            <p className="eyebrow">Services included</p>
            <h2 className="svc-section-title">{s.offerHeading}</h2>
          </div>
          <p className="svc-offer-text">{s.offerText}</p>
        </div>
        <div className={`svc-offer-grid${s.offerItems.length % 2 ? " is-odd" : ""}`}>
          {s.offerItems.map((o, i) => (
            <article key={o.title} className="svc-offer-card">
              <span className="svc-offer-num">{pad(i + 1)}</span>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap svc-body">
        <h2>
          My approach to <em>{s.bodyHeading.toLowerCase()}</em>
        </h2>
        <div>
          {s.body.map((b) => (
            <p key={b.slice(0, 24)}>{b}</p>
          ))}
        </div>
      </section>

      <section className="light-section section-space svc-why">
        <div className="wrap svc-why-grid">
          <div>
            <p className="eyebrow">Why work with me</p>
            <h2 className="display-heading">{s.whyHeading}</h2>
            <p className="svc-why-text">{s.whyText}</p>
          </div>
          <ul className="svc-why-list">
            {s.whyItems.map((w) => (
              <li key={w.title}>
                <span className="svc-check" aria-hidden>
                  ✓
                </span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section-space svc-others">
        <div className="post-more-head">
          <h2 className="display-heading">
            Other <em>services</em>
          </h2>
          <Link href="/digital-marketing-services" className="text-link">
            All Services
            <ArrowUpRight />
          </Link>
        </div>
        <div className="svc-others-grid">
          {others.map((o) => (
            <Link key={o.slug} href={`/${o.slug}`} className="svc-other">
              <span className="svc-other-arrow">
                <ArrowUpRight />
              </span>
              <h3>{o.title}</h3>
              <p>{o.tags.join(" · ")}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap svc-cta-wrap">
        <div className="svc-cta">
          <p className="eyebrow">Let&apos;s work together</p>
          <h2>
            Ready to grow with <em>{s.title.toLowerCase()}</em>?
          </h2>
          <Link href="/contact" className="button-primary">
            Get in touch
            <ArrowUpRight />
          </Link>
        </div>
      </section>
    </>
  );
}
