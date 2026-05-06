/** @type {import('next').NextConfig} */
const nextConfig = {
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
