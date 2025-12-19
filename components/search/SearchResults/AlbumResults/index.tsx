import React from 'react';

import ItemGrid from '@/components/shared/ItemGrid';
import DiscographyItemCard from '@/components/artist/Discography/DiscographyCard';

import type { SpotifyAlbum, SpotifyPaginatedResponse } from '@/types/spotify';

const AlbumResults = ({
	albums,
}: {
	albums: SpotifyPaginatedResponse<SpotifyAlbum>;
}) => {
	const { items } = albums;
	return (
		<ItemGrid
			items={items}
			renderItem={(item) => (
				<DiscographyItemCard
					id={item.id}
					imageUrl={item.images?.[0]?.url}
					name={item.name}
					releaseDate={item.release_date}
					artists={item.artists}
					type={item.album_type}
				/>
			)}
		/>
	);
};

export default AlbumResults;
