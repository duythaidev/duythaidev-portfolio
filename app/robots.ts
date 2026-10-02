import type { MetadataRoute } from "next";
import { domain } from "@/lib/meta";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
  };
}
