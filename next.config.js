/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["anilist.co", "filemoon.sx", "abyss.to"],
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
