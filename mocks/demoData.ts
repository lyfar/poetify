import type {
	SpotifyAlbum,
	SpotifyArtist,
	SpotifyCurrentUser,
	SpotifyLibraryAlbum,
	SpotifyLibraryLikedSong,
	SpotifyPaginatedResponse,
	SpotifyPlaybackState,
	SpotifyPlaylist,
	SpotifyPlaylistItem,
	SpotifyRecentlyPlayedItem,
	SpotifyTrack,
} from '@/types/spotify';

import { withBasePath } from '@/utils/basePath';

const DEMO_RELEASE_DATE = '2025-12-24';
const DEMO_DATE_ISO = '2025-12-24T00:00:00';

const createImages = (baseUrl: string) => {
	if (baseUrl.startsWith('/')) {
		const resolvedUrl = withBasePath(baseUrl);
		return [
			{ url: resolvedUrl, height: 640, width: 640 },
			{ url: resolvedUrl, height: 300, width: 300 },
			{ url: resolvedUrl, height: 64, width: 64 },
		];
	}

	return [
		{
			url: `${baseUrl}?auto=format&fit=crop&w=640&q=80`,
			height: 640,
			width: 640,
		},
		{
			url: `${baseUrl}?auto=format&fit=crop&w=300&q=80`,
			height: 300,
			width: 300,
		},
		{
			url: `${baseUrl}?auto=format&fit=crop&w=64&q=80`,
			height: 64,
			width: 64,
		},
	];
	};

export type DemoTrack = SpotifyTrack & { preview_url: string };

export const demoArtists: SpotifyArtist[] = [
	{
		external_urls: { spotify: '/artist/poetify-artist-mf-doom' },
		followers: { href: null, total: 1200 },
		genres: ['hip-hop', 'lofi'],
		href: '/api/demo/artists/poetify-artist-mf-doom',
			id: 'poetify-artist-mf-doom',
			images: createImages('/assets/artists/poetify-artist-mf-doom.jpg'),
			name: 'MF DOOM (cover)',
		popularity: 60,
		type: 'artist',
		uri: 'poetify:artist:poetify-artist-mf-doom',
	},
	{
		external_urls: { spotify: '/artist/poetify-artist-nirvana' },
		followers: { href: null, total: 1400 },
		genres: ['rock', 'grunge'],
		href: '/api/demo/artists/poetify-artist-nirvana',
			id: 'poetify-artist-nirvana',
			images: createImages('/assets/artists/poetify-artist-nirvana.jpg'),
			name: 'Nirvana (cover)',
		popularity: 58,
		type: 'artist',
		uri: 'poetify:artist:poetify-artist-nirvana',
	},
	{
		external_urls: { spotify: '/artist/poetify-artist-gorillaz' },
		followers: { href: null, total: 1100 },
		genres: ['alt', 'indie'],
		href: '/api/demo/artists/poetify-artist-gorillaz',
			id: 'poetify-artist-gorillaz',
			images: createImages('/assets/artists/poetify-artist-gorillaz.jpg'),
			name: 'Gorillaz (cover)',
		popularity: 55,
		type: 'artist',
		uri: 'poetify:artist:poetify-artist-gorillaz',
	},
	{
		external_urls: { spotify: '/artist/poetify-artist-janis' },
		followers: { href: null, total: 900 },
		genres: ['blues', 'rock'],
		href: '/api/demo/artists/poetify-artist-janis',
			id: 'poetify-artist-janis',
			images: createImages('/assets/artists/poetify-artist-janis.jpg'),
			name: 'Janis Joplin (cover)',
		popularity: 50,
		type: 'artist',
		uri: 'poetify:artist:poetify-artist-janis',
	},
	{
		external_urls: { spotify: '/artist/poetify-artist-queen' },
		followers: { href: null, total: 1300 },
		genres: ['rock', 'classic rock'],
		href: '/api/demo/artists/poetify-artist-queen',
			id: 'poetify-artist-queen',
			images: createImages('/assets/artists/poetify-artist-queen.jpg'),
			name: 'Queen (cover)',
		popularity: 57,
		type: 'artist',
		uri: 'poetify:artist:poetify-artist-queen',
	},
	{
		external_urls: {
			spotify: '/artist/poetify-artist-joy-division',
		},
		followers: { href: null, total: 1000 },
		genres: ['post-punk', 'alternative'],
		href: '/api/demo/artists/poetify-artist-joy-division',
			id: 'poetify-artist-joy-division',
			images: createImages('/assets/artists/poetify-artist-joy-division.jpg'),
			name: 'Joy Division (cover)',
		popularity: 54,
		type: 'artist',
		uri: 'poetify:artist:poetify-artist-joy-division',
	},
	{
		external_urls: {
			spotify: '/artist/poetify-artist-the-prodigy',
		},
		followers: { href: null, total: 1400 },
		genres: ['electronic', 'breakbeat'],
		href: '/api/demo/artists/poetify-artist-the-prodigy',
			id: 'poetify-artist-the-prodigy',
			images: createImages('/assets/artists/poetify-artist-the-prodigy.jpg'),
			name: 'The Prodigy (cover)',
		popularity: 56,
		type: 'artist',
		uri: 'poetify:artist:poetify-artist-the-prodigy',
	},
	{
		external_urls: { spotify: '/artist/poetify-artist-feduk' },
		followers: { href: null, total: 900 },
		genres: ['hip-hop', 'pop'],
		href: '/api/demo/artists/poetify-artist-feduk',
			id: 'poetify-artist-feduk',
			images: createImages('/assets/artists/poetify-artist-feduk.jpg'),
			name: 'FEDUK (cover)',
		popularity: 52,
		type: 'artist',
		uri: 'poetify:artist:poetify-artist-feduk',
	},
	{
		external_urls: {
			spotify: '/artist/poetify-artist-poetify',
		},
		followers: { href: null, total: 0 },
		genres: ['demo'],
		href: '/api/demo/artists/poetify-artist-poetify',
			id: 'poetify-artist-poetify',
			images: createImages('/assets/artists/poetify-artist-poetify.jpg'),
			name: 'Poetify (demo)',
		popularity: 0,
		type: 'artist',
		uri: 'poetify:artist:poetify-artist-poetify',
	},
	];

export const sanitizeAlbum = (album: SpotifyAlbum): SpotifyAlbum => ({
	...album,
	tracks: { ...album.tracks, items: [] },
});

export const sanitizeTrack = <T extends SpotifyTrack>(track: T): T => ({
	...track,
	album: sanitizeAlbum(track.album),
	preview_url: track.preview_url ?? null,
	duration_ms:
		'preview_url' in track && track.preview_url
			? track.duration_ms
				: track.duration_ms,
	});

type DemoTrackSeed = {
	id: string;
	name: string;
	artistId: string;
	preview_url: string;
	duration_ms: number;
	explicit?: boolean;
};

const stripArtistSuffix = (name: string) =>
	name.replace(/\s*\(cover\)\s*$/, '').replace(/\s*\(demo\)\s*$/, '');

const albumIdFromArtistId = (artistId: string) =>
	`poetify-album-${artistId.replace(/^poetify-artist-/, '')}`;

const albumCoverPath = (albumId: string) => `/assets/covers/albums/${albumId}.jpg`;

const trackCoverPath = (trackId: string) => `/assets/covers/tracks/${trackId}.jpg`;

const demoArtistById = Object.fromEntries(
	demoArtists.map((artist) => [artist.id, artist] as const)
) as Record<string, SpotifyArtist>;

const demoTrackSeeds: DemoTrackSeed[] = [
	{
		id: 'poetify-track-heart-shaped-box-cover',
		name: 'Heart-Shaped Box (cover by Nirvana)',
		artistId: 'poetify-artist-nirvana',
		duration_ms: 142840,
		explicit: false,
		preview_url: '/music/ladies-and-gentlemen.wav',
	},
	{
		id: 'poetify-track-moonlight-cover',
		name: 'Moonlight (XXXTENTACION cover by Nirvana)',
		artistId: 'poetify-artist-nirvana',
		duration_ms: 142680,
		explicit: true,
		preview_url: '/music/yeah-2.wav',
	},
	{
		id: 'poetify-track-revenge-cover',
		name: 'Revenge (XXXTENTACION cover by Nirvana)',
		artistId: 'poetify-artist-nirvana',
		duration_ms: 150960,
		explicit: true,
		preview_url: '/music/revenge-xxxtentacion-nirvana.wav',
	},
	{
		id: 'poetify-track-shimmy-cover',
		name: 'Shimmy Shimmy Ya (Ol’ Dirty Bastard cover by Janis Joplin)',
		artistId: 'poetify-artist-janis',
		duration_ms: 294920,
		explicit: true,
		preview_url: '/music/shimmy-shimmy-ya-odb-janis-joplin.wav',
	},
	{
		id: 'poetify-track-all-along-the-watchtower-cover',
		name: 'All Along the Watchtower (Jimi Hendrix cover by MF DOOM)',
		artistId: 'poetify-artist-mf-doom',
		duration_ms: 134600,
		explicit: false,
		preview_url: '/music/All Along the Watchtower - Jimi Hendrix x MFDOOM.wav',
	},
	{
		id: 'poetify-track-blue-suede-shoes-cover',
		name: 'Blue Suede Shoes (Elvis Presley cover by The Prodigy)',
		artistId: 'poetify-artist-the-prodigy',
		duration_ms: 343680,
		explicit: false,
		preview_url: '/music/Blue Suede Shoes Elvis Presley x Prodigy.wav',
	},
	{
		id: 'poetify-track-cry-baby-cover',
		name: 'Cry Baby (Janis Joplin cover by MF DOOM)',
		artistId: 'poetify-artist-mf-doom',
		duration_ms: 187040,
		explicit: false,
		preview_url: '/music/Cry Baby Janis Joplin Х MFDOOM.wav',
	},
		{
			id: 'poetify-track-hippa-to-da-hoppa-cover',
			name: 'Hippa to Da Hoppa (Ol’ Dirty Bastard cover by Joy Division)',
			artistId: 'poetify-artist-joy-division',
			duration_ms: 226600,
		explicit: false,
		preview_url: '/music/Hippa to Da Hoppa Ol’ Dirty Bastard Х Joy Division.wav',
	},
	{
		id: 'poetify-track-i-love-rock-n-roll-cover',
		name: "I Love Rock ’n Roll (Joan Jett and the Blackhearts cover by MF DOOM)",
		artistId: 'poetify-artist-mf-doom',
		duration_ms: 202720,
		explicit: false,
		preview_url:
			'/music/I Love Rock ’n Roll Joan Jett and the Blackhearts x MFDOOM.wav',
	},
	{
		id: 'poetify-track-i-want-it-that-way-cover',
		name: 'I Want It That Way (Backstreet Boys cover by MF DOOM)',
		artistId: 'poetify-artist-mf-doom',
		duration_ms: 167960,
		explicit: false,
		preview_url: '/music/I Want It That Way Backstreet Boys x MFDOOM.wav',
	},
	{
		id: 'poetify-track-jamming-cover',
		name: 'Jamming (Bob Marley & The Wailers cover by Queen)',
		artistId: 'poetify-artist-queen',
		duration_ms: 259480,
		explicit: false,
		preview_url: '/music/Jamming Bob Marley & The Wailers x Queen.wav',
	},
	{
		id: 'poetify-track-out-of-space-cover',
		name: 'Out of Space (The Prodigy cover by Queen)',
		artistId: 'poetify-artist-queen',
		duration_ms: 478760,
		explicit: false,
		preview_url: '/music/Out of Space The Prodigy x Queen.wav',
	},
	{
		id: 'poetify-track-rapp-snitch-knishes-cover',
		name: 'Rapp Snitch Knishes (MF DOOM cover by Janis Joplin)',
		artistId: 'poetify-artist-janis',
		duration_ms: 349080,
		explicit: false,
		preview_url: '/music/Rapp Snitch Knishes MF DOOM x Janis Joplin.wav',
	},
	{
		id: 'poetify-track-riders-on-the-storm-cover',
		name: 'Riders on the Storm (The Doors cover by MF DOOM)',
		artistId: 'poetify-artist-mf-doom',
		duration_ms: 171480,
		explicit: false,
		preview_url: '/music/Riders on the Storm The Doors x MFDOOM.wav',
	},
		{
			id: 'poetify-track-were-rolling-suicide',
			name: 'We\'re rolling "Suicide" (System of a Down cover by MF DOOM)',
			artistId: 'poetify-artist-mf-doom',
			duration_ms: 146880,
			explicit: false,
			preview_url: '/music/We\'re rolling "Suicide".wav',
		},
	{
		id: 'poetify-track-den-rozhdeniya-cover',
		name: 'День рождения (Birthday) (Ленинград cover by Janis Joplin)',
		artistId: 'poetify-artist-janis',
		duration_ms: 196920,
		explicit: false,
		preview_url: '/music/День рождения (Birthday) Ленинград x Janis Joplin.wav',
	},
	{
		id: 'poetify-track-intro-griby-cover-v2',
		name: 'Интро (Intro) (Грибы (Griby) cover by Nirvana) (v2)',
		artistId: 'poetify-artist-nirvana',
		duration_ms: 189400,
		explicit: false,
		preview_url: '/music/Интро (Intro) Грибы (Griby) (Cover) x Nirvana-2.wav',
	},
	{
		id: 'poetify-track-intro-griby-cover',
		name: 'Интро (Intro) (Грибы (Griby) cover by Nirvana)',
		artistId: 'poetify-artist-nirvana',
		duration_ms: 204840,
		explicit: false,
		preview_url: '/music/Интро (Intro) Грибы (Griby) (Cover) x Nirvana.wav',
	},
	{
		id: 'poetify-track-okolofutbola',
		name: 'Околофутбола (Near Football)',
		artistId: 'poetify-artist-feduk',
		duration_ms: 109200,
		explicit: false,
		preview_url: '/music/Околофутбола (Near Football) FEDUK.mp3',
	},
];

const demoTrackCountByArtistId: Record<string, number> = demoTrackSeeds.reduce(
	(acc, track) => {
		acc[track.artistId] = (acc[track.artistId] ?? 0) + 1;
		return acc;
	},
	{} as Record<string, number>
);

const createArtistAlbum = ({
	artist,
	totalTracks,
}: {
	artist: SpotifyArtist;
	totalTracks: number;
}): SpotifyAlbum => {
	const albumId = albumIdFromArtistId(artist.id);
	return {
		album_type: 'album',
		total_tracks: totalTracks,
		external_urls: { spotify: `/album/${albumId}` },
		available_markets: ['US'],
		href: `/api/demo/albums/${albumId}`,
		id: albumId,
		images: createImages(albumCoverPath(albumId)),
		name: `POETIFY x ${stripArtistSuffix(artist.name)}`,
		release_date: DEMO_RELEASE_DATE,
		release_date_precision: 'day',
		type: 'album',
		uri: `poetify:album:${albumId}`,
		artists: [artist],
		tracks: {
			href: `/api/album/${albumId}/tracks`,
			limit: 50,
			next: null,
			offset: 0,
			previous: null,
			total: totalTracks,
			items: [],
		} as SpotifyPaginatedResponse<SpotifyTrack>,
		copyrights: [],
		label: 'Poetify demo',
		popularity: 55,
	};
};

const demoAlbumsByArtistId = Object.fromEntries(
	Object.entries(demoTrackCountByArtistId).map(([artistId, totalTracks]) => {
		const artist = demoArtistById[artistId];
		if (!artist) {
			throw new Error(`Missing artist for id: ${artistId}`);
		}
		return [artistId, createArtistAlbum({ artist, totalTracks })] as const;
	})
) as Record<string, SpotifyAlbum>;

export const demoAlbums: SpotifyAlbum[] = demoArtists
	.filter((artist) => demoAlbumsByArtistId[artist.id])
	.map((artist) => demoAlbumsByArtistId[artist.id]);

export const demoTracks: DemoTrack[] = (() => {
	const trackNumberByArtistId: Record<string, number> = {};
	return demoTrackSeeds.map((seed) => {
		const artist = demoArtistById[seed.artistId];
		const baseAlbum = demoAlbumsByArtistId[seed.artistId];

		const trackNumber = (trackNumberByArtistId[seed.artistId] ?? 0) + 1;
		trackNumberByArtistId[seed.artistId] = trackNumber;

			return {
				artists: [artist],
				album: { ...baseAlbum, images: createImages(trackCoverPath(seed.id)) },
				available_markets: ['US'],
			disc_number: 1,
			duration_ms: seed.duration_ms,
			explicit: seed.explicit ?? false,
			external_urls: { spotify: '#' },
			href: '#',
			id: seed.id,
			is_playable: true,
			name: seed.name,
				track_number: trackNumber,
				type: 'track',
				uri: `poetify:track:${seed.id}`,
				is_local: false,
				preview_url: withBasePath(seed.preview_url),
			};
		});
	})();

export const DEMO_PLAYLIST_URI = 'poetify:playlist:demo-playlist';

const playlistItems: SpotifyPlaylistItem[] = demoTracks.map((track) => ({
	added_at: DEMO_DATE_ISO,
	added_by: {
		external_urls: { spotify: '/user/demo-user' },
		href: '/api/demo/users/demo-user',
		id: 'demo-user',
		type: 'user',
		uri: 'poetify:user:demo-user',
	},
	is_local: false,
	primary_color: null,
	track,
}));

export const demoPlaylist: SpotifyPlaylist = {
	collaborative: false,
	description:
		'A birthday playlist of cross-artist covers for Nikita.',
	external_urls: { spotify: '/playlist/demo-playlist' },
	href: '/api/demo/playlists/demo-playlist',
	id: 'demo-playlist',
	images: createImages('/assets/covers/demo-playlist.jpg'),
	name: "for Nikita's Birthday",
	owner: {
		display_name: 'Poetify demo',
		external_urls: { spotify: '/user/demo-user' },
		href: '/api/demo/users/demo-user',
		id: 'demo-user',
		type: 'user',
		uri: 'poetify:user:demo-user',
	},
	primary_color: null,
	public: false,
	snapshot_id: 'demo-snapshot',
	tracks: {
		href: '/api/playlist/demo-playlist/tracks',
		items: playlistItems,
		limit: 50,
		next: null,
		offset: 0,
		previous: null,
		total: playlistItems.length,
	},
	type: 'playlist',
	uri: DEMO_PLAYLIST_URI,
};

export const demoLibraryAlbums: SpotifyLibraryAlbum[] = demoAlbums.map(
	(album: SpotifyAlbum) => ({
		added_at: DEMO_DATE_ISO,
		album: sanitizeAlbum(album),
	})
);

export const demoLikedSongs: SpotifyLibraryLikedSong[] = demoTracks.map(
	(track) => ({
		added_at: DEMO_DATE_ISO,
		track,
	})
);

export const demoRecentlyPlayed: SpotifyRecentlyPlayedItem[] = demoTracks.map(
	(track) => ({
		track,
		context: {
			type: 'playlist',
			href: '/api/demo/playlists/demo-playlist',
			external_urls: { spotify: '/playlist/demo-playlist' },
			uri: DEMO_PLAYLIST_URI,
		},
		played_at: DEMO_DATE_ISO,
	})
);

export const demoTopArtists = demoArtists.filter(
	(artist) => demoTrackCountByArtistId[artist.id]
);

export const demoUser: SpotifyCurrentUser = {
	id: 'demo-user',
	display_name: 'Nikita',
	email: 'demo@poetify.dev',
	country: 'GB',
	uri: 'poetify:user:demo-user',
	type: 'user',
	external_urls: { spotify: '/user/demo-user' },
	explicit_content: {
		filter_enabled: false,
		filter_locked: false,
	},
	followers: { href: null, total: 0 },
	href: '/api/demo/users/demo-user',
	images: createImages('/nikita.jpg.webp'),
	product: 'premium',
};

export const demoCategories = [
	{
		href: '/api/categories',
		id: 'demo-1',
		icons: createImages('/assets/covers/demo-album-nikita.jpg'),
		name: 'Covers',
	},
	{
		href: '/api/categories',
		id: 'demo-2',
		icons: createImages('/assets/covers/demo-album-nikita.jpg'),
		name: 'Birthday',
	},
	{
		href: '/api/categories',
		id: 'demo-3',
		icons: createImages('/assets/covers/demo-album-nikita.jpg'),
		name: 'Poetify Mix',
	},
];

export const demoPlaybackState = (): SpotifyPlaybackState => ({
	device: {
		id: 'demo-device',
		is_active: true,
		is_private_session: false,
		is_restricted: false,
		name: 'Poetify demo',
		type: 'Computer',
		volume_percent: 70,
		supports_volume: true,
	},
	shuffle_state: false,
	smart_shuffle: false,
	repeat_state: 'off',
	is_playing: false,
	timestamp: Date.now(),
	context: {
		type: 'playlist',
		href: '/api/demo/playlists/demo-playlist',
		external_urls: { spotify: '/playlist/demo-playlist' },
		uri: DEMO_PLAYLIST_URI,
	},
	progress_ms: 0,
	item: demoTracks[0],
	currently_playing_type: 'track',
});

export const getContextTracks = () => {
	const map: Record<string, DemoTrack[]> = {
		[DEMO_PLAYLIST_URI]: demoTracks,
	};

	demoTracks.forEach((track) => {
		map[track.album.uri] = map[track.album.uri]
			? [...map[track.album.uri], track]
			: [track];
	});

	map['poetify:collection:tracks'] = demoTracks;
	map['poetify:user:demo-user:collection'] = demoTracks;

	return map;
};
