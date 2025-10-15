/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ["cdn.myanimelist.net", "image.tmdb.org"] } 
};
module.exports = nextConfig;
