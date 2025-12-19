import type { NextConfig } from "next";

import fs from 'node:fs';
import path from 'node:path';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'poetify';

const hasCustomDomain = (() => {
	try {
		const candidates = [
			path.join(process.cwd(), 'CNAME'),
			path.join(process.cwd(), 'public', 'CNAME'),
		];
		return candidates.some((candidate) => {
			if (!fs.existsSync(candidate)) {
				return false;
			}
			const contents = fs.readFileSync(candidate, 'utf8').trim();
			return contents.length > 0;
		});
	} catch {
		return false;
	}
})();

const basePath =
	process.env.NODE_ENV === 'production' && !hasCustomDomain ? `/${repoName}` : '';

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
