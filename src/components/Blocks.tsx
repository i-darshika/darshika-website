import Link from "next/link";
import { ArrowUpRight } from "@/components/Icons";

// Section opener used across the site: thin rule, label row, then a heading offset to the second column.
export function SectionHead({
  label,
  tag,
  title,
  aside,
  link,
  tone = "dark",
  className = "",
}: {
  label: string;
  tag: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  link?: { label: string; href: string };
  tone?: "dark" | "light";
  className?: string;
}) {
  const ink = tone === "light" ? "text-ink" : "text-white";
  return (
    <div className={`border-t pt-[31px] ${tone === "light" ? "border-black/15" : "border-line"} ${className}`}>
      <div className={`flex items-start justify-between gap-6 ${ink}`}>
        <h2 className="text-base uppercase leading-[1.4]">{label}</h2>
        <p className="text-sm font-medium uppercase tracking-[2px]">
          {"{ "}
          <span className="font-normal">{tag}</span>
          {" }"}
        </p>
      </div>
      <div className={`mt-12 flex flex-col gap-8 lg:mt-[60px] lg:flex-row lg:gap-[30px] lg:pl-[333px] ${ink}`}>
        <div className={aside ? "lg:w-[520px]" : "lg:w-[740px]"}>
          <h2 className="text-[40px] font-medium leading-[1.2] md:text-[54px]">{title}</h2>
          {link && (
            <Link href={link.href} className="group mt-4 inline-flex items-center gap-2 text-[15px] font-light">
              <span className="border-b border-current pb-0.5">{link.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
        {aside && <div className="text-lg leading-[1.4] lg:w-[410px]">{aside}</div>}
      </div>
    </div>
  );
}

// Big inner-page title with the optional "( Pages - Current )" breadcrumb.
export function PageTitle({ title, crumb }: { title: string; crumb?: string }) {
  return (
    <section className="wrap pt-[150px] lg:pt-[180px]">
      <h1 data-anim="chars" className="text-center text-[56px] font-medium leading-[1.2] sm:text-[80px] lg:text-[110px]">
        {title}
      </h1>
      {crumb && (
        <p className="mt-5 text-center text-base uppercase">
          ( <Link href="/" className="hover:text-accent">Pages</Link> <span className="mx-1">-</span>{" "}
          <span className="text-accent">{crumb}</span> )
        </p>
      )}
    </section>
  );
}

// Inline row of small tags separated by dots, as on the services lists.
export function DotTags({ tags, className = "" }: { tags: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-[18px] gap-y-2 text-sm font-light ${className}`}>
      {tags.map((t, i) => (
        <span key={t + i} className="flex items-center gap-[18px]">
          {i > 0 && <span className="h-[5px] w-[5px] rounded-full bg-current opacity-60" aria-hidden />}
          {t}
        </span>
      ))}
    </div>
  );
}

// Infinite horizontal strip of huge words, alternating solid and outlined.
export function WordMarquee({ words, tone = "dark" }: { words: string[]; tone?: "dark" | "light" }) {
  const row = [...words, ...words, ...words];
  return (
    <div className="overflow-hidden" aria-label={words.join(", ")}>
      <div className="marquee flex w-max gap-[50px]" aria-hidden>
        {[...row, ...row].map((w, i) => (
          <span
            key={i}
            className={`whitespace-nowrap text-[72px] font-semibold leading-[1.2] md:text-[144px] ${
              i % 2 ? (tone === "light" ? "outline-ink" : "outline-text") : tone === "light" ? "text-black" : "text-white"
            }`}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
