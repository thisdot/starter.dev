/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
		browsersListForSwc: true,
		legacyBrowsers: false,
	},
	images: {
		dangerouslyAllowSVG: true,
		domains: ['cdn.shopify.com'],
	},
};

module.exports = nextConfig;
