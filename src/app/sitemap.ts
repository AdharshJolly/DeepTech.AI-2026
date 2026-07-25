import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://deep-tech-ai-26.vercel.app";

  const routes = [
    "",
    "/speakers",
    "/agenda",
    "/committee",
    "/social-hub",
    "/past-events",
    "/register",
    "/partner-inquiry",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
