/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        YOUR_CLIENT_API_KEY: process.env.YOUR_CLIENT_API_KEY,
        TINY_API_KEY: process.env.TINY_API_KEY
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
            },
        ],
    },
}

module.exports = nextConfig
