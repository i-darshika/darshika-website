import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { portfolio } from "@/data/content";
import { NumberedAccordion } from "@/components/Accordion";
import { ArticleHeader, ArticleLayout, RecentNews, ShareRow } from "@/components/Article";

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

  // Gallery: pairs of square shots, then any remaining image full width.
  const pairs = p.gallery.length % 2 === 0 ? p.gallery : p.gallery.slice(0, -1);
  const wide = p.gallery.length % 2 === 0 ? [] : p.gallery.slice(-1);

  return (
    <>
      <ArticleHeader title={p.title} date={p.published} />
      <ArticleLayout>
        <div className="lg:px-[15px]">
          <p className="pt-[60px] text-center text-lg font-light lg:pt-[170px]">{p.kicker}</p>
          <h2 className="mt-[10px] text-[40px] font-semibold leading-[1.2] md:text-[80px]">{p.tagline}</h2>
          <dl className="mt-[80px] grid grid-cols-2 gap-[30px] md:grid-cols-4 md:px-[3px]">
            {p.meta.map(([k, v]) => (
              <div key={k}>
                <dt className="text-lg">{k}</dt>
                <dd className="mt-[10px] text-[22px] font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <Image src={p.cover} alt={p.title} width={791} height={620} priority className="mt-[160px] aspect-[791/620] w-full rounded-[15px] object-cover" />
        </div>

        <div className="mt-[90px] grid gap-8 md:grid-cols-[310px_1fr] md:gap-[29px] md:px-[15px]">
          <h2 className="self-start text-[40px] font-medium leading-[1.2] md:text-5xl">{p.overviewHeading}</h2>
          <div className="pt-[30px]">
            {p.overview.map((t) => (
              <p key={t.slice(0, 20)} className="mb-[30px] leading-[1.4] text-muted">
                {t}
              </p>
            ))}
            <ul>
              {p.highlights.map((h, i) => (
                <li key={h} className={`pb-4 text-lg ${i < p.highlights.length - 1 ? "mb-[15px] border-b border-line" : ""}`}>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[55px] grid grid-cols-2 gap-[9px] md:px-[8px]">
          {pairs.map((src) => (
            <Image key={src} src={src} alt={`${p.title} work sample`} width={398} height={393} className="aspect-[398/393] w-full object-cover" />
          ))}
          {wide.map((src) => (
            <Image key={src} src={src} alt={`${p.title} work sample`} width={805} height={387} className="col-span-2 mt-[2px] w-full object-cover" />
          ))}
        </div>

        <div className="mt-[79px] grid gap-10 border-b border-line pb-[60px] md:grid-cols-[310px_1fr] md:gap-[165px] md:px-[15px]">
          <div className="pt-[53px]">
            <h2 className="text-[40px] font-medium leading-[1.2]">{p.aboutHeading}</h2>
            <p className="mt-[30px] leading-[1.4] text-muted">{p.aboutText}</p>
          </div>
          <NumberedAccordion items={p.services.map((s) => ({ title: s.title, items: s.items }))} defaultOpen={1} />
        </div>

        <ShareRow />
      </ArticleLayout>
      <RecentNews />
    </>
  );
}
