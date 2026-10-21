import Image from "next/image";
import Link from "next/link";
import {
  brands,
  homeServices,
  homeWork,
  resume,
  site,
  skills,
  traits,
} from "@/data/site";
import { postsByDate } from "@/data/content";
import { DotTags, SectionHead, WordMarquee } from "@/components/Blocks";
import { ArrowUpRight } from "@/components/Icons";

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            Digital Marketer
          </div>
          <h1 className="hero-name">
            Darshika
            <span className="hero-asterisk" aria-hidden>
              ✳
            </span>
          </h1>
          <p className="hero-statement">
            Presence that last.
            <br />
            <em>Creation that matters.</em>
          </p>
          <p className="hero-intro">{site.intro}</p>
          <div className="hero-actions">
            <Link
              href="/digital-marketing-portfolio"
              className="button-primary"
            >
              View All Works
              <ArrowUpRight />
            </Link>
            <Link href="/contact" className="text-link">
              Contact
              <ArrowUpRight />
            </Link>
          </div>
          <div className="hero-socials">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="hero-art">
          <div className="portrait-orbit" aria-hidden />
          <div className="portrait-panel">
            <span className="portrait-watermark" aria-hidden>
              DR.
            </span>
            <Image
              src="/wp/2025/01/g.fhkymb-2-e1737469914953.png"
              alt="Darshika Raj"
              width={600}
              height={628}
              priority
              className="hero-portrait"
            />
          </div>
          <div className="portrait-caption">
            <span>Darshika Raj</span>
            <span>
              Digital Marketer
              <ArrowUpRight />
            </span>
          </div>
          <span className="portrait-spark" aria-hidden>
            ✳
          </span>
        </div>
      </section>
      <div className="trait-band">
        <WordMarquee words={traits} />
      </div>
      <section className="section-space wrap">
        <SectionHead
          label="Selected Work"
          tag="2023 - 2025"
          title={
            <>
              My Work <em>&amp; Portfolio</em>
            </>
          }
          link={{
            label: "View All Works",
            href: "/digital-marketing-portfolio",
          }}
          aside={
            <>
              Presence that last.
              <br />
              Creation that matters.
            </>
          }
        />
        <div className="work-grid">
          {homeWork.map((w, i) => (
            <Link href={w.href} key={w.href} className="work-card group">
              <div className="work-image">
                <Image
                  src={w.image}
                  alt={w.title}
                  width={800}
                  height={600}
                  className="object-cover"
                />
                <span className="image-arrow">
                  <ArrowUpRight />
                </span>
              </div>
              <div className="work-meta">
                <span>{w.year}</span>
                <span aria-hidden>0{i + 1}</span>
              </div>
              <h3>{w.title}</h3>
            </Link>
          ))}
        </div>
      </section>
      <section className="expertise-section section-space">
        <div className="wrap">
          <SectionHead
            label="My Expertise"
            tag="Services"
            title={
              <>
                How I can take your business <em>to the next level</em>
              </>
            }
            link={{
              label: "View All Services",
              href: "/digital-marketing-services",
            }}
          />
          <div className="expertise-grid">
            {homeServices.map((s, i) => (
              <Link href={s.href} key={s.title} className="expertise-card">
                <span className="card-index">0{i + 1}</span>
                <ArrowUpRight className="expertise-arrow" />
                <h3>{s.title}</h3>
                <DotTags tags={s.tags} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="brands-section wrap">
        <h2 className="eyebrow">Partner with +150 brands</h2>
        <div className="brand-grid">
          {brands.map((b) => (
            <div key={b}>
              <Image src={b} alt="Partner brand logo" width={110} height={65} />
            </div>
          ))}
        </div>
      </section>
      <section className="light-section section-space">
        <div className="wrap">
          <SectionHead
            tone="light"
            label="My Skills"
            tag="Tools"
            title={
              <>
                What are <em>my skills set</em>
              </>
            }
            link={{
              label: "View All Works",
              href: "/digital-marketing-portfolio",
            }}
          />
          <div className="skills-grid">
            {skills.map((s) => (
              <div key={s.name} className="skill-card">
                {s.icon ? (
                  <Image src={s.icon} alt={s.name} width={64} height={64} />
                ) : (
                  <span className="wordpress-mark">W</span>
                )}
                <p className="skill-value">
                  {s.value}
                  <span>%</span>
                </p>
                <div className="skill-meter" aria-hidden>
                  <span style={{ width: `${s.value}%` }} />
                </div>
                <p className="skill-name">{s.name}</p>
              </div>
            ))}
          </div>
          <div className="experience-block">
            <SectionHead
              tone="light"
              label="About Me"
              tag="Darshika"
              title={
                <>
                  Education <em>&amp; Experience</em>
                </>
              }
            />
            <div className="resume-grid">
              {resume.map((col) => (
                <div key={col.label} className="resume-column">
                  <h3>{col.label}</h3>
                  <ul>
                    {col.items.map((it) => (
                      <li key={it.title + it.place}>
                        <p>{it.title}</p>
                        <span>{it.place}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section-space wrap">
        <SectionHead
          label="My Blogs"
          tag="Insights"
          title={
            <>
              Digital Marketing <em>Blogs &amp; Articles</em>
            </>
          }
          link={{ label: "View All Blogs", href: "/blog" }}
        />
        <div className="news-grid">
          {postsByDate.map((p) => (
            <Link href={`/${p.slug}`} key={p.slug} className="news-card">
              <div className="news-image">
                <Image src={p.image} alt={p.title} width={500} height={360} />
                <span className="image-arrow">
                  <ArrowUpRight />
                </span>
              </div>
              <p className="eyebrow">Blog</p>
              <h3>{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
