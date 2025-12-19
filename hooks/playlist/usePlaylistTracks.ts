import { useState, useCallback } from 'react';

import type { SpotifyPlaylistItem } from '@/types/spotify';
import type { Pagination } from '@/types/library';
import { demoPlaylist } from '@/mocks/demoData';

const usePlaylistTracks = (
	playlistId: string,
	initialTracks: SpotifyPlaylistItem[],
	initialPaginationData: Pagination
) => {
	const [tracks, setTracks] = useState(initialTracks);
	const [paginationData, setPaginationData] = useState(initialPaginationData);

	const fetchPaginatedTracks = useCallback(
		async ({ offset, limit }: { offset: number; limit: number }) => {
			if (playlistId !== demoPlaylist.id) {
				setPaginationData((prev) => ({
					...prev,
					offset,
					limit,
					next: null,
					previous: null,
					total: prev.total ?? 0,
				}));
				return;
			}

			const items = demoPlaylist.tracks.items.slice(offset, offset + limit);

			setTracks((prev) => [...prev, ...items]);
			setPaginationData({
				href: `/api/playlist/${playlistId}/tracks`,
				limit,
				offset,
				next: null,
				previous: null,
				total: demoPlaylist.tracks.total,
			});
		},
		[playlistId]
	);

	return { tracks, paginationData, fetchPaginatedTracks };
};

export default usePlaylistTracks;
