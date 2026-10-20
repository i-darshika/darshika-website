import Image from "next/image";
import Link from "next/link";
import { brands, homeServices, homeWork, resume, site, skills, traits } from "@/data/site";
import { postsByDate } from "@/data/content";
import { DotTags, SectionHead, WordMarquee } from "@/components/Blocks";
import { ArrowUpRight } from "@/components/Icons";

export default function Home() {
  const blog = postsByDate;

  return (
    <>
      {/* Hero: giant name with the photo sitting between the solid and outlined copies */}
      <section className="relative h-[620px] overflow-hidden sm:h-[760px] lg:h-[896px]">
        <div className="absolute inset-x-0 top-[180px] sm:top-[200px] lg:top-[228px]">
          <h1 data-anim="chars" className="text-center text-[22vw] font-semibold uppercase leading-none lg:text-[244.8px]">
            Darshika
          </h1>
        </div>
        <div className="absolute left-1/2 top-[120px] w-[88vw] max-w-[600px] -translate-x-1/2">
          <Image
            src="/wp/2025/01/g.fhkymb-2-e1737469914953.png"
            alt="Darshika Raj"
            width={600}
            height={628}
            priority
            className="h-auto w-full"
          />
          <div className="absolute inset-x-0 bottom-0 h-[126px] bg-gradient-to-t from-bg from-50% to-transparent" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-[180px] sm:top-[200px] lg:top-[228px]" aria-hidden>
          <p data-anim="chars" className="outline-text text-center text-[22vw] font-semibold uppercase leading-none lg:text-[244.8px]">
            Darshika
          </p>
        </div>
        <p className="wrap absolute inset-x-0 bottom-[60px] mx-auto max-w-[756px] text-center leading-[1.4] text-muted lg:bottom-[81px]">
          {site.intro}
        </p>
      </section>

      {/* Selected work */}
      <section className="wrap pb-[100px] lg:pb-[140px]">
        <SectionHead
          label="Selected Work"
          tag="2023 - 2025"
          title={
            <>
              My Work
              <br />& Portfolio
            </>
          }
          link={{ label: "View All Works", href: "/digital-marketing-portfolio" }}
          aside={
            <>
              Presence that last.
              <br />
              <span className="opacity-50">Creation that matters.</span>
            </>
          }
        />
        <div className="mt-[60px] grid gap-x-[30px] gap-y-[50px] md:grid-cols-2 lg:mt-[82px] lg:px-[3px]">
          {homeWork.map((w) => (
            <Link key={w.href} href={w.href} className="group block">
              <div className="overflow-hidden rounded-[10px]">
                <Image
                  src={w.image}
                  alt={w.title}
                  width={630}
                  height={460}
                  className="aspect-[630/460] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-[31px] flex items-center gap-[14px] text-sm font-light">
                {w.year}
                <span className="h-[5px] w-[5px] rounded-full bg-white" aria-hidden />
              </div>
              <h3 className="mt-2 text-[28px] font-medium leading-[1.2] transition-colors group-hover:text-accent">{w.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-gradient-to-b from-bg from-10% to-transparent" />
        <div className="wrap relative">
          <SectionHead
            label="My Expertise"
            tag="Services"
            title={
              <>
                How I can take your
                <br />
                business to the next level
              </>
            }
            link={{ label: "View All Services", href: "/digital-marketing-services" }}
          />
          <div className="mt-[60px] lg:ml-[443px] lg:mt-[136px]">
            {homeServices.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group flex items-center justify-between gap-6 border-t border-line-soft py-[41px] lg:min-h-[209px]"
              >
                <div>
                  <h3 className="text-[44px] font-medium leading-[1.2] transition-colors group-hover:text-accent md:text-[80px]">{s.title}</h3>
                  <DotTags tags={s.tags} className="mt-[15px]" />
                </div>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="wrap">
        <div className="border-t border-line pt-[141px]">
          <h2 className="text-center text-base uppercase">Partner with +150 brands</h2>
          <div className="mt-[70px] grid grid-cols-2 gap-[10px] sm:grid-cols-3 lg:grid-cols-5 lg:px-[5px]">
            {brands.map((b) => (
              <div key={b} className="flex h-[120px] items-center justify-center rounded-[80px] border border-line-soft lg:h-[162px]">
                <Image src={b} alt="Partner brand logo" width={100} height={60} className="h-[60px] w-[100px] object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Light panel: skills, traits marquee, education & experience */}
      <section className="mt-[155px] rounded-[30px] bg-light pb-[140px] pt-[140px] text-ink">
        <div className="wrap">
          <SectionHead
            tone="light"
            label="My Skills"
            tag="Tools"
            title={
              <>
                What are
                <br />
                my skills set
              </>
            }
            link={{ label: "View All Works", href: "/digital-marketing-portfolio" }}
          />
          <div className="mt-[60px] grid grid-cols-2 gap-[30px] sm:grid-cols-3 lg:mt-[84px] lg:grid-cols-5 lg:px-[3px]">
            {skills.map((s) => (
              <div key={s.name} className="text-center">
                <div className="flex h-[308px] flex-col items-center rounded-[150px] bg-light-2 pt-[60px]">
                  {s.icon ? (
                    <Image src={s.icon} alt={s.name} width={90} height={90} className="h-[90px] w-[90px] object-contain" />
                  ) : (
                    <span className="flex h-[90px] w-[90px] items-center justify-center rounded-full border-[6px] border-[#21759b] text-[44px] font-semibold text-[#21759b]">
                      W
                    </span>
                  )}
                  <p className="mt-10 text-5xl font-medium">{s.value}%</p>
                </div>
                <p className="mt-[29px] text-[22px] font-medium">{s.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[100px] lg:mt-[140px]">
          <WordMarquee words={traits} tone="light" />
        </div>

        <div className="wrap mt-[100px] lg:mt-[140px]">
          <SectionHead tone="light" label="About Me" tag="Darshika" title="Education & Experience" />
          <div className="mt-[60px] grid gap-12 md:grid-cols-3 md:gap-[30px] lg:mt-[80px] lg:px-[3px]">
            {resume.map((col) => (
              <div key={col.label}>
                <h3 className="text-sm opacity-80">{col.label}</h3>
                <ul className="mt-[39px] space-y-[39px]">
                  {col.items.map((it) => (
                    <li key={it.title + it.place}>
                      <p className="text-2xl font-medium leading-[1.2]">{it.title}</p>
                      <p className="mt-[10px] text-sm text-ink-soft opacity-80">{it.place}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="wrap pb-[300px] pt-[140px]">
        <SectionHead
          label="My Blogs"
          tag="Insights"
          title={
            <>
              Digital Marketing
              <br />
              Blogs &amp; Articles
            </>
          }
          link={{ label: "View All Blogs", href: "/blog" }}
        />
        <div className="mt-[60px] grid gap-[50px] md:grid-cols-3 lg:mt-[83px]">
          {blog.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-[15px]">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={399}
                  height={350}
                  className="aspect-[399/350] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/40" aria-hidden />
              </div>
              <h3 className="mt-[29px] text-[28px] leading-[1.2] transition-colors group-hover:text-accent">{p.title}</h3>
              <p className="mt-[9px] text-sm font-light uppercase text-accent">Blog</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
