import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { portfolio, type Project } from "@/data/content";
import { PageTitle } from "@/components/Blocks";
import { ArrowUpRight } from "@/components/Icons";

export const metadata: Metadata = { title: "Portfolio Standard" };

// Three-column masonry: the live page stacks a short or tall card over a newer-style card per column.
const columns = [
  ["maxxgro", "herblogger"],
  ["thedeepsoil", "jazaa"],
  ["alankrit", "mg-"],
];
const tall = new Set(["thedeepsoil", "alankrit"]);
// The two newest projects use the theme's lighter card style.
const lightCard = new Set(["jazaa", "mg-"]);

function Card({ p }: { p: Project }) {
  const key = columns.flat().find((k) => p.slug.startsWith(k)) ?? "";
  const href = `/portfolio/${p.slug}`;

  if (lightCard.has(key))
    return (
      <Link href={href} className="group block border-t border-line-soft pt-[30px]">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-[28px] leading-[1.25] transition-colors group-hover:text-accent">{p.title}</h2>
          <span className="mt-[24px] flex h-3 w-[52px] items-center justify-center rounded-[30px] border border-line-soft transition-colors group-hover:border-accent" />
        </div>
        <div className="mt-[63px] overflow-hidden rounded-[10px]">
          <Image src={p.listImage} alt={p.title} width={399} height={502} className="aspect-[399/502] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
      </Link>
    );

  return (
    <Link href={href} className="group block border-[3px] border-[#666]">
      <div className="flex items-start justify-between gap-4 pt-[28px]">
        <h2 className="text-[30px] font-medium leading-[1.25] text-muted-2 transition-colors group-hover:text-accent">{p.title}</h2>
        <span className="mt-[10px] flex h-[30px] w-[66px] shrink-0 items-center justify-center border-[3px] border-white bg-[#212529] transition-colors group-hover:text-accent">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="mt-[63px] overflow-hidden rounded-[10px]">
        <Image
          src={p.listImage}
          alt={p.title}
          width={393}
          height={tall.has(key) ? 495 : 276}
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${tall.has(key) ? "aspect-[393/495]" : "aspect-[393/276]"}`}
        />
      </div>
    </Link>
  );
}

export default function PortfolioPage() {
  const bySlug = (k: string) => portfolio.find((p) => p.slug.startsWith(k))!;
  return (
    <>
      <PageTitle title="My Portfolio" crumb="Portfolio Standard" />
      <section className="wrap pb-[140px] pt-[98px]">
        <div className="grid gap-[50px] md:grid-cols-3">
          {columns.map((col, i) => (
            <div key={i} className="space-y-10">
              {col.map((k) => (
                <Card key={k} p={bySlug(k)} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
