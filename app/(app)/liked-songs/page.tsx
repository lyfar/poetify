'use client';
import React from 'react';

import PlaylistHeader from '@/components/playlist/PlaylistHeader';
import CollectionTracklist from '@/components/collection/CollectionTracklist';
import InfiniteScrollContainer from '@/components/shared/InfiniteScrollContainer';

import useInfiniteScroll from '@/hooks/shared/useInfiniteScroll';
import useLikedSongs from '@/hooks/library/useLikedSongs';

import { useAppSelector } from '@/redux/hooks';
import { withBasePath } from '@/utils/basePath';

const LikedSongs = () => {
	const { likedSongs, fetchPaginatedLikedSongs } = useLikedSongs();
	const user = useAppSelector((state) => state.user);

	const { loadMore, hasMore } = useInfiniteScroll(
		likedSongs.pagination,
		fetchPaginatedLikedSongs
	);

	if (!user || !likedSongs || !likedSongs.pagination) {
		return null;
	}

	return (
			<InfiniteScrollContainer hasMore={hasMore} next={loadMore}>
				<PlaylistHeader
					isLikedSongs={true}
					imageUrl={withBasePath('/liked-songs-300.jpg')}
					contextUri={`${user.uri}:collection`}
					name="Liked Songs"
					owner={{ id: user.id!, displayName: user.displayName }}
					totalTracks={likedSongs.pagination.total}
			/>
			<CollectionTracklist
				type="playlist"
				tracks={likedSongs.items}
				contextUri={`${user.uri}:collection`}
			/>
		</InfiniteScrollContainer>
	);
};

export default LikedSongs;
