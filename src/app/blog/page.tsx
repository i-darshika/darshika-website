import { Suspense } from "react";
import type { Metadata } from "next";
import BlogContent from "@/components/BlogContent";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <section className="wrap py-[140px]">Loading articles…</section>
      }
    >
      <BlogContent />
    </Suspense>
  );
}
