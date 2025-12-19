'use client';
import React, { useState } from 'react';

import Loader from '@/components/shared/Loader';
import Tab from '@/components/shared/Tab';
import InfoMessage from '@/components/shared/InfoMessage';
import AllResults from './AllResults';
import PlaylistResults from './PlaylistResults';
import AlbumResults from './AlbumResults';
import ArtistResults from './ArtistResults';
import TrackResults from './TrackResults';
import SearchBar from '../SearchBar';

import useSearchTabs from '@/hooks/search/useSearchTabs';

import type { SearchResultsData, SearchTabType } from '@/types/search';

const SearchResults = ({
	query,
	data,
}: {
	query: string;
	data: SearchResultsData;
}) => {
	const [activeTab, setActiveTab] = useState<SearchTabType>('results');
	const tabs = useSearchTabs(data);

	const changeActiveTab = (type: SearchTabType) => {
		setActiveTab(type);
	};

	const currentTab = tabs[activeTab];

	if (!currentTab) {
		return null;
	}

	const { tracks, albums, artists, playlists } = data;
	const hasAnyResults =
		tracks.items.length > 0 ||
		albums.items.length > 0 ||
		artists.items.length > 0 ||
		playlists.items.length > 0;

	return (
		<div className="flex flex-col gap-6 p-4 lg:p-6">
			<div className="lg:hidden h-11">
				<SearchBar value={query} />
			</div>
			<div className="flex items-center gap-2">
				{Object.entries(tabs).map(([type, { label }]) => (
					<Tab
						key={type}
						label={label}
						isActive={type === activeTab}
						onClick={() => changeActiveTab(type as SearchTabType)}
					/>
				))}
				</div>
				{!hasAnyResults ? (
					<div className="h-[45vh]">
						<InfoMessage label={`No results for “${query}”.`} />
					</div>
				) : activeTab === 'results' ? (
					<AllResults data={data} />
				) : activeTab === 'tracks' ? (
					<TrackResults tracks={tracks} />
				) : activeTab === 'artists' ? (
					<ArtistResults artists={artists} />
				) : activeTab === 'albums' ? (
					<AlbumResults albums={albums} />
				) : activeTab === 'playlists' ? (
					<PlaylistResults playlists={playlists} />
				) : (
					<Loader />
				)}
			</div>
	);
};

export default SearchResults;
