import Link from "next/link";
import { site } from "@/data/site";
import { Social } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="bg-bg px-3 sm:px-[30px]">
      <div data-anim="fade-up" data-delay="0.4" className="relative overflow-hidden rounded-[30px] bg-card">
        <div className="wrap pb-16 pt-20 lg:pb-[80px] lg:pt-[130px]">
          <h2 className="relative text-[56px] font-medium uppercase leading-[1.2] sm:text-[96px] lg:text-[144px]">
            Get In Touch
            <span className="absolute -bottom-4 right-0 font-script text-[56px] font-extralight normal-case leading-none text-accent sm:text-[90px] lg:-bottom-6 lg:right-[6%] lg:text-[130px]">
              Connect
            </span>
          </h2>

          <div className="mt-20 grid gap-10 lg:mt-[196px] lg:grid-cols-[520px_1fr] lg:gap-[30px]">
            <p className="max-w-[520px] leading-[1.4] text-muted">I would be delighted to help you create your brand!</p>
            <div>
              <Link href="/contact" className="inline-block text-[44px] leading-[1.27] transition-colors hover:text-accent sm:text-6xl">
                Contact
              </Link>
              <a href={`mailto:${site.email}`} className="mt-6 block break-all text-lg text-white hover:text-accent">
                {site.email}
              </a>
              <div className="mt-[50px] flex gap-[10px]">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[#999] text-[#69727d] transition-colors hover:border-accent hover:text-accent"
                  >
                    <Social label={s.label} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
