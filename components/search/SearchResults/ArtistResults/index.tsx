import React from 'react';

import ItemGrid from '@/components/shared/ItemGrid';
import ArtistCard from '@/components/artist/ArtistCard';

import type { SpotifyArtist, SpotifyPaginatedResponse } from '@/types/spotify';

const ArtistResults = ({
	artists,
}: {
	artists: SpotifyPaginatedResponse<SpotifyArtist>;
}) => {
	const { items } = artists;
	return (
		<ItemGrid
			items={items}
			renderItem={(item) => (
				<ArtistCard
					id={item.id}
					name={item.name}
					imageUrl={item.images?.[0]?.url}
				/>
			)}
		/>
	);
};

export default ArtistResults;
