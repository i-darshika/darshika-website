import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  formatDate,
  posts,
  serviceDetails,
  type Post,
  type ServiceDetail,
} from "@/data/content";
import { NumberedAccordion } from "@/components/Accordion";
import {
  ArticleHeader,
  ArticleLayout,
  RecentNews,
  ShareRow,
} from "@/components/Article";
import { ArrowUpRight } from "@/components/Icons";

// Service detail pages and blog posts share the site's top-level slugs, as on WordPress.
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...serviceDetails.map((s) => ({ slug: s.slug })),
    ...posts.map((p) => ({ slug: p.slug })),
  ];
}

const serviceTitles: Record<string, string> = {
  "search-engine-optimization-service":
    "SEO Expert | Best SEO Services for Website Ranking & Optimization",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceDetails.find((s) => s.slug === slug);
  if (service)
    return {
      title: {
        absolute:
          serviceTitles[slug] ??
          `${service.title} Service Page - darshikaraj.com`,
      },
      description: service.intro,
    };
  const post = posts.find((p) => p.slug === slug);
  return post
    ? { title: { absolute: post.title }, description: post.excerpt }
    : {};
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
      <section className="wrap service-detail-header">
        <span className="eyebrow">Services</span>
        <h1>
          {s.titleLines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </h1>
        <div className="service-detail-intro">
          <p>{s.intro}</p>
          <ul>
            {s.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        {s.image && (
          <Image
            src={s.image}
            alt={s.title}
            width={1296}
            height={865}
            priority
            className="service-detail-image"
          />
        )}
      </section>
      <section className="wrap section-space service-detail-body">
        <div className="service-offer">
          <h2>{s.offerHeading}</h2>
          <div>
            <p>{s.offerText}</p>
            <NumberedAccordion items={s.offerItems} />
          </div>
        </div>
        <div className="service-body-copy">
          {s.body.map((b) => (
            <p key={b.slice(0, 20)}>{b}</p>
          ))}
        </div>
        <div className="service-offer">
          <h2>{s.whyHeading}</h2>
          <div>
            <p>{s.whyText}</p>
            <NumberedAccordion items={s.whyItems} />
          </div>
        </div>
        <Link href="/digital-marketing-services" className="button-primary">
          View all services
          <ArrowUpRight />
        </Link>
      </section>
    </>
  );
}

function PostPage({ p }: { p: Post }) {
  return (
    <>
      <ArticleHeader title={p.title} date={formatDate(p.date)} />
      <ArticleLayout>
        <div className="article-copy">
          <div
            className="prose-wp"
            dangerouslySetInnerHTML={{ __html: p.html }}
          />
          <ShareRow />
        </div>
      </ArticleLayout>
      <RecentNews />
    </>
  );
}
