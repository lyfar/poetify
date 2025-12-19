import React from 'react';

import ItemGrid from '@/components/shared/ItemGrid';
import PlaylistCard from '@/components/playlist/PlaylistCard';

import type {
	SpotifyPaginatedResponse,
	SpotifyPlaylist,
} from '@/types/spotify';

const PlaylistResults = ({
	playlists,
}: {
	playlists: SpotifyPaginatedResponse<SpotifyPlaylist>;
}) => {
	const { items } = playlists;
	return (
		<ItemGrid
			items={items}
			renderItem={(item) =>
				item ? (
					<PlaylistCard
						id={item.id}
						imageUrl={item.images?.[0]?.url}
						name={item.name}
						owner={item.owner.display_name ?? item.owner.id}
					/>
				) : null
			}
		/>
	);
};

export default PlaylistResults;
