import { useMemo } from 'react';
import dayjs from 'dayjs';

import type { SpotifyReleaseDatePrecision } from '@/types/spotify';

const useFormattedDate = (
	date?: string,
	precision?: SpotifyReleaseDatePrecision
) => {
	return useMemo(() => {
		if (!date || !precision) {
			return;
		}
		return precision === 'day'
			? dayjs(date).format('MMMM D YYYY')
			: dayjs(date).year();
	}, [date, precision]);
};

export default useFormattedDate;
