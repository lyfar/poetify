import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from '@reduxjs/toolkit';

import type { PlayerState } from '@/types/player';
import type { SpotifyRepeatState } from '@/types/spotify';
import {
	getDemoPlaybackState,
	initDemoPlayer,
	nextDemoTrack,
	pauseDemoTrack,
	playDemoTrack,
	previousDemoTrack,
	resumeDemoTrack,
	seekDemoTrack,
	setDemoRepeatState,
	setDemoShuffleState,
	setDemoVolume,
} from '@/utils/demoPlayer';

const initialState: PlayerState = {
	deviceId: null,
	isReady: false,
	playbackState: null,
	isLoading: false,
	hasInteracted: false,
};

export const fetchPlaybackState = createAsyncThunk(
	'player/fetchPlaybackState',
	async () => getDemoPlaybackState()
);

export const play = createAsyncThunk(
	'player/play',
	async ({
		contextUri,
		offset,
	}: {
		deviceId: string;
		contextUri: string;
		offset?: { position?: number; uri?: string };
	}) => {
		initDemoPlayer();
		return playDemoTrack({ contextUri, offset });
	}
);

export const pause = createAsyncThunk(
	'player/pause',
	async (_deviceId: string) => pauseDemoTrack()
);

export const resume = createAsyncThunk(
	'player/resume',
	async (_deviceId: string) => resumeDemoTrack()
);

export const seek = createAsyncThunk(
	'player/seek',
	async (position: number) => seekDemoTrack(position).progress_ms
);

export const skipToNext = createAsyncThunk('player/skipToNext', async () => {
	return nextDemoTrack();
});

export const skipToPrevious = createAsyncThunk(
	'player/skipToPrevious',
	async () => previousDemoTrack()
);

export const setShuffleState = createAsyncThunk(
	'player/setShuffleState',
	async (state: boolean) => setDemoShuffleState(state).shuffle_state
);

export const setRepeatState = createAsyncThunk(
	'player/setRepeatState',
	async (state: SpotifyRepeatState) => {
		return setDemoRepeatState(state).repeat_state;
	}
);

export const setVolume = createAsyncThunk(
	'player/setVolume',
	async (volume: number) => {
		return setDemoVolume(volume).device.volume_percent;
	}
);

const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		setDeviceId(state, action) {
			state.deviceId = action.payload;
		},
		setIsReady(state, action) {
			state.isReady = action.payload;
		},
		setPlaybackState(state, action) {
			if (!state.playbackState) {
				state.playbackState = {
					item: action.payload.track,
					device: {
						id: state.deviceId!,
						is_active: true,
					},
					progress_ms: action.payload.progress || 0,
					is_playing: action.payload.isPlaying,
					timestamp: +new Date(),
					...(action.payload.context && {
						context: action.payload.context,
					}),
				};
			} else {
				state.playbackState.item = action.payload.track;
				state.playbackState.progress_ms = action.payload.progress || 0;
				state.playbackState.is_playing = action.payload.isPlaying;
				state.playbackState.timestamp = +new Date();
				state.playbackState.context = action.payload.context;
			}
		},
		setProgress(state, action) {
			if (!state.playbackState) {
				return;
			}
			state.playbackState.progress_ms = action.payload;
		},
		// setPlayer(state, action) {
		// 	console.error('action', action);
		// 	state.player = action.payload;
		// },
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPlaybackState.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchPlaybackState.fulfilled, (state, action) => {
			state.playbackState = action.payload;
			state.isLoading = false;
		});
		builder.addCase(play.fulfilled, (state, action) => {
			state.hasInteracted = true;
			if (action.payload) {
				state.playbackState = action.payload;
			}
		});
		builder.addCase(pause.fulfilled, (state, action) => {
			if (!state.playbackState) {
				return;
			}
			if (action.payload) {
				state.playbackState = action.payload;
			} else {
				state.playbackState.is_playing = false;
			}
		});
		builder.addCase(resume.fulfilled, (state, action) => {
			state.hasInteracted = true;
			if (!state.playbackState) {
				return;
			}
			if (action.payload) {
				state.playbackState = action.payload;
			} else {
				state.playbackState.is_playing = true;
			}
		});
		builder.addCase(skipToNext.fulfilled, (state, action) => {
			state.hasInteracted = true;
			if (action.payload) {
				state.playbackState = action.payload;
			}
		});
		builder.addCase(skipToPrevious.fulfilled, (state, action) => {
			state.hasInteracted = true;
			if (action.payload) {
				state.playbackState = action.payload;
			}
		});
		builder.addCase(seek.fulfilled, (state, action) => {
			if (!state.playbackState) {
				return;
			}
			state.playbackState.progress_ms = action.payload;
		});
		builder.addCase(setShuffleState.fulfilled, (state, action) => {
			if (!state.playbackState) {
				return;
			}
			state.playbackState.shuffle_state = action.payload;
		});
		builder.addCase(setRepeatState.fulfilled, (state, action) => {
			if (!state.playbackState) {
				return;
			}
			state.playbackState.repeat_state = action.payload;
		});
		builder.addCase(setVolume.fulfilled, (state, action) => {
			if (!state.playbackState) {
				return;
			}
			state.playbackState.device.volume_percent = action.payload;
		});
	},
});

export const getNowPlaying = createSelector(
	[
		(state) => state.player.deviceId,
		(state) => state.player.playbackState,
		(state) => state.player.hasInteracted,
	],
	(deviceId, playbackState, hasInteracted) => {
		if (!!!playbackState) {
			return { isPlaying: false, hasInteracted };
		}
		return {
			isPlaying: playbackState.is_playing,
			isActive: playbackState.device.is_active,
			isExternal: playbackState.device.id !== deviceId,
			isPrivate: playbackState.device.is_private_session,
			isPodcast: playbackState.currently_playing_type === 'episode',
			device: playbackState.device,
			progress: playbackState.progress_ms,
			timestamp: playbackState.timestamp,
			item: playbackState.item,
			context: playbackState.context,
			repeatState: playbackState.repeat_state,
			shuffleState: playbackState.shuffle_state,
			hasInteracted,
		};
	}
);

export const { setDeviceId, setIsReady, setPlaybackState, setProgress } =
	playerSlice.actions;
export default playerSlice.reducer;
