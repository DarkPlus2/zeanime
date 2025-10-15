/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ["cdn.myanimelist.net"] } // add your poster domains
}
module.exports = nextConfig;
