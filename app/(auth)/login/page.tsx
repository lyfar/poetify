import React from 'react';

import Logo from '@/components/shared/Logo';

import Button from '@/components/shared/Button';
import { withBasePath } from '@/utils/basePath';

const Login = async () => {
	const backgroundImageUrl = withBasePath('/assets/login-bg.jpg');

	return (
		<div className="h-full flex items-center relative">
			<div
				className="blur-xs sm:blur-none absolute inset-0 bg-cover bg-center opacity-50"
				style={{
					backgroundImage: `url(${backgroundImageUrl})`,
				}}
			></div>
			<div className="absolute inset-0 bg-black/50"></div>

			<div className="relative z-10 py-4 md:py-0 flex gap-4 w-full h-full md:px-8 flex-col md:flex-row justify-start md:justify-between items-center">
				<div className="flex-1 order-2 md:order-1 flex flex-col justify-center items-center md:items-start gap-3 w-auto">
					<span className="font-funnel font-black text-white text-4xl lg:text-5xl">
						Welcome back
					</span>
					<Button
						href="/"
						isPrimary={true}
						text="Log in with Spotify"
					/>
				</div>
				<div className="order-1 md:order-2">
					<Logo className="text-xl sm:text-2xl md:text-4xl lg:text-5xl" />
				</div>
			</div>
		</div>
	);
};

export default Login;
