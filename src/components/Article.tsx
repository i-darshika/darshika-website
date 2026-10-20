import Image from "next/image";
import Link from "next/link";
import { postsByDate, formatDate } from "@/data/content";
import { site } from "@/data/site";
import { Search, Social } from "@/components/Icons";

// Title + author row shared by blog posts and portfolio case studies.
// The title block is bottom-anchored so one- and two-line titles end at the same height.
export function ArticleHeader({ title, date, label = "Published" }: { title: string; date: string; label?: string }) {
  return (
    <section className="wrap">
      <div className="flex min-h-[260px] flex-col justify-end lg:h-[647px]">
        <h1 className="max-w-[1019px] text-[40px] font-medium leading-[1.2] md:text-[55px] lg:ml-[-7px]">{title}</h1>
      </div>
      <div className="mt-[38px] flex flex-wrap items-center gap-x-[70px] gap-y-4 lg:ml-[-7px]">
        <div className="flex items-center gap-5">
          <Image src={site.favicon} alt="Darshika" width={60} height={60} className="h-[60px] w-[60px] rounded-full bg-card object-cover" />
          <div>
            <p className="text-lg font-medium text-white/70">Author</p>
            <p className="mt-1">Darshika</p>
          </div>
        </div>
        <div className="self-end pb-[3px]">
          <p className="text-lg font-medium text-white/70">{label}</p>
          <p className="mt-1 font-nav font-medium">{date}</p>
        </div>
      </div>
    </section>
  );
}

// Two-column body: 818px article, 375px sidebar.
export function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="wrap grid gap-16 pb-[140px] pt-[100px] lg:grid-cols-[818px_375px] lg:justify-between lg:gap-0 lg:pt-[140px]">
      <article className="min-w-0">{children}</article>
      <div className="lg:pt-[30px]">
        <Sidebar />
      </div>
    </section>
  );
}

export function Sidebar() {
  return (
    <aside className="space-y-[50px]">
      <form action="/blog" className="relative">
        <input
          name="s"
          placeholder="Search…"
          aria-label="Search articles"
          className="h-[57px] w-full rounded-[100px] border border-white/40 bg-transparent px-6 pr-14 outline-none placeholder:text-muted focus:border-accent"
        />
        <button type="submit" aria-label="Search" className="absolute right-5 top-1/2 -translate-y-1/2 text-white/80">
          <Search />
        </button>
      </form>

      <div className="border-t border-white/[0.08] pt-[21px]">
        <h2 className="text-[22px] font-medium">Follow Me</h2>
        <a
          href={site.socials[1].href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[30px] flex h-[51px] items-center gap-3 rounded-[20px] bg-[#151515] px-[25px] text-[15px] font-semibold hover:text-accent"
        >
          <Social label="LinkedIn" />
          LinkedIn
        </a>
      </div>

      <div className="border-t border-white/[0.08] pt-[21px]">
        <h2 className="text-[22px] font-medium">Latest Posts</h2>
        <ul className="mt-[30px] space-y-[30px]">
          {[...postsByDate].reverse().map((p) => {
            const d = new Date(p.date);
            return (
              <li key={p.slug} className="flex gap-[25px]">
                <Link href={`/${p.slug}`} className="relative block h-[100px] w-[90px] shrink-0 overflow-hidden rounded-[5px]">
                  <Image src={p.image} alt="" width={90} height={100} className="h-full w-full object-cover" />
                  <span className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-sm leading-tight">
                    <span>{d.getDate()}</span>
                    <span>{d.toLocaleDateString("en-US", { month: "short" })}</span>
                  </span>
                </Link>
                <div>
                  <span className="inline-block rounded-[30px] bg-white/[0.03] px-3 py-1 text-xs">Blog</span>
                  <Link href={`/${p.slug}`} className="mt-2 block text-[17px] font-medium leading-[1.25] hover:text-accent">
                    {p.title}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export function RecentNews() {
  return (
    <section className="wrap pb-[140px]">
      <div className="border-y border-line pb-[140px] pt-[140px]">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-[40px] font-medium leading-[1.2] md:text-[54px]">Recent News</h2>
          <Link href="/blog" className="flex h-[47px] items-center rounded-[30px] border border-white/30 px-[26px] text-sm font-medium hover:border-accent hover:text-accent">
            All Articles
          </Link>
        </div>
        <div className="mt-[90px] grid gap-[100px] md:grid-cols-3">
          {[...postsByDate].reverse().map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className="group block">
              <div className="flex items-center justify-between text-[13px] uppercase">
                <span className="flex items-center gap-2">
                  <Image src={site.favicon} alt="" width={40} height={40} className="h-10 w-10 rounded-full bg-card object-cover" />
                  Darshika
                </span>
                <span>{formatDate(p.date)}</span>
              </div>
              <div className="mt-[35px] overflow-hidden rounded-[15px]">
                <Image src={p.image} alt={p.title} width={365} height={285} className="aspect-[365/285] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="mt-6 text-2xl leading-[1.25] transition-colors group-hover:text-accent">{p.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ShareRow() {
  return (
    <div className="mt-[50px] flex flex-wrap items-center justify-between gap-4 border-t border-black/15 pt-[50px]">
      <p className="text-sm text-white/70">Tags :</p>
      <div className="flex items-center gap-[5px]">
        <span className="mr-1 text-sm text-white/70">Share :</span>
        {site.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="flex h-[33px] w-[33px] items-center justify-center rounded-full bg-white/[0.02] hover:text-accent"
          >
            <Social label={s.label} className="h-3.5 w-3.5" />
          </a>
        ))}
      </div>
    </div>
  );
}
