/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  baseUrl: "./",
  images: {
    domains: ["res.cloudinary.com"],
  },
}

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  mode: 'production',
  disable: false,
},

);

module.exports = withPWA(nextConfig);
