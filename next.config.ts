import type { NextConfig } from "next";

/** Dirección que se comparte. Las direcciones anteriores de Vercel siguen vivas pero redirigen aquí. */
const PUBLIC_HOST = "miguelzuluaga.dev";
const OLD_HOSTS = ["mzuluaga.vercel.app", "portfolio-phi-inky.vercel.app"];

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return OLD_HOSTS.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `https://${PUBLIC_HOST}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
