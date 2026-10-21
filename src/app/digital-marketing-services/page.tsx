import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { serviceRoute, servicesPage } from "@/data/content";
import { PageTitle } from "@/components/Blocks";
import { FaqAccordion } from "@/components/Accordion";
import { ArrowUpRight } from "@/components/Icons";
import Testimonials from "@/components/Testimonials";
export const metadata: Metadata = { title: "Services" };
export default function ServicesPage() {
  const sp = servicesPage;
  return (
    <>
      <PageTitle title="Services" />
      <section className="wrap section-space services-statement">
        <div className="statement-images">
          {sp.floatImages.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              width={220}
              height={240}
              className={i % 2 ? "statement-image-lower" : ""}
            />
          ))}
        </div>
        <h2 dangerouslySetInnerHTML={{ __html: sp.statementHtml }} />
      </section>
      <section className="wrap services-list section-space">
        <p className="eyebrow">MY Services</p>
        <div>
          {sp.rows.map((r) => (
            <Link
              key={r.num}
              href={serviceRoute(r.title)}
              className="service-row"
            >
              <span className="card-index">{r.num}</span>
              <h2>{r.title}</h2>
              <p>
                {r.lines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </p>
              <span className="image-arrow">
                <ArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="light-section section-space">
        <div className="wrap">
          <div className="testimonial-layout">
            <div>
              <span className="eyebrow">Testimonials</span>
              <h2 className="display-heading">
                What my clients <em>have to say</em>
              </h2>
              <Image
                src={sp.patternImage}
                alt=""
                width={648}
                height={650}
                className="testimonial-pattern"
              />
            </div>
            <Testimonials items={sp.testimonials} />
          </div>
          <div className="stats-grid">
            {sp.stats.map(([n, label]) => (
              <div key={label}>
                <span>{n}</span>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap section-space faq-layout">
        <Image
          src={sp.faqImage}
          alt="Digital marketing services"
          width={495}
          height={819}
          className="faq-image"
        />
        <div>
          <span className="eyebrow">Questions &amp; Answers</span>
          <h2 className="display-heading">
            Providing clarity
            <br />
            <em>on frequently asked questions</em>
          </h2>
          <FaqAccordion items={sp.faq} />
        </div>
      </section>
    </>
  );
}
