import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isUserPremium } from '@/redux/slices/userSlice';
import {
	getNowPlaying,
	play,
	pause,
	fetchPlaybackState,
} from '@/redux/slices/playerSlice';

import { showToast } from '@/utils/toast';
import { DEMO_MODE } from '@/utils/demo';

const useTrackPlayback = ({
	trackId,
	contextUri,
	uri,
	position,
}: {
	trackId: string;
	contextUri: string;
	uri?: string;
	position?: number;
}) => {
	const dispatch = useAppDispatch();
	const {
		isActive,
		isExternal,
		isPlaying,
		device,
		context,
		item: itemNowPlaying,
	} = useAppSelector(getNowPlaying);
	const userHasPremium = useAppSelector(isUserPremium);
	const { deviceId: localDeviceId } = useAppSelector((state) => state.player);
	const canPlay = DEMO_MODE || userHasPremium;

	const isActiveTrack =
		itemNowPlaying?.id === trackId && context?.uri === contextUri;

	const isNowPlaying = isActiveTrack && isPlaying;

	const activeDeviceId = isActive && isExternal ? device.id : localDeviceId;

	const playTrack = useCallback(async () => {
		if (!canPlay) {
			showToast('Requires Spotify Premium.');
			return;
		}
		await dispatch(
			play({
				deviceId: activeDeviceId,
				contextUri,
				...(typeof position === 'number'
					? { offset: { position } }
					: uri
					? { offset: { uri } }
					: {}),
			})
		);
		if (isExternal) {
			setTimeout(() => dispatch(fetchPlaybackState()), 500);
		}
	}, [
		canPlay,
		activeDeviceId,
		isActive,
		isExternal,
		device,
		localDeviceId,
		contextUri,
		position,
		uri,
		dispatch,
	]);

	const pauseTrack = useCallback(() => {
		if (!canPlay) {
			showToast('Requires Spotify Premium.');
			return;
		}
		dispatch(pause(activeDeviceId));
	}, [canPlay, activeDeviceId, dispatch]);

	return { isNowPlaying, isActiveTrack, playTrack, pauseTrack };
};

export default useTrackPlayback;
