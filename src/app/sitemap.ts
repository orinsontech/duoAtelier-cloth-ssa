import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/designs`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/customize`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
