import type { MetadataRoute } from "next";

const BASE = "https://www.shreeomkarsoapworks.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["", "/products", "/about", "/contact"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
