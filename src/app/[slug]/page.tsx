import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  posts,
  serviceDetails,
  type Post,
  type ServiceDetail,
} from "@/data/content";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { BlogPost } from "@/components/BlogPost";

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
  return <ServiceDetailPage s={s} />;
}

function PostPage({ p }: { p: Post }) {
  return <BlogPost p={p} />;
}
