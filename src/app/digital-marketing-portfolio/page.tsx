import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { portfolio } from "@/data/content";
import { PageTitle } from "@/components/Blocks";
import { ArrowUpRight } from "@/components/Icons";
export const metadata: Metadata = { title: "Portfolio Standard" };
export default function PortfolioPage() {
  return (
    <>
      <PageTitle title="My Portfolio" crumb="Portfolio Standard" />
      <section className="wrap section-space portfolio-section">
        <div className="work-grid">
          {portfolio.map((p, i) => (
            <Link
              href={`/portfolio/${p.slug}`}
              key={p.slug}
              className="work-card"
            >
              <div className="work-image">
                <Image
                  src={p.listImage}
                  alt={p.title}
                  width={800}
                  height={600}
                />
                <span className="image-arrow">
                  <ArrowUpRight />
                </span>
              </div>
              <div className="work-meta">
                <span>{p.published}</span>
                <span aria-hidden>0{i + 1}</span>
              </div>
              <h2>{p.title}</h2>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
