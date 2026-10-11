import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/sign-in", destination: "/signin", permanent: false },
      { source: "/sign-up", destination: "/signup", permanent: false },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  serverExternalPackages: ["mongodb"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
