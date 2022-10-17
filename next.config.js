/** @type {import('next').NextConfig} */

const nextTranslate = require("next-translate");
const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([nextTranslate, withBundleAnalyzer], {
    mode: 'production',
    swcMinify: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**"
            }
        ]
    },
    reactStrictMode: true,
    experimental: {
        exprContextCritical: false,
        esmExternals: true
    }
});
