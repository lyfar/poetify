import { useEffect } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { fetchPlaybackState, setDeviceId, setIsReady } from '@/redux/slices/playerSlice';

const usePlayer = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setDeviceId('demo-device'));
		dispatch(setIsReady(true));
		dispatch(fetchPlaybackState());

		const intervalId = setInterval(() => {
			dispatch(fetchPlaybackState());
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [dispatch]);
};

export default usePlayer;
