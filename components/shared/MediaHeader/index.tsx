'use client';
import React from 'react';

import HeroHeader from '../HeroHeader';
import CollectionControls from '@/components/collection/CollectionControls';

import { useAppSelector } from '@/redux/hooks';
import { getNowPlaying } from '@/redux/slices/playerSlice';

import type { SpotifyAlbumType, SpotifyArtist } from '@/types/spotify';

const MediaHeader = ({
	imageUrl,
	type,
	height = 'h-fit md:h-72',
	gradientFrom = 'from-neutral-600',
	gradientTo = 'to-neutral-800',
	title,
	contextUri,
	showBlurredBackground = true,
	children,
	actions,
}: {
	imageUrl?: string;
	type: SpotifyAlbumType | 'playlist' | 'artist';
	height?: string;
	gradientFrom?: string;
	gradientTo?: string;
	title: string;
	contextUri: string;
	showBlurredBackground?: boolean;
	children?: React.ReactNode;
	actions?: React.ReactNode;
}) => {
	const { item, context, hasInteracted = false } = useAppSelector(getNowPlaying);
	const nowPlayingImageUrl = item?.album?.images?.[0]?.url;
	const nowPlayingContextUri = context?.uri;
	const isNowPlayingInThisContext =
		nowPlayingContextUri === contextUri ||
		(type === 'artist' &&
			!!item?.artists?.some(
				(artist: SpotifyArtist) => artist.uri === contextUri
			));
	const resolvedImageUrl =
		hasInteracted && nowPlayingImageUrl && isNowPlayingInThisContext
			? nowPlayingImageUrl
			: imageUrl;

	return (
		<HeroHeader
			imageUrl={resolvedImageUrl}
			actions={
				<>
					<CollectionControls contextUri={contextUri} />
					{actions}
				</>
			}
			type={type}
			title={title}
			height={height}
			gradientFrom={gradientFrom}
			gradientTo={gradientTo}
			showBlurredBackground={showBlurredBackground}
		>
			{children}
		</HeroHeader>
	);
};

export default MediaHeader;
