export interface SpotifyExternalUrl {
	spotify: string;
}

export interface SpotifyImage {
	url: string;
	height: number | null;
	width: number | null;
}

export interface SpotifyCopyright {
	text: string;
	type: string;
}

interface SpotifyItemOwner {
	display_name: string;
	external_urls: SpotifyExternalUrl;
	href: string;
	id: string;
	type: 'user';
	uri: string;
}

export interface SpotifyExplicitContent {
	filter_enabled: boolean;
	filter_locked: boolean;
}

export interface SpotifyFollowers {
	href: string | null;
	total: number;
}

export interface SpotifyPaginatedResponse<T> {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: T[];
}

export interface SpotifyCategory {
	href: string;
	id: string;
	icons: SpotifyImage[];
	name: string;
}

export type SpotifyAlbumType = 'album' | 'single' | 'compilation';

export type SpotifyReleaseDatePrecision = 'year' | 'month' | 'day';

export interface SpotifyAlbum {
	album_type: SpotifyAlbumType;
	total_tracks: number;
	external_urls: SpotifyExternalUrl;
	available_markets: string[];
	href: string;
	id: string;
	images: SpotifyImage[];
	name: string;
	release_date: string;
	release_date_precision: SpotifyReleaseDatePrecision;
	type: 'album';
	uri: string;
	artists: SpotifyArtist[];
	tracks: SpotifyPaginatedResponse<SpotifyTrack>;
	copyrights: SpotifyCopyright[];
	label: string;
	popularity: number;
}

export interface SpotifyLibraryAlbum {
	added_at: string;
	album: SpotifyAlbum;
}

export interface SpotifyPlaylistItem {
	added_at: string;
	added_by: SpotifyUser;
	is_local: boolean;
	primary_color: string | null;
	track: SpotifyTrack;
}

export interface SpotifyRecentlyPlayedItem {
	track: SpotifyTrack;
	context: SpotifyContext | null;
	played_at: string;
}

export interface SpotifyArtist {
	external_urls: SpotifyExternalUrl;
	followers: SpotifyFollowers;
	genres: string[];
	href: string;
	id: string;
	images: SpotifyImage[];
	name: string;
	popularity: number;
	type: 'artist';
	uri: string;
}

export interface SpotifyPlaylist {
	collaborative: boolean;
	description: string;
	external_urls: SpotifyExternalUrl;
	href: string;
	id: string;
	images: SpotifyImage[];
	name: string;
	owner: SpotifyItemOwner;
	followers?: { href: string | null; total: number };
	primary_color: string | null;
	public: boolean;
	snapshot_id: string;
	tracks: SpotifyPaginatedResponse<SpotifyPlaylistItem>;
	type: 'playlist';
	uri: string;
}

export interface SpotifyTrack {
	artists: SpotifyArtist[];
	album: SpotifyAlbum;
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_urls: SpotifyExternalUrl;
	href: string;
	id: string;
	is_playable: boolean;
	name: string;
	preview_url: string | null;
	track_number: number;
	type: 'track';
	uri: string;
	is_local: boolean;
}

export interface SpotifyLibraryLikedSong {
	added_at: string;
	track: SpotifyTrack;
}

interface SpotifyBaseUser {
	id: string;
	uri: string;
	type: 'user';
	external_urls: SpotifyExternalUrl;
}
export interface SpotifyUser extends SpotifyBaseUser {
	display_name?: string;
	followers?: SpotifyFollowers;
	href: string;
	images?: SpotifyImage[];
}

export type SpotifyProduct = 'premium' | 'free' | 'open';

export interface SpotifyCurrentUser extends SpotifyBaseUser {
	country?: string;
	display_name?: string;
	email?: string;
	explicit_content: SpotifyExplicitContent;
	followers: SpotifyFollowers;
	href: string;
	images: SpotifyImage[];
	product: SpotifyProduct;
}

interface SpotifyDevice {
	id: string | null;
	is_active: boolean;
	is_private_session: boolean;
	is_restricted: boolean;
	name: string;
	type: string;
	volume_percent: number;
	supports_volume: boolean;
}

export interface SpotifyContext {
	type: string;
	href: string;
	external_urls: SpotifyExternalUrl;
	uri: string;
}

export type SpotifyRepeatState = 'off' | 'context' | 'track';

export interface SpotifyPlaybackState {
	device: SpotifyDevice;
	shuffle_state: boolean;
	smart_shuffle: boolean;
	repeat_state: SpotifyRepeatState;
	is_playing: boolean;
	timestamp: number;
	context: SpotifyContext;
	progress_ms: number;
	item: SpotifyTrack;
	currently_playing_type: string;
}
