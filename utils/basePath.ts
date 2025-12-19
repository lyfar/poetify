const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const withBasePath = (url: string) => {
	if (!basePath) {
		return url;
	}
	if (!url.startsWith('/')) {
		return url;
	}
	if (url === basePath || url.startsWith(`${basePath}/`)) {
		return url;
	}
	return `${basePath}${url}`;
};

