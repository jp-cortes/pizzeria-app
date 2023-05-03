/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  baseUrl: "./",
  images: {
    domains: ["res.cloudinary.com"],
  },
}

module.exports = nextConfig;
