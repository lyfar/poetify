import React from 'react';
import { redirect } from 'next/navigation';

import AlbumContainer from '@/components/album/AlbumContainer';

import { demoAlbums, demoTracks } from '@/mocks/demoData';

export const dynamicParams = false;

export const generateStaticParams = async () =>
	demoAlbums.map((album) => ({ id: album.id }));

const Album = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const albumData = demoAlbums.find((album) => album.id === id);
	if (!albumData) {
		redirect('/');
	}

	const demoAlbumTracks = demoTracks.filter(
		(track) => track.album.id === albumData.id
	);

	const paginationData = {
		href: albumData.tracks.href,
		limit: demoAlbumTracks.length,
		offset: 0,
		next: null,
		previous: null,
		total: demoAlbumTracks.length,
	};

	return (
		<AlbumContainer
			id={id}
			imageUrl={albumData.images?.[0]?.url}
			type={albumData.album_type}
			name={albumData.name}
			artists={albumData.artists}
			uri={albumData.uri}
			releaseDate={albumData.release_date}
			releaseDatePrecision={albumData.release_date_precision}
			copyrightNotices={albumData.copyrights}
			totalTracks={albumData.total_tracks}
			tracks={demoAlbumTracks}
			paginationData={paginationData}
		/>
	);
};

export default Album;
