import React from 'react';

import CollectionTracklist from '@/components/collection/CollectionTracklist';

import type { SpotifyPaginatedResponse, SpotifyTrack } from '@/types/spotify';

const TrackResults = ({
	tracks,
}: {
	tracks: SpotifyPaginatedResponse<SpotifyTrack>;
}) => {
	const { items } = tracks;
	return <CollectionTracklist type="results" tracks={items} />;
};

export default TrackResults;
