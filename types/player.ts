import type {
	SpotifyPlaybackState,
	SpotifyRepeatState,
	SpotifyTrack,
} from './spotify';

interface TempDevice {
	id: string;
	is_active: boolean;
	volume_percent: number;
}

interface TempContext {
	uri: string;
}

interface TempPlaybackState {
	item: SpotifyTrack;
	context: TempContext;
	progress_ms: number;
	is_playing: boolean;
	timestamp: number;
	device: TempDevice;
	shuffle_state: boolean;
	repeat_state: SpotifyRepeatState;
}

export interface PlayerState {
	deviceId: string | null;
	isReady: boolean;
	playbackState: SpotifyPlaybackState | TempPlaybackState | null;
	isLoading: boolean;
	hasInteracted: boolean;
}
