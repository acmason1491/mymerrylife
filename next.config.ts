import type { NextConfig } from "next";

// NEXT_PUBLIC_BASE_PATH: "/mymerrylife" for GitHub Pages, "" (default) for domain-root hosting (Hostinger)
const deployBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(deployBasePath ? { basePath: deployBasePath, assetPrefix: `${deployBasePath}/` } : {}),
  trailingSlash: true,
};

export default nextConfig;
