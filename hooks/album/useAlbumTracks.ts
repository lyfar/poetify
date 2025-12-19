import { useState, useCallback } from 'react';

import type { SpotifyTrack } from '@/types/spotify';
import type { Pagination } from '@/types/library';
import { demoAlbums, demoTracks, sanitizeTrack } from '@/mocks/demoData';

const useAlbumTracks = (
	albumId: string,
	initialTracks: SpotifyTrack[],
	initialPaginationData: Pagination
) => {
	const [tracks, setTracks] = useState(initialTracks);
	const [paginationData, setPaginationData] = useState(initialPaginationData);

	const fetchPaginatedTracks = useCallback(
		async ({ offset, limit }: { offset: number; limit: number }) => {
			const album = demoAlbums.find((candidate) => candidate.id === albumId);
			if (!album) {
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

			const allTracks = demoTracks
				.filter((track) => track.album.id === album.id)
				.map((track) => sanitizeTrack(track));

			const items = allTracks.slice(offset, offset + limit);

			setTracks((prev) => [...prev, ...items]);
			setPaginationData({
				href: `/api/album/${albumId}/tracks`,
				limit,
				offset,
				next: null,
				previous: null,
				total: allTracks.length,
			});
		},
		[albumId]
	);

	return { tracks, paginationData, fetchPaginatedTracks };
};

export default useAlbumTracks;
