import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	cacheComponents: true,
	reactCompiler: true,
	typedRoutes: true,
	images: {
		remotePatterns: [new URL("https://placehold.co/**")],
	},
};

export default nextConfig;
