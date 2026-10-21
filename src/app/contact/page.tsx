import type { Metadata } from "next";
import { site } from "@/data/site";
import { PageTitle } from "@/components/Blocks";
import ContactForm from "@/components/ContactForm";
import { ArrowUpRight } from "@/components/Icons";
export const metadata: Metadata = { title: "Contact" };
export default function ContactPage() {
  return (
    <>
      <PageTitle title="Get In Touch" crumb="Contact" />
      <section className="wrap section-space contact-layout">
        <div className="contact-copy">
          <h2>
            Let&apos;s make your brand <em>brilliant!</em>
          </h2>
          <p>
            If you would like to work with me or just want to get in touch,
            I&apos;d love to hear from you!
          </p>
          <div className="contact-email">
            <h3>Email</h3>
            <a href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight />
            </a>
          </div>
          <div className="contact-socials">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
                <ArrowUpRight />
              </a>
            ))}
          </div>
        </div>
        <div className="contact-form-panel">
          <span className="eyebrow">Send a message</span>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
