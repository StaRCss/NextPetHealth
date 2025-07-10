import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'], // your existing config
  images: {
    domains: ['res.cloudinary.com'], // allow Cloudinary images
  },
};

export default nextConfig;
