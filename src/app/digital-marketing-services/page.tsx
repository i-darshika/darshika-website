import Image from "next/image";
import type { Metadata } from "next";
import { serviceDetails, serviceRoute, servicesPage } from "@/data/content";
import { PageTitle } from "@/components/Blocks";
import { FaqAccordion } from "@/components/Accordion";
import { ServiceCards, type ServiceCard } from "@/components/ServiceCards";
import Testimonials from "@/components/Testimonials";
export const metadata: Metadata = {
  title: "Digital Marketing Services",
  description:
    "SEO, social media marketing, graphic design and website building services by Darshika Raj.",
};

// First sentence of each service page's intro, plus its first four offerings.
const serviceCards: ServiceCard[] = servicesPage.rows.map((r) => {
  const href = serviceRoute(r.title);
  const d = serviceDetails.find((x) => href === `/${x.slug}`);
  const intro = d?.intro.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? r.lines.join(" ");
  return {
    num: r.num.replace(/^0(?=\d\d)/, ""),
    title: r.title,
    href,
    intro,
    offers: (d?.offerItems ?? []).slice(0, 4).map((o) => o.title),
  };
});
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
        <p className="eyebrow">My Services</p>
        <ServiceCards services={serviceCards} />
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
