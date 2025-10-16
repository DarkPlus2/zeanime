/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["anilist.co", "filemoon.sx", "abyss.to"],
  },
  // Remove experimental.appDir since Next.js 14 enables App Router by default
};

module.exports = nextConfig;
