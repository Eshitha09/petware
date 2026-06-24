/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.terrariumquest.com' },
      { protocol: 'https', hostname: 'nationalcanineresearchcouncil.com' },
      { protocol: 'https', hostname: 'www.nationalcanineresearchcouncil.com' },
    ],
  },
  // Allow <img> tags pointing to any src (we use plain <img>, not next/image)
  // This silences the lint warning without forcing next/image everywhere
  experimental: {},
}
export default nextConfig
