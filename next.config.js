/**@type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  swcMinify: true,
  //basePath: isProd ? '/admin' : undefined,
  assetPrefix : isProd ? 'https://admin.peeky.az/' : undefined,
  images: {
    // loader: 'imgix',
    // path: '/admin/',
    unoptimized: true
  },
  
}

module.exports = nextConfig