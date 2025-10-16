import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "lukaslumiere.com",
    short_name: "lukaslumiere.com",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f6f1",
    theme_color: "#f8f6f1",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
