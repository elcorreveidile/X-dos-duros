/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.por2duros.com' }],
        destination: 'https://por2duros.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
