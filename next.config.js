/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            { source: '/smarttax', destination: '/olowo', permanent: true },
            { source: '/smarttax/:path*', destination: '/olowo/:path*', permanent: true },
            { source: '/sites/smarttax', destination: '/sites/olowo', permanent: true },
            { source: '/sites/smarttax/:path*', destination: '/sites/olowo/:path*', permanent: true },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    {
                        key: 'Content-Security-Policy',
                        value: "frame-ancestors 'self' https://vercel.com https://*.vercel.com",
                    },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
