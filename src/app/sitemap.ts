import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/data";

const BASE_URL = "https://crewlogic-labs.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    ...CASE_STUDIES.map((study) => ({
      url: `${BASE_URL}/case-studies/${study.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
