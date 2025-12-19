import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'poetify';
const basePath = process.env.NODE_ENV === 'production' ? `/${repoName}` : '';

const nextConfig: NextConfig = {
	output: 'export',
	trailingSlash: true,
	basePath,
	assetPrefix: basePath,
	images: { unoptimized: true },
	env: {
		NEXT_PUBLIC_BASE_PATH: basePath,
	},
};

export default nextConfig;
