'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import CategoriesGrid from '@/components/categories/CategoriesGrid';
import SearchBar from '@/components/search/SearchBar';
import SearchResults from '@/components/search/SearchResults';

import {
	demoAlbums,
	demoArtists,
	demoPlaylist,
	demoTracks,
	sanitizeAlbum,
	sanitizeTrack,
} from '@/mocks/demoData';

import type { SearchResultsData } from '@/types/search';
import type {
	SpotifyAlbum,
	SpotifyArtist,
	SpotifyPaginatedResponse,
	SpotifyPlaylist,
	SpotifyTrack,
} from '@/types/spotify';

const SearchPageClient = ({ browseIcon }: { browseIcon?: React.ReactNode }) => {
	const searchParams = useSearchParams();
	const query = (searchParams.get('query') ?? '').trim();
	const normalizedQuery = query.toLowerCase();

	const results: SearchResultsData | null = useMemo(() => {
		if (!normalizedQuery) {
			return null;
		}

		const buildCollection = <T,>(
			items: T[],
			href: string
		): SpotifyPaginatedResponse<T> => ({
			href,
			limit: items.length,
			offset: 0,
			next: null,
			previous: null,
			total: items.length,
			items,
		});

		const trackResults: SpotifyTrack[] = demoTracks
			.filter((track) => {
				return (
					track.name.toLowerCase().includes(normalizedQuery) ||
					track.artists.some((artist) =>
						artist.name.toLowerCase().includes(normalizedQuery)
					) ||
					track.album.name.toLowerCase().includes(normalizedQuery)
				);
			})
			.map((track) => sanitizeTrack(track));

		const artistResults: SpotifyArtist[] = demoArtists.filter((artist) =>
			artist.name.toLowerCase().includes(normalizedQuery)
		);

		const albumResults: SpotifyAlbum[] = demoAlbums
			.filter((album) => {
				return (
					album.name.toLowerCase().includes(normalizedQuery) ||
					album.artists.some((artist) =>
						artist.name.toLowerCase().includes(normalizedQuery)
					)
				);
			})
			.map((album) => sanitizeAlbum(album));

		const playlistResults: SpotifyPlaylist[] =
			demoPlaylist.name.toLowerCase().includes(normalizedQuery) ||
			demoPlaylist.description.toLowerCase().includes(normalizedQuery)
				? [demoPlaylist]
				: [];

		return {
			tracks: buildCollection(trackResults, 'poetify:search:tracks'),
			artists: buildCollection(artistResults, 'poetify:search:artists'),
			albums: buildCollection(albumResults, 'poetify:search:albums'),
			playlists: buildCollection(playlistResults, 'poetify:search:playlists'),
		};
	}, [normalizedQuery]);

	if (results) {
		return <SearchResults query={query} data={results} />;
	}

	return (
		<div className="h-full grid grid-rows-[auto_1fr] gap-4">
			<div className="px-4 lg:px-8 pt-4 lg:pt-8 flex flex-col gap-2">
				<div className="flex justify-start items-center py-1 gap-2 lg:gap-2 text-white">
					{browseIcon}
					<span className="font-funnel text-lg lg:text-2xl font-bold">
						Browse all
					</span>
				</div>
				<div className="lg:hidden h-11">
					<SearchBar value={query} />
				</div>
			</div>
			<CategoriesGrid />
		</div>
	);
};

export default SearchPageClient;

