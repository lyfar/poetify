import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';

import MiniPlayer from '../MiniPlayer';
import MobilePlayer from '../MobilePlayer';

import usePlayer from '@/hooks/player/usePlayer';
import { useAppSelector } from '@/redux/hooks';
import { getNowPlaying } from '@/redux/slices/playerSlice';

const MobilePlayerContainer = () => {
	usePlayer();
	const {
		isPlaying = false,
		isActive = false,
		isPrivate = false,
		isPodcast = false,
		item,
	} = useAppSelector(getNowPlaying);
	const [isExpanded, setIsExpanded] = useState(false);

	if (
		(!isPlaying && !isActive) ||
		(isActive && !isPlaying && !item) ||
		isPodcast ||
		isPrivate
	) {
		return null;
	}

	return (
		<>
			<div
				onClick={() => setIsExpanded(true)}
				className="fixed left-0 right-0 bottom-20 px-2 z-40"
			>
				<MiniPlayer />
			</div>

			{createPortal(
				<AnimatePresence>
					{isExpanded && (
						<motion.div
							key="mobile-player"
							className="lg:hidden fixed inset-0 z-50 w-screen min-h-[100dvh] overflow-hidden"
							initial={{ y: '100%' }}
							animate={{ y: 0 }}
							exit={{ y: '100%' }}
							transition={{
								type: 'spring',
								stiffness: 400,
								damping: 50,
							}}
						>
							<MobilePlayer
								onClose={() => setIsExpanded(false)}
							/>
						</motion.div>
					)}
				</AnimatePresence>,
				document.body
			)}
		</>
	);
};

export default MobilePlayerContainer;
