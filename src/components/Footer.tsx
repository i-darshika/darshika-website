import Link from "next/link";
import { nav, site } from "@/data/site";
import { serviceDetails } from "@/data/content";
import { ArrowUpRight, Social } from "@/components/Icons";
import { WordMarquee } from "@/components/Blocks";

// Compact footer: one-line call to action, then brand, pages, services and contact
// columns, and a slim copyright bar.
export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="foot-ticker">
        <WordMarquee words={["SEO", "Social Media", "Branding", "Graphic Design", "Websites", "Content"]} />
      </div>
      <div className="wrap">
        <div className="foot-hero">
          <div className="foot-hero-top">
            <p className="eyebrow">Have a project in mind?</p>
            <a href={`mailto:${site.email}`} className="foot-hero-mail">
              {site.email}
            </a>
          </div>
          <Link href="/contact" className="foot-big">
            <span className="foot-big-line">Let&apos;s create</span>
            <span className="foot-big-line">
              <em>something bold</em>
              <span className="foot-big-arrow" aria-hidden>
                <ArrowUpRight />
              </span>
            </span>
          </Link>
        </div>

        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="foot-logo">
              Darshika<span>.</span>
            </Link>
            <p>
              Digital marketer helping brands grow with SEO, social media,
              design and websites.
            </p>
            <div className="foot-socials">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  <Social label={s.label} />
                </a>
              ))}
            </div>
          </div>

          <nav className="foot-col" aria-label="Footer pages">
            <p className="eyebrow">Pages</p>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="foot-col" aria-label="Footer services">
            <p className="eyebrow">Services</p>
            <ul>
              {serviceDetails.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="foot-col">
            <p className="eyebrow">Contact</p>
            <ul>
              <li>
                <Link href="/contact">Send a message</Link>
              </li>
              <li>
                <a href={site.socials[1].href} target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </a>
              </li>
              <li className="foot-status">
                <span className="status-dot" aria-hidden />
                Available for freelance projects
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-base">
          <p>© {new Date().getFullYear()} Darshika Raj. All rights reserved.</p>
          <p>Freelance Digital Marketer</p>
        </div>
      </div>
    </footer>
  );
}
