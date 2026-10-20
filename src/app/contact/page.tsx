import type { Metadata } from "next";
import { site } from "@/data/site";
import { PageTitle } from "@/components/Blocks";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageTitle title="Get In Touch" crumb="Contact" />
      <section className="wrap grid gap-16 pb-[140px] pt-[200px] lg:grid-cols-2 lg:gap-[30px] lg:pt-[238px]">
        <div className="lg:pl-[3px] lg:pt-[38px]">
          <h2 className="max-w-[520px] text-[40px] font-medium uppercase leading-[1.2] md:text-[54px]">
            Let&apos;s make your
            <br />
            brand <span className="font-extralight">brilliant!</span>
          </h2>
          <p className="mt-[19px] max-w-[520px] leading-[1.4] text-muted">
            If you would like to work with me or just want to get in touch, I&apos;d love to hear from you!
          </p>
          <div className="mt-[50px] pl-[15px]">
            <h3 className="text-[22px] font-medium">Email</h3>
            <a href={`mailto:${site.email}`} className="mt-4 block text-muted hover:text-accent">
              {site.email}
            </a>
          </div>
          <div className="mt-[61px] flex flex-wrap gap-x-[33px] gap-y-3">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="border-b border-transparent hover:border-accent hover:text-accent">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="lg:pt-0">
          <h2 className="text-base uppercase">
            Send a <span className="font-extralight">message</span>
          </h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
