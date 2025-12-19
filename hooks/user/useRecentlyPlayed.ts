import { useMemo } from 'react';

import type { SpotifyRecentlyPlayedItem } from '@/types/spotify';
import { demoRecentlyPlayed, sanitizeTrack } from '@/mocks/demoData';

const useRecentlyPlayed = () => {
	const isLoading = false;
	const tracks: SpotifyRecentlyPlayedItem[] = useMemo(
		() =>
			demoRecentlyPlayed.map((item) => ({
				...item,
				track: sanitizeTrack(item.track),
			})),
		[]
	);

	const albums = useMemo(() => {
		return [
			...new Map(
				tracks.map(({ track }) => [track.album.id, track.album])
			).values(),
		];
	}, [tracks]);

	const artists = useMemo(() => {
		return [
			...new Map(
				tracks.map(({ track }) => [
					track.artists[0].id,
					track.artists[0],
				])
			).values(),
		];
	}, [tracks]);

	return { isLoading, tracks, albums, artists };
};

export default useRecentlyPlayed;
