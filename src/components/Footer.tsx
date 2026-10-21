import Link from "next/link";
import { site } from "@/data/site";
import { ArrowUpRight, Social } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <span className="eyebrow">Connect</span>
            <h2>
              Get In <em>Touch</em>
            </h2>
          </div>
          <Link href="/contact" className="footer-arrow" aria-label="Contact">
            <ArrowUpRight />
          </Link>
        </div>
        <div className="footer-bottom">
          <p>I would be delighted to help you create your brand!</p>
          <div className="footer-contact">
            <Link href="/contact">
              Contact
              <ArrowUpRight />
            </Link>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="footer-socials">
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
        <div className="footer-word" aria-hidden>
          DARSHIKA.
        </div>
      </div>
    </footer>
  );
}
