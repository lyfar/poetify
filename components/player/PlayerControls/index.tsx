import React from 'react';

import {
	FaCirclePause,
	FaCirclePlay,
	FaBackwardStep,
	FaForwardStep,
} from 'react-icons/fa6';
import { PiRepeatOnceBold, PiRepeatBold, PiShuffleBold } from 'react-icons/pi';

import ProgressBar from '../ProgressBar';
import ControlIcon from '../../shared/ControlIcon';

import usePlayerControls from '@/hooks/player/usePlayerControls';

import { useAppSelector } from '@/redux/hooks';
import { isUserPremium } from '@/redux/slices/userSlice';
import { DEMO_MODE } from '@/utils/demo';

const PlayerControls = () => {
	const {
		isPlaying,
		repeatState,
		shuffleState,
		pause,
		resume,
		seek,
		skipToNext,
		skipToPrevious,
		toggleShuffle,
		toggleRepeat,
	} = usePlayerControls();
	const userHasPremium = useAppSelector(isUserPremium);
	const controlsDisabled = !DEMO_MODE && !userHasPremium;

	return (
		<div
			className={`flex flex-col gap-6 lg:gap-2 justify-center items-center ${
				controlsDisabled
					? 'opacity-25 pointer-events-none cursor-not-allowed'
					: ''
			}`}
		>
			<div className="order-2 lg:order-1 flex w-full justify-between lg:w-auto lg:justify-center items-center gap-2 lg:gap-6">
				<ControlIcon
					title={`${shuffleState ? 'Disable' : 'Enable'} shuffle`}
					onClick={toggleShuffle}
					isActive={shuffleState}
					Icon={PiShuffleBold}
				/>
				<ControlIcon
					title="Previous"
					onClick={skipToPrevious}
					Icon={FaBackwardStep}
				/>
				<ControlIcon
					title={isPlaying ? 'Pause' : 'Play'}
					onClick={isPlaying ? pause : resume}
					Icon={isPlaying ? FaCirclePause : FaCirclePlay}
					isPrimary={true}
				/>
				<ControlIcon
					title="Next"
					onClick={skipToNext}
					Icon={FaForwardStep}
				/>
				<ControlIcon
					title={`${
						repeatState === 'track' ? 'Disable' : 'Enable'
					} repeat${repeatState === 'context' ? ' one' : ''}`}
					onClick={toggleRepeat}
					isActive={repeatState !== 'off'}
					Icon={
						repeatState === 'track'
							? PiRepeatOnceBold
							: PiRepeatBold
					}
				/>
			</div>
			<div className="order-1 lg:order-2 w-full">
				<ProgressBar onSeek={seek} />
			</div>
		</div>
	);
};

export default PlayerControls;
