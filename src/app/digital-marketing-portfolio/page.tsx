import Link from "next/link";
import type { Metadata } from "next";
import { portfolio } from "@/data/content";
import { PageTitle } from "@/components/Blocks";
import { ArrowUpRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Digital Marketing Portfolio",
  description:
    "Brand identity, social media, SEO and website projects by Darshika Raj, freelance digital marketer.",
};

const metaValue = (p: (typeof portfolio)[number], key: string) =>
  p.meta.find(([k]) => k === key)?.[1] ?? "";

const pad = (n: number) => String(n).padStart(2, "0");

const industries = new Set(portfolio.map((p) => metaValue(p, "Industry")));
const years = portfolio
  .map((p) => Number(metaValue(p, "Date").match(/\d{4}/)?.[0]))
  .filter(Boolean);
const yearRange =
  Math.min(...years) === Math.max(...years)
    ? String(years[0])
    : `${Math.min(...years)}–${Math.max(...years)}`;

export default function PortfolioPage() {
  return (
    <>
      <PageTitle title="My Portfolio" crumb="Portfolio" />
      <section className="wrap section-space portfolio-section">
        <div className="portfolio-stats">
          <div>
            <strong>{pad(portfolio.length)}</strong>
            <span>Brand projects</span>
          </div>
          <div>
            <strong>{pad(industries.size)}</strong>
            <span>Industries</span>
          </div>
          <div>
            <strong>{yearRange}</strong>
            <span>Active years</span>
          </div>
        </div>

        <div className="project-grid">
          {portfolio.map((p, i) => (
            <Link
              href={`/portfolio/${p.slug}`}
              key={p.slug}
              className="project-card"
            >
              <div className="project-card-top">
                <span className="project-card-num" aria-hidden>
                  {pad(i + 1)}
                </span>
                <span className="project-card-industry">
                  {metaValue(p, "Industry")}
                </span>
              </div>
              <p className="eyebrow project-card-kicker">{p.kicker}</p>
              <h2>{p.title}</h2>
              <p className="project-card-text">{p.overview[0]}</p>
              <ul className="project-card-tags" aria-label="Services">
                {p.services.map((s) => (
                  <li key={s.title}>{s.title}</li>
                ))}
              </ul>
              <div className="project-card-foot">
                <span className="project-card-date">
                  {metaValue(p, "Date")}
                  <span aria-hidden>·</span>
                  {metaValue(p, "Type")}
                </span>
                <span className="project-card-cta">
                  View Case Study
                  <span className="project-card-arrow">
                    <ArrowUpRight />
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
