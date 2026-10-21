import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { portfolio } from "@/data/content";
import { NumberedAccordion } from "@/components/Accordion";
import {
  ArticleHeader,
  ArticleLayout,
  RecentNews,
  ShareRow,
} from "@/components/Article";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = portfolio.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.overview[0] } : {};
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = portfolio.find((x) => x.slug === slug);
  if (!p) notFound();
  const pairs = p.gallery.length % 2 === 0 ? p.gallery : p.gallery.slice(0, -1),
    wide = p.gallery.length % 2 === 0 ? [] : p.gallery.slice(-1);
  return (
    <>
      <ArticleHeader title={p.title} date={p.published} />
      <ArticleLayout>
        <div className="project-intro">
          <p className="eyebrow">{p.kicker}</p>
          <h2>{p.tagline}</h2>
          <dl className="project-meta">
            {p.meta.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <Image
            src={p.cover}
            alt={p.title}
            width={791}
            height={620}
            priority
            className="project-cover"
          />
        </div>
        <div className="project-overview">
          <h2>{p.overviewHeading}</h2>
          <div>
            {p.overview.map((t) => (
              <p key={t.slice(0, 20)}>{t}</p>
            ))}
            <ul>
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="project-gallery">
          {pairs.map((src) => (
            <Image
              key={src}
              src={src}
              alt={`${p.title} work sample`}
              width={398}
              height={393}
            />
          ))}
          {wide.map((src) => (
            <Image
              key={src}
              src={src}
              alt={`${p.title} work sample`}
              width={805}
              height={387}
              className="gallery-wide"
            />
          ))}
        </div>
        <div className="project-services">
          <div>
            <h2>{p.aboutHeading}</h2>
            <p>{p.aboutText}</p>
          </div>
          <NumberedAccordion
            items={p.services.map((s) => ({ title: s.title, items: s.items }))}
            defaultOpen={1}
          />
        </div>
        <ShareRow />
      </ArticleLayout>
      <RecentNews />
    </>
  );
}
