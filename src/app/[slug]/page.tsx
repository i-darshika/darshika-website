import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatDate, posts, serviceDetails, type Post, type ServiceDetail } from "@/data/content";
import { NumberedAccordion } from "@/components/Accordion";
import { ArticleHeader, ArticleLayout, RecentNews, ShareRow } from "@/components/Article";
import { ArrowUpRight } from "@/components/Icons";

// Service detail pages and blog posts share the site's top-level slugs, as on WordPress.
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...serviceDetails.map((s) => ({ slug: s.slug })), ...posts.map((p) => ({ slug: p.slug }))];
}

const serviceTitles: Record<string, string> = {
  "search-engine-optimization-service": "SEO Expert | Best SEO Services for Website Ranking & Optimization",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceDetails.find((s) => s.slug === slug);
  if (service) return { title: { absolute: serviceTitles[slug] ?? `${service.title} Service Page - darshikaraj.com` }, description: service.intro };
  const post = posts.find((p) => p.slug === slug);
  return post ? { title: { absolute: post.title }, description: post.excerpt } : {};
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const service = serviceDetails.find((s) => s.slug === slug);
  if (service) return <ServicePage s={service} />;
  const post = posts.find((p) => p.slug === slug);
  if (post) return <PostPage p={post} />;
  notFound();
}

function ServicePage({ s }: { s: ServiceDetail }) {
  return (
    <>
      <section className="wrap pt-[130px] lg:pt-[140px]">
        <h1 className="text-[44px] font-semibold leading-[1.2] md:text-[80px]">
          {s.titleLines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h1>
        <div className="mt-[30px] grid gap-8 lg:grid-cols-[333px_520px_1fr] lg:gap-[0px]">
          <div className="hidden lg:block" />
          <p className="leading-[1.4] text-muted">{s.intro}</p>
          <ul className="text-lg leading-[1.4] lg:pl-[62px]">
            {s.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        {s.image && (
          <Image src={s.image} alt={s.title} width={1296} height={865} priority className="mt-[80px] w-full rounded-[15px]" />
        )}
      </section>

      <section className="wrap pb-[75px] pt-[80px]">
        <div className="mx-auto max-w-[726px]">
          <h2 className="text-[32px] font-medium leading-[1.2] md:text-[40px]">{s.offerHeading}</h2>
          <p className="mt-[30px] leading-[1.4] text-muted">{s.offerText}</p>
          <div className="mt-[50px]">
            <NumberedAccordion items={s.offerItems} />
          </div>
        </div>

        <div className="mx-auto mt-[218px] max-w-[740px] space-y-[30px] leading-[1.4] text-muted">
          {s.body.map((b) => (
            <p key={b.slice(0, 20)}>{b}</p>
          ))}
        </div>

        <div className="mx-auto mt-[230px] max-w-[740px]">
          <h2 className="text-[32px] font-medium leading-[1.2] md:text-[40px]">{s.whyHeading}</h2>
          <p className="mt-[30px] leading-[1.4] text-muted">{s.whyText}</p>
          <div className="mt-[50px]">
            <NumberedAccordion items={s.whyItems} />
          </div>
        </div>

        <div className="mt-[80px] flex justify-center">
          <Link href="/digital-marketing-services" className="group flex items-center">
            <span className="flex h-10 items-center rounded-[30px] bg-accent px-[26px] text-[15px] font-medium text-ink">View all services</span>
            <span className="-ml-px flex h-10 w-10 items-center justify-center rounded-full bg-accent text-ink transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

function PostPage({ p }: { p: Post }) {
  return (
    <>
      <ArticleHeader title={p.title} date={formatDate(p.date)} />
      <ArticleLayout>
        <div className="lg:pl-[3px] lg:pt-[50px]">
          <div className="prose-wp" dangerouslySetInnerHTML={{ __html: p.html }} />
          <ShareRow />
        </div>
      </ArticleLayout>
      <RecentNews />
    </>
  );
}
