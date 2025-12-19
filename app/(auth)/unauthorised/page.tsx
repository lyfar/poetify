'use client';
import React from 'react';

import useLogOut from '@/hooks/auth/useLogOut';

import Button from '@/components/shared/Button';
import Logo from '@/components/shared/Logo';
import { withBasePath } from '@/utils/basePath';

const Unauthorised = () => {
	const logOut = useLogOut();
	const backgroundImageUrl = withBasePath('/assets/login-bg.jpg');

	return (
		<div className="relative flex justify-center items-center h-full">
			<div
				className="blur-xs absolute inset-0 bg-cover bg-center opacity-50"
				style={{
					backgroundImage: `url(${backgroundImageUrl})`,
				}}
			></div>
			<div className="absolute inset-0 bg-black/60"></div>
			<div className="relative flex justify-center items-center bg-black w-full sm:w-auto rounded-md px-10 py-8">
				<div className="text-center flex flex-col items-center gap-3">
					<Logo className="text-xl lg:text-2xl leading-none" />
					<span className="py-1 font-funnel font-bold text-2xl sm:text-3xl text-white">
						Not authorised
					</span>
					<span className="font-funnel text-sm text-neutral-200">
						This Poetify build does not support external logins.
					</span>
					<Button
						onClick={logOut}
						text="Back to login"
						className="my-2"
					/>
				</div>
			</div>
		</div>
	);
};

export default Unauthorised;
