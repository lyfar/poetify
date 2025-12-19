import React from 'react';
import { redirect } from 'next/navigation';

import PlaylistContainer from '@/components/playlist/PlaylistContainer';

import { demoPlaylist } from '@/mocks/demoData';

import type { SpotifyPlaylist } from '@/types/spotify';

export const dynamicParams = false;

export const generateStaticParams = async () => [{ id: demoPlaylist.id }];

const Playlist = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	let playlistData: SpotifyPlaylist | null = null;

	if (id !== demoPlaylist.id) {
		redirect('/');
	}
	playlistData = demoPlaylist;

	if (!playlistData) {
		redirect('/');
	}

	const resolvedPlaylist = playlistData as SpotifyPlaylist;

	const { items, ...paginationData } = resolvedPlaylist.tracks;

	const owner = {
		id: resolvedPlaylist.owner.id,
		displayName: resolvedPlaylist.owner.display_name,
	};

	return (
		<PlaylistContainer
			id={id}
			name={resolvedPlaylist.name}
			uri={resolvedPlaylist.uri}
			imageUrl={resolvedPlaylist.images?.[0]?.url}
			description={resolvedPlaylist.description}
			owner={owner}
			tracks={items}
			totalFollowers={resolvedPlaylist.followers?.total}
			totalTracks={resolvedPlaylist.tracks.total}
			paginationData={paginationData}
		/>
	);
};

export default Playlist;
