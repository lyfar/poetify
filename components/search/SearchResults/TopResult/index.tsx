import React from 'react';
import { useRouter } from 'next/navigation';

import type { SpotifyArtist } from '@/types/spotify';

const TopResult = ({
	id,
	imageUrl,
	name,
	type,
	artist,
}: {
	id: string;
	imageUrl: string;
	name: string;
	type: string;
	artist: SpotifyArtist;
}) => {
	const router = useRouter();
	return (
		<div className="flex flex-col gap-2">
			<span className="font-funnel font-bold text-2xl text-white">
				Top result
			</span>
			<div
				// Using router.push here to prevent link within link errors.
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					router.push(`/album/${id}`);
				}}
				className="transition-all duration-200 h-64 grid grid-rows-2 gap-2 bg-neutral-900 hover:bg-neutral-800 hover:cursor-pointer rounded-md p-6"
			>
				{imageUrl && (
					<div
						className="h-full aspect-square rounded bg-cover bg-center shadow-xl"
						style={{
							backgroundImage: `url(${imageUrl})`,
						}}
					></div>
				)}
				<div className="truncate flex flex-col gap-2 justify-center">
					<span className="truncate font-funnel text-white font-bold text-2xl md:text-3xl hover:underline">
						{name}
					</span>
					<div className="flex items-center text-sm font-funnel text-neutral-400">
						<span className="capitalize after:content-['•'] after:mx-1">
							{type}
						</span>
						<div
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								router.push(`/artist/${artist.id}`);
							}}
							className="hover:underline text-white"
						>
							{artist.name}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopResult;
