import './globals.css';

import type { Metadata } from 'next';

import { withBasePath } from '@/utils/basePath';

const SITE_ORIGIN = 'https://lyfar.github.io';
const SITE_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const SITE_URL = `${SITE_ORIGIN}${SITE_BASE_PATH}`;

export const metadata: Metadata = {
	title: 'Poetify',
	description: 'A web-based music experience.',
	metadataBase: new URL(SITE_ORIGIN),
	openGraph: {
		type: 'website',
		url: SITE_URL,
		siteName: 'Poetify',
		images: [
			{
				url: withBasePath('/musicmate-og.png'),
				width: 1200,
				height: 630,
				alt: 'Poetify',
			},
		],
	},
	icons: {
		icon: withBasePath('/favicon.ico'),
		shortcut: withBasePath('/favicon-32x32.png'),
		apple: withBasePath('/apple-touch-icon.png'),
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-black min-h-screen antialiased select-none">
				{children}
			</body>
		</html>
	);
}
