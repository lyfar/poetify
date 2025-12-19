import { useMemo, useState } from 'react';

import type { SpotifyTrack } from '@/types/spotify';
import { demoTracks, sanitizeTrack } from '@/mocks/demoData';

const useUserTopTracks = () => {
	const [period, setPeriod] = useState('short_term');
	const isLoading = false;

	const tracks: SpotifyTrack[] = useMemo(() => {
		const items = demoTracks.map((track) => sanitizeTrack(track));
		if (period === 'short_term') {
			return items.slice(0, 10);
		}
		if (period === 'medium_term') {
			return items.slice(0, 10).reverse();
		}
		return items.slice(0, 10);
	}, [period]);

	return { isLoading, tracks, period, setPeriod };
};

export default useUserTopTracks;
