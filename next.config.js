/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    SECRET_JWT:"event-planner-prod-friscxion"
  },
  images: {
    domains: ['flagcdn.com'],
  },
}

module.exports = nextConfig
