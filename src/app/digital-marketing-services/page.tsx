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
      <div className="h-[200px] bg-gradient-to-t from-bg from-20% to-transparent lg:mt-[190px] lg:h-[450px]" aria-hidden />

      {/* Statement with two floating images */}
      <section className="wrap relative mt-[115px] pb-[140px]">
        <Image src={sp.floatImages[1]} alt="" width={172} height={184} className="absolute right-[7%] top-[-25px] hidden rounded-[5px] lg:block" />
        <Image src={sp.floatImages[0]} alt="" width={172} height={184} className="absolute bottom-[100px] left-[6%] hidden rounded-[5px] lg:block" />
        <h2
          className="mx-auto max-w-[1070px] text-center text-[32px] leading-[1.2] md:text-[55px] [&_span]:font-semibold"
          dangerouslySetInnerHTML={{ __html: sp.statementHtml }}
        />
      </section>

      {/* Numbered service rows on the darker band */}
      <section className="bg-bg-deep pb-[140px]">
        <div className="wrap">
          <p className="text-center text-sm font-medium uppercase tracking-[2px]">
            {"{ "}
            <span className="font-normal">MY Services</span>
            {" }"}
          </p>
          <div className="mt-[30px] border-b border-white/20">
            {sp.rows.map((r, i) => {
              const odd = i % 2 === 0;
              const lines = (
                <p className="text-base leading-[1.4] text-muted transition-colors group-hover:text-ink">
                  {r.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>
              );
              const title = <h2 className="text-[28px] font-semibold uppercase leading-[1.1] md:text-[43px]">{r.title}</h2>;
              return (
                <Link
                  key={r.num}
                  href={serviceRoute(r.title)}
                  className="group grid items-center gap-4 border-t border-white/20 px-[15px] py-[26px] transition-colors hover:bg-light hover:text-ink md:grid-cols-[216px_402px_402px_1fr] md:gap-[30px] md:py-[25px] lg:min-h-[174px]"
                >
                  <span className="text-lg">{r.num}</span>
                  {odd ? lines : title}
                  {odd ? title : lines}
                  <span className="hidden h-[60px] w-[60px] items-center justify-center justify-self-end rounded-full border border-current md:flex">
                    <ArrowUpRight className="h-6 w-6" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Light testimonials panel */}
      <section className="rounded-[30px] bg-light pb-[140px] pt-[140px] text-ink">
        <div className="wrap">
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-[15px]">
            <div className="lg:pl-[3px]">
              <h2 className="text-base uppercase">Testimonials</h2>
              <h3 className="mt-[30px] max-w-[630px] text-[44px] font-medium leading-[1.2] md:text-[70px]">What my clients have to say</h3>
            </div>
            <Image src={sp.patternImage} alt="" width={648} height={650} className="hidden w-full rounded-[15px] lg:block" />
            <div className="lg:absolute lg:left-[-12px] lg:top-[300px]">
              <Testimonials items={sp.testimonials} />
            </div>
          </div>

          <div className="mt-[100px] grid gap-10 md:grid-cols-3 md:gap-[30px] lg:mt-[286px] lg:pl-[3px]">
            {sp.stats.map(([n, label]) => (
              <div key={label} className="flex items-center gap-[29px]">
                <span className="text-6xl font-medium leading-[1.2]">{n}</span>
                <span className="whitespace-pre-line text-lg leading-[1.4]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap grid gap-12 pb-[140px] pt-[140px] lg:grid-cols-[495px_1fr] lg:gap-[80px] lg:px-[15px]">
        <Image src={sp.faqImage} alt="Digital marketing services" width={495} height={819} className="hidden w-full lg:block" />
        <div className="pt-[30px]">
          <h2 className="text-base uppercase">Questions &amp; Answers</h2>
          <h3 className="mt-[15px] text-[40px] font-medium leading-[1.2] md:text-[54px]">
            Providing clarity
            <br />
            on frequently asked questions
          </h3>
          <div className="mt-[60px] lg:mx-[59px]">
            <FaqAccordion items={sp.faq} />
          </div>
        </div>
      </section>
    </>
  );
}
