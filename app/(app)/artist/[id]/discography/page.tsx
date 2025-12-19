import React from 'react';
import { redirect } from 'next/navigation';

import Discography from '@/components/artist/Discography';

import { demoAlbums, demoArtists, sanitizeAlbum } from '@/mocks/demoData';

export const dynamicParams = false;

export const generateStaticParams = async () =>
	demoArtists.map((artist) => ({ id: artist.id }));

const ArtistDiscography = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	const artistData = demoArtists.find((artist) => artist.id === id) ?? null;
	if (!artistData) {
		redirect('/');
	}

	const albumItems = demoAlbums
		.filter((album) =>
			album.artists.some((artist) => artist.id === artistData.id)
		)
		.map((album) => sanitizeAlbum(album));

	const baseCollection = {
		href: `/api/demo/artists/${artistData.id}/albums`,
		items: albumItems,
		limit: albumItems.length,
		offset: 0,
		next: null,
		previous: null,
		total: albumItems.length,
	};

	const albums = baseCollection;
	const singles = { ...baseCollection, items: [] };
	const compilations = { ...baseCollection, items: [] };

		return (
			<div className="p-4 lg:p-8">
				<Discography
					artistId={artistData.id}
					title={artistData.name}
					data={{ albums, singles, compilations }}
					defaultTab="albums"
				/>
			</div>
		);
	};

export default ArtistDiscography;
