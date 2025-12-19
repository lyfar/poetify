import React from 'react';
import dayjs from 'dayjs';

import ItemCard from '@/components/shared/ItemCard';

import type { SpotifyAlbumType, SpotifyArtist } from '@/types/spotify';

const DiscographyCard = ({
	id,
	type,
	imageUrl,
	artists,
	name,
	releaseDate,
}: {
	id: string;
	type: SpotifyAlbumType;
	imageUrl?: string;
	artists?: SpotifyArtist[];
	name: string;
	releaseDate: string;
}) => {
	return (
		<ItemCard
			type={type}
			href={`/album/${id}`}
			imageUrl={imageUrl}
			name={name}
		>
			<div>
				<span className="after:content-['•'] after:mx-1">
					{dayjs(releaseDate).format('MMMM D YYYY')}
				</span>

				{artists && artists?.length > 0 ? (
					<span>
						{artists.map((artist) => artist.name).join(', ')}
					</span>
				) : (
					<span className="capitalize">{type}</span>
				)}
			</div>
		</ItemCard>
	);
};

export default DiscographyCard;
