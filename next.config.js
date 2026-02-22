/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // Для корректной работы на любом хостинге
  trailingSlash: true,
}

module.exports = nextConfig
