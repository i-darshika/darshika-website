// Typed access to content.json, generated from the live WordPress pages.
import data from "./content.json";

export type ServiceDetail = (typeof data.serviceDetails)[number];
export type Project = (typeof data.portfolio)[number];
export type Post = (typeof data.posts)[number];

export const { serviceDetails, servicesPage, about, portfolio, posts } = data;

// The live services list links to slugs that 404; map rows to the real service pages.
const serviceRoutes: Record<string, string> = {
  "Social Media Marketing": "/social-media-marketing-services",
  "Graphic Designing": "/graphic-designing-services",
  "Search Engine Optimization": "/search-engine-optimization-service",
  "Website Designing": "/website-development-services",
};
export const serviceRoute = (title: string) => serviceRoutes[title.replace(/\s+/g, " ")] ?? "/digital-marketing-services";

// Blog order on the live site: newest first.
export const postsByDate = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso: string, style: "long" | "short" = "long") =>
  new Date(iso).toLocaleDateString("en-US", style === "long" ? { month: "long", day: "numeric", year: "numeric" } : { month: "short", day: "numeric", year: "numeric" });
