import Image from "next/image";
import type { Metadata } from "next";
import { about } from "@/data/content";
import { site } from "@/data/site";
import { DotTags, PageTitle, SectionHead } from "@/components/Blocks";
import GallerySlider from "@/components/GallerySlider";

export const metadata: Metadata = {
  title: { absolute: "Digital Marketing Expert | Freelance Digital Marketing Specialist" },
};

export default function AboutPage() {
  return (
    <>
      <PageTitle title="About Me" />
      <div className="h-[200px] bg-gradient-to-t from-bg from-20% to-transparent lg:mt-[190px] lg:h-[450px]" aria-hidden />

      <section className="wrap mt-[115px]">
        <div className="grid gap-8 lg:grid-cols-[333px_1fr] lg:gap-0">
          <p className="pl-[3px] text-sm font-medium uppercase tracking-[2px]">
            {"{ "}
            <span className="font-normal">Darshika raj</span>
            {" }"}
          </p>
          <h2 className="max-w-[960px] text-[28px] leading-[1.2] md:text-[40px]">{about.intro}</h2>
        </div>

        <div className="mt-[140px] grid gap-x-[30px] gap-y-[60px] px-[3px] md:grid-cols-2">
          {about.highlights.map((h) => (
            <div key={h.title}>
              <div className="h-[84px] border-b border-line-soft pt-[25px]">
                <span className="text-[34px] font-medium leading-[1.2] md:text-[46px]">{h.title}</span>
              </div>
              <h3 className="mt-[20px] text-xl text-muted">{h.text}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap mt-[140px]">
        <SectionHead
          label="My Certificates"
          tag="Accreditations"
          title={
            <>
              Certifications &amp;
              <br />
              Validations
            </>
          }
          link={{ label: "Explore LinkedIn", href: about.linkedin }}
        />
        <div className="mt-[60px] grid gap-10 lg:mt-[84px] lg:grid-cols-[443px_1fr] lg:gap-0">
          <div className="order-2 lg:order-1 lg:flex lg:items-end">
            <a
              href={about.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[110px] w-[254px] items-center gap-5 rounded-[200px] bg-card px-[15px] transition-colors hover:bg-[#2a292a] lg:ml-[3px]"
            >
              <Image src={site.favicon} alt="Darshika Raj" width={80} height={80} className="h-20 w-20 rounded-full object-cover" />
              <span>
                <span className="block text-[15px]">Darshika Raj</span>
                <span className="mt-[7px] block text-[15px] opacity-70">Digital Marketer</span>
              </span>
            </a>
          </div>
          <div className="order-1 lg:order-2">
            {about.certs.map((c) => (
              <div key={c.title} className="group relative border-t border-line-soft py-[41px] lg:h-[209px]">
                <h3 className="whitespace-nowrap text-[40px] font-medium leading-[1.2] md:text-[80px]">{c.title}</h3>
                <DotTags tags={c.tags} className="mt-[15px]" />
                {c.icon && (
                  <Image
                    src={c.icon}
                    alt=""
                    width={120}
                    height={120}
                    className="pointer-events-none absolute right-0 top-1/2 hidden h-[120px] w-[120px] -translate-y-1/2 object-contain opacity-0 transition-opacity group-hover:opacity-100 md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-[140px] pb-[150px] lg:mt-[284px]">
        <GallerySlider cards={about.gallery} />
      </section>
    </>
  );
}
