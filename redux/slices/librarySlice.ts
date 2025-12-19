import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { LibraryState } from '@/types/library';
import {
	demoArtists,
	demoLibraryAlbums,
	demoLikedSongs,
	demoPlaylist,
	demoTopArtists,
	sanitizeTrack,
} from '@/mocks/demoData';
import { withBasePath } from '@/utils/basePath';

const initialState: LibraryState = {
	panel: {
		activeTab: 'playlists',
		tabs: [
			{
				type: 'playlists',
				label: 'Playlists',
			},
			{
				type: 'albums',
				label: 'Albums',
			},
			{
				type: 'tracks',
				label: 'Songs',
			},
			{
				type: 'artists',
				label: 'Artists',
			},
		],
	},
	playlists: {
		isLoading: true,
		pagination: null,
		items: [
			{
				id: 'liked-songs',
				name: 'Liked Songs',
					images: [
						{
							url: withBasePath('/liked-songs-300.jpg'),
						},
					],
				isPinned: true,
			},
		],
	},
	albums: {
		isLoading: true,
		pagination: null,
		items: [],
	},
	artists: {
		isLoading: true,
		items: [],
	},
	likedSongs: {
		isLoading: true,
		pagination: null,
		items: [],
	},
};

export const fetchUserPlaylists = createAsyncThunk(
	'library/fetchUserPlaylists',
	async ({ offset = 0, limit = 50 }: { offset?: number; limit?: number }) => {
		const items =
			offset > 0
				? []
				: [
						{
							...demoPlaylist,
							tracks: { ...demoPlaylist.tracks, items: [] },
						},
				  ];

		return {
			href: '/api/library/playlists',
			items,
			limit,
			offset,
			next: null,
			previous: null,
			total: 1,
		};
	}
);

export const fetchUserAlbums = createAsyncThunk(
	'library/fetchUserAlbums',
	async ({ offset = 0, limit = 50 }: { offset?: number; limit?: number }) => {
		return {
			href: '/api/library/albums',
			items: demoLibraryAlbums.slice(offset, offset + limit),
			limit,
			offset,
			next: null,
			previous: null,
			total: demoLibraryAlbums.length,
		};
	}
);

export const fetchUserLikedSongs = createAsyncThunk(
	'library/fetchUserLikedSongs',
	async ({ offset = 0, limit = 50 }: { offset?: number; limit?: number }) => {
		return {
			href: '/api/library/songs',
			items: demoLikedSongs.slice(offset, offset + limit).map((item) => ({
				...item,
				track: sanitizeTrack(item.track),
			})),
			limit,
			offset,
			next: null,
			previous: null,
			total: demoLikedSongs.length,
		};
	}
);

export const fetchFollowedArtists = createAsyncThunk(
	'library/fetchFollowedArtists',
	async ({ limit = 50 }: { limit?: number }) => ({
		artists: {
			href: '/api/library/artists',
			items: demoTopArtists.slice(0, limit),
			limit,
			next: null,
			offset: 0,
			previous: null,
			total: demoTopArtists.length,
		},
	})
);

export const followArtist = createAsyncThunk(
	'library/followArtist',
	async (id: string) => {
		return id;
	}
);

export const unfollowArtist = createAsyncThunk(
	'library/unfollowArtist',
	async (id: string) => {
		return id;
	}
);

const librarySlice = createSlice({
	name: 'library',
	initialState,
	reducers: {
		setActiveTab: (state, action) => {
			state.panel.activeTab = action.payload;
		},
	},
		extraReducers: (builder) => {
		builder.addCase(fetchUserPlaylists.rejected, (state) => {
			state.playlists.isLoading = false;
		});
		builder.addCase(fetchUserPlaylists.fulfilled, (state, action) => {
			state.playlists.isLoading = false;
			state.playlists.pagination = {
				href: action.payload.href,
				limit: action.payload.limit,
				offset: action.payload.offset,
				next: action.payload.next,
				previous: action.payload.previous,
				total: action.payload.total,
			};
			state.playlists.items = [
				...state.playlists.items,
				...action.payload.items,
			];
		});
		builder.addCase(fetchUserAlbums.rejected, (state) => {
			state.albums.isLoading = false;
		});
		builder.addCase(fetchUserAlbums.fulfilled, (state, action) => {
			state.albums.isLoading = false;
			state.albums.pagination = {
				href: action.payload.href,
				limit: action.payload.limit,
				offset: action.payload.offset,
				next: action.payload.next,
				previous: action.payload.previous,
				total: action.payload.total,
			};
			state.albums.items = [
				...state.albums.items,
				...action.payload.items,
			];
		});
		builder.addCase(fetchUserLikedSongs.rejected, (state) => {
			state.likedSongs.isLoading = false;
		});
		builder.addCase(fetchUserLikedSongs.fulfilled, (state, action) => {
			state.likedSongs.isLoading = false;
			state.likedSongs.pagination = {
				href: action.payload.href,
				limit: action.payload.limit,
				offset: action.payload.offset,
				next: action.payload.next,
				previous: action.payload.previous,
				total: action.payload.total,
			};
			state.likedSongs.items = [
				...state.likedSongs.items,
				...action.payload.items,
			];
		});
		builder.addCase(fetchFollowedArtists.rejected, (state) => {
			state.artists.isLoading = false;
		});
			builder.addCase(fetchFollowedArtists.fulfilled, (state, action) => {
				state.artists.isLoading = false;
				state.artists.items = action.payload.artists.items;
			});
			builder.addCase(followArtist.fulfilled, (state, action) => {
				const artist = demoArtists.find((item) => item.id === action.payload);
				if (!artist) {
					return;
				}
				const isAlreadyFollowed = state.artists.items.some(
					(item) => item.id === artist.id
				);
				if (!isAlreadyFollowed) {
					state.artists.items = [...state.artists.items, artist];
				}
			});
			builder.addCase(unfollowArtist.fulfilled, (state, action) => {
				state.artists.items = state.artists.items.filter(
					(artist) => artist.id !== action.payload
				);
			});
		},
	});

export const { setActiveTab } = librarySlice.actions;
export default librarySlice.reducer;
