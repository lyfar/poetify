import {
	demoPlaybackState,
	demoTracks,
	DEMO_PLAYLIST_URI,
	getContextTracks,
	type DemoTrack,
} from '@/mocks/demoData';

import type { SpotifyPlaybackState, SpotifyRepeatState } from '@/types/spotify';

type PlaybackListener = (state: SpotifyPlaybackState) => void;

let audio: HTMLAudioElement | null = null;
let contextUri = DEMO_PLAYLIST_URI;
let contextTracks = getContextTracks();
let currentIndex = 0;
let shuffleState = false;
let repeatState: SpotifyRepeatState = 'off';
let listeners: PlaybackListener[] = [];
const durationOverrides: Record<string, number> = {};

const getTrackList = () =>
	contextTracks[contextUri] && contextTracks[contextUri].length > 0
		? contextTracks[contextUri]
		: demoTracks;

const getCurrentTrack = (): DemoTrack => {
	const trackList = getTrackList();
	return trackList[currentIndex] ?? trackList[0] ?? demoTracks[0];
};

const getTrackDuration = (track: DemoTrack) =>
	durationOverrides[track.id] ?? track.duration_ms;

const ensureAudio = () => {
	if (audio || typeof window === 'undefined') {
		return audio;
	}

	audio = new Audio();
	audio.volume = 0.7;
	audio.preload = 'auto';
	audio.addEventListener('ended', () => {
		nextDemoTrack();
	});
	audio.addEventListener('timeupdate', emitState);
	audio.addEventListener('play', emitState);
	audio.addEventListener('pause', emitState);
	audio.addEventListener('volumechange', emitState);

	return audio;
};

const buildPlaybackState = (): SpotifyPlaybackState => {
	const player = ensureAudio();
	const track = getCurrentTrack();
	const progressMs = player ? Math.floor(player.currentTime * 1000) : 0;
	const durationMsFromPlayer =
		player && Number.isFinite(player.duration)
			? Math.floor(player.duration * 1000)
			: null;
	const durationMs = durationMsFromPlayer ?? getTrackDuration(track);

	if (player) {
		player.loop = repeatState === 'track';
	}

	return {
		...demoPlaybackState(),
		context: {
			type: 'playlist',
			href: '/api/playlist/demo-playlist',
			external_urls: { spotify: '/playlist/demo-playlist' },
			uri: contextUri,
		},
		item: { ...track, duration_ms: durationMs },
		progress_ms: Math.min(progressMs, durationMs),
		is_playing: player ? !player.paused && !player.ended : false,
		repeat_state: repeatState,
		shuffle_state: shuffleState,
		device: {
			id: 'demo-device',
			is_active: true,
			is_private_session: false,
			is_restricted: false,
			name: 'Poetify demo',
			type: 'Computer',
			volume_percent: player
				? Math.round((player.volume || 0) * 100)
				: 70,
			supports_volume: true,
		},
	};
};

const emitState = () => {
	const state = buildPlaybackState();
	listeners.forEach((listener) => listener(state));
	return state;
};

const loadTrack = (track: DemoTrack) => {
	const player = ensureAudio();
	if (!player) {
		return;
	}
	player.src = track.preview_url;
	player.currentTime = 0;
	player.onloadedmetadata = () => {
		if (Number.isFinite(player.duration)) {
			durationOverrides[track.id] = Math.floor(player.duration * 1000);
			emitState();
		}
	};
};

const setIndexFromOffset = ({
	offset,
	trackList,
}: {
	offset?: { position?: number; uri?: string };
	trackList: DemoTrack[];
}) => {
	if (!offset) {
		return;
	}

	if (typeof offset.position === 'number') {
		currentIndex = Math.max(
			0,
			Math.min(trackList.length - 1, offset.position)
		);
		return;
	}

	if (offset.uri) {
		const matchIdx = trackList.findIndex(
			(track) => track.uri === offset.uri
		);
		if (matchIdx >= 0) {
			currentIndex = matchIdx;
		}
	}
};

export const initDemoPlayer = () => {
	contextTracks = getContextTracks();
	const state = demoPlaybackState();
	ensureAudio();
	loadTrack(getCurrentTrack());
	return state;
};

export const playDemoTrack = async ({
	contextUri: newContextUri,
	offset,
}: {
	contextUri?: string;
	offset?: { position?: number; uri?: string };
}) => {
	if (newContextUri) {
		contextUri = newContextUri;
	}

	const trackList = getTrackList();
	setIndexFromOffset({ offset, trackList });

	loadTrack(getCurrentTrack());

	try {
		await ensureAudio()?.play();
	} catch (err) {
		console.error('[demoPlayer] Unable to start playback', err);
	}

	return emitState();
};

export const pauseDemoTrack = () => {
	const player = ensureAudio();
	player?.pause();
	return emitState();
};

export const resumeDemoTrack = async () => {
	const player = ensureAudio();
	if (player) {
		try {
			await player.play();
		} catch (err) {
			console.error('[demoPlayer] Unable to resume playback', err);
		}
	}
	return emitState();
};

export const seekDemoTrack = (positionMs: number) => {
	const player = ensureAudio();
	if (player) {
		player.currentTime = positionMs / 1000;
	}
	return emitState();
};

export const nextDemoTrack = () => {
	const trackList = getTrackList();
	if (shuffleState) {
		currentIndex = Math.floor(Math.random() * trackList.length);
	} else {
		currentIndex = (currentIndex + 1) % trackList.length;
	}
	loadTrack(getCurrentTrack());
	ensureAudio()?.play().catch(() => {});
	return emitState();
};

export const previousDemoTrack = () => {
	const trackList = getTrackList();
	if (shuffleState) {
		currentIndex = Math.floor(Math.random() * trackList.length);
	} else {
		currentIndex =
			currentIndex === 0 ? trackList.length - 1 : currentIndex - 1;
	}
	loadTrack(getCurrentTrack());
	ensureAudio()?.play().catch(() => {});
	return emitState();
};

export const setDemoShuffleState = (state: boolean) => {
	shuffleState = state;
	return emitState();
};

export const setDemoRepeatState = (state: SpotifyRepeatState) => {
	repeatState = state;
	return emitState();
};

export const setDemoVolume = (value: number) => {
	const player = ensureAudio();
	if (player) {
		player.volume = Math.max(0, Math.min(1, value / 100));
	}
	return emitState();
};

export const getDemoPlaybackState = () => emitState();

export const subscribeToDemoPlayer = (listener: PlaybackListener) => {
	listeners.push(listener);
	return () => {
		listeners = listeners.filter((l) => l !== listener);
	};
};
