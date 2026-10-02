import type { MetadataRoute } from "next";
import { siteName } from "@/lib/meta";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: siteName,
    description:
      "This is my personal portfolio website showing my projects and experience with some cool animations and effects.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#00f2fe",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon-light-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
