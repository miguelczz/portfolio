import type { NextConfig } from "next";

/** Dirección que se comparte. La primera dirección de Vercel sigue viva pero redirige aquí. */
const PUBLIC_HOST = "mzuluaga.vercel.app";
const OLD_HOSTS = ["portfolio-phi-inky.vercel.app"];

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
