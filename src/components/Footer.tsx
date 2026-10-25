import Link from "next/link";
import { nav, site } from "@/data/site";
import { ArrowUpRight, Social } from "@/components/Icons";
import { Logo } from "@/components/Logo";

// Footer: one centered statement with a single call to action, socials,
// a thin row of page links and the copyright bar.
export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-statement">
          <p className="eyebrow">Have a project in mind?</p>
          <h2>
            Let&apos;s work <em>together</em>
          </h2>
          <div className="foot-actions">
            <Link href="/contact" className="foot-btn">
              Get in touch
              <ArrowUpRight />
            </Link>
            <a href={`mailto:${site.email}`} className="foot-mail">
              {site.email}
            </a>
          </div>
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

        <nav className="foot-links" aria-label="Footer">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="foot-base">
          <p>© {new Date().getFullYear()} Darshika. All rights reserved.</p>
          <Link href="/" className="foot-logo" aria-label="Darshika home">
            <Logo className="is-dark" />
          </Link>
          <p className="foot-legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span aria-hidden>·</span>
            <Link href="/terms-of-use">Terms of Use</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
