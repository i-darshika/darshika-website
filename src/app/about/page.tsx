import Image from "next/image";
import type { Metadata } from "next";
import { about } from "@/data/content";
import { site } from "@/data/site";
import { DotTags, PageTitle, SectionHead } from "@/components/Blocks";
import GallerySlider from "@/components/GallerySlider";
export const metadata: Metadata = {
  title: {
    absolute:
      "Digital Marketing Expert | Freelance Digital Marketing Specialist",
  },
};
export default function AboutPage() {
  return (
    <>
      <PageTitle title="About Me" />
      <section className="wrap section-space about-intro">
        <div className="about-portrait">
          <Image
            src="/wp/2025/01/g.fhkymb-2-e1737469914953.png"
            alt="Darshika Raj"
            width={600}
            height={628}
            priority
          />
          <span className="about-spark" aria-hidden>
            ✳
          </span>
        </div>
        <div>
          <span className="eyebrow">Darshika raj</span>
          <h2>{about.intro}</h2>
        </div>
      </section>
      <section className="wrap about-highlights">
        {about.highlights.map((h, i) => (
          <div key={h.title}>
            <span className="card-index" aria-hidden>
              0{i + 1}
            </span>
            <h3>{h.title}</h3>
            <p>{h.text}</p>
          </div>
        ))}
      </section>
      <section className="light-section section-space">
        <div className="wrap">
          <SectionHead
            tone="light"
            label="My Certificates"
            tag="Accreditations"
            title={
              <>
                Certifications <em>&amp; Validations</em>
              </>
            }
            link={{ label: "Explore LinkedIn", href: about.linkedin }}
          />
          <div className="cert-layout">
            <a
              href={about.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-card"
            >
              <Image
                src={site.favicon}
                alt="Darshika Raj"
                width={80}
                height={80}
              />
              <div>
                <span>Darshika Raj</span>
                <p>Digital Marketer</p>
              </div>
            </a>
            <div>
              {about.certs.map((c) => (
                <div key={c.title} className="cert-row">
                  <div>
                    <h3>{c.title}</h3>
                    <DotTags tags={c.tags} />
                  </div>
                  {c.icon && (
                    <Image src={c.icon} alt="" width={70} height={70} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section-space gallery-section">
        <GallerySlider cards={about.gallery} />
      </section>
    </>
  );
}
