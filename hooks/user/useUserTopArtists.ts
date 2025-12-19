import { useMemo, useState } from 'react';

import type { SpotifyArtist } from '@/types/spotify';
import { demoTopArtists } from '@/mocks/demoData';

const useUserTopArtists = () => {
	const [period, setPeriod] = useState('short_term');
	const isLoading = false;

	const artists: SpotifyArtist[] = useMemo(() => {
		if (period === 'short_term') {
			return demoTopArtists.slice(0, 10);
		}
		if (period === 'medium_term') {
			return demoTopArtists.slice(0, 10).reverse();
		}
		return demoTopArtists.slice(0, 10);
	}, [period]);

	return { isLoading, artists, period, setPeriod };
};

export default useUserTopArtists;
