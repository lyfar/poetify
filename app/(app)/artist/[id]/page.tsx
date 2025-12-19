import React from 'react';
import { redirect } from 'next/navigation';

import ArtistHeader from '@/components/artist/ArtistHeader';
import ArtistTopTracks from '@/components/artist/ArtistTopTracks';
import FeaturedItem from '@/components/artist/FeaturedItem';
import Discography from '@/components/artist/Discography';

import {
	demoAlbums,
	demoArtists,
	demoTracks,
	sanitizeAlbum,
	sanitizeTrack,
} from '@/mocks/demoData';

import type { ArtistDiscography } from '@/types/artists';
import type {
	SpotifyAlbum,
	SpotifyArtist,
	SpotifyPaginatedResponse,
	SpotifyTrack,
} from '@/types/spotify';

export const dynamicParams = false;

export const generateStaticParams = async () =>
	demoArtists.map((artist) => ({ id: artist.id }));

const Artist = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	const artistData: SpotifyArtist | null =
		demoArtists.find((artist) => artist.id === id) ?? null;
	if (!artistData) {
		redirect('/');
	}

	const topTracks: SpotifyTrack[] = demoTracks
		.filter((track) =>
			track.artists.some((artist) => artist.id === artistData!.id)
		)
		.map((track) => sanitizeTrack(track));

	const albumItems: SpotifyAlbum[] = demoAlbums
		.filter((album) =>
			album.artists.some((artist) => artist.id === artistData!.id)
		)
		.map((album) => sanitizeAlbum(album));

	const baseCollection: SpotifyPaginatedResponse<SpotifyAlbum> = {
		href: `/api/demo/artists/${artistData.id}/albums`,
		items: albumItems,
		limit: albumItems.length,
		offset: 0,
		next: null,
		previous: null,
		total: albumItems.length,
	};

	const discography: ArtistDiscography = {
		albums: baseCollection,
		singles: { ...baseCollection, items: [] },
		compilations: { ...baseCollection, items: [] },
	};

	const featuredItem =
		discography.albums.items[0] ||
		discography.singles.items[0] ||
		discography.compilations.items[0];

	return (
		<>
			<ArtistHeader
				id={artistData.id}
				imageUrl={artistData.images?.[0]?.url}
				name={artistData.name}
				followers={artistData.followers.total}
				genres={artistData.genres}
				contextUri={artistData.uri}
			/>
			<div className="flex flex-col gap-10 px-4 lg:px-8 pt-4 pb-8">
				<div
					className={
						featuredItem
							? 'flex flex-col xl:grid xl:grid-cols-[1.25fr_1fr] gap-10 lg:gap-6'
							: ''
					}
				>
					<ArtistTopTracks tracks={topTracks} />
					{featuredItem && <FeaturedItem item={featuredItem} />}
				</div>
				<Discography
					artistId={artistData.id}
					data={discography}
					title="Discography"
					isExpandable={true}
					maxItems={7}
				/>
			</div>
		</>
	);
};

export default Artist;
