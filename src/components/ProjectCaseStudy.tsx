import Link from "next/link";
import { portfolio, serviceDetails, servicesPage, type Project } from "@/data/content";
import { ArrowUpRight } from "@/components/Icons";
import ShareButtons from "@/components/ShareButtons";

const pad = (n: number) => String(n).padStart(2, "0");

// Project service names → the matching service page (for descriptions and links).
const serviceSlug: Record<string, string> = {
  social: "social-media-marketing-services",
  search: "search-engine-optimization-service",
  web: "website-development-services",
  graphic: "graphic-designing-services",
};
const serviceFor = (title: string) =>
  serviceDetails.find((d) => d.slug === serviceSlug[title.toLowerCase().split(" ")[0]]);
const firstSentence = (t: string) => t.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? t;

// How each project was approached, step by step (wording adapts to the project).
const approach = (p: Project, industry: string) => [
  {
    title: "Discover",
    text: `Getting to know ${p.title}, its customers and the ${industry.toLowerCase()} market to find where the brand could stand out online.`,
  },
  {
    title: "Strategy",
    text: `Defining the brand direction, key messages and the channels — search, social and web — that would reach the right audience.`,
  },
  {
    title: "Create",
    text: `Designing the visual identity and producing the website, graphics and social content so every touchpoint feels consistent.`,
  },
  {
    title: "Launch & grow",
    text: `Publishing, monitoring performance and refining content and campaigns to keep the brand visible and engaging.`,
  },
];

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
  const industry = p.meta.find(([k]) => k === "Industry")?.[1] ?? "its";
  const steps = approach(p, industry);
  const more = [1, 2, 3].map((n) => portfolio[(index + n) % portfolio.length]);

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

      <section className="wrap section-space case-approach">
        <div className="case-approach-head">
          <p className="eyebrow">The approach</p>
          <h2 className="svc-section-title">
            How the project <em>came together</em>
          </h2>
        </div>
        <ol className="case-steps">
          {steps.map((st, i) => (
            <li key={st.title}>
              <span className="case-step-num">{pad(i + 1)}</span>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap case-services">
        <div className="post-more-head">
          <h2 className="display-heading">
            What I <em>delivered</em>
          </h2>
        </div>
        <div className="case-services-grid">
          {p.services.map((s, i) => {
            const d = serviceFor(s.title);
            return (
              <article key={s.title} className="case-service">
                <span className="case-service-num">{pad(i + 1)}</span>
                <h3>{s.title}</h3>
                {d && <p className="case-service-text">{firstSentence(d.intro)}</p>}
                <ul>
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                {d && (
                  <Link href={`/${d.slug}`} className="case-service-link">
                    About this service
                    <ArrowUpRight />
                  </Link>
                )}
              </article>
            );
          })}
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

      <section className={`wrap case-about${quote ? "" : " is-spaced"}`}>
        <div className="case-about-card">
          <span className="post-avatar post-avatar-lg" aria-hidden>
            DR
          </span>
          <div>
            <p className="eyebrow">{p.aboutHeading}</p>
            <p className="case-about-text">{p.aboutText}</p>
          </div>
          <div className="case-about-actions">
            <Link href="/contact" className="button-primary">
              Start a similar project
              <ArrowUpRight />
            </Link>
            <Link href="/digital-marketing-services" className="text-link">
              View services
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap section-space case-more">
        <div className="post-more-head">
          <h2 className="display-heading">
            More <em>projects</em>
          </h2>
          <Link href="/digital-marketing-portfolio" className="text-link">
            All Projects
            <ArrowUpRight />
          </Link>
        </div>
        <div className="case-more-grid">
          {more.map((m) => {
            const mi = portfolio.indexOf(m);
            return (
              <Link key={m.slug} href={`/portfolio/${m.slug}`} className="case-more-card">
                <div className="case-more-top">
                  <span className="case-more-num" aria-hidden>
                    {pad(mi + 1)}
                  </span>
                  <span className="case-more-arrow" aria-hidden>
                    <ArrowUpRight />
                  </span>
                </div>
                <h3>{m.title}</h3>
                <p>
                  {m.meta.find(([k]) => k === "Industry")?.[1]} ·{" "}
                  {m.meta.find(([k]) => k === "Date")?.[1]}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="wrap case-share">
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
