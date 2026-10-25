import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { portfolio } from "@/data/content";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = portfolio.find((x) => x.slug === slug);
  return p
    ? { title: `${p.title} Case Study`, description: p.overview[0] }
    : {};
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = portfolio.find((x) => x.slug === slug);
  if (!p) notFound();
  return <ProjectCaseStudy p={p} />;
}
