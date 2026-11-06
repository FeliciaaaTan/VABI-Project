import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export → deploy the `out/` folder anywhere (Vercel, GitHub Pages, Netlify).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
