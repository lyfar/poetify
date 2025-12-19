import React from 'react';

interface LogoProps {
	className?: string;
	light?: boolean;
	dark?: boolean;
}

const Logo = ({ className, light = false, dark = false }: LogoProps) => {
	return (
		<span
			className={`select-none leading-none font-unbounded font-black ${
				light
					? 'text-neutral-500'
					: dark
					? 'text-black'
					: 'text-spotify-green'
			} ${className}`}
		>
			POET
			<span
				className={`font-extralight ${
					dark
						? 'text-black'
						: light
						? 'text-neutral-500'
						: 'text-white'
				} ${className}`}
			>
				IFY
			</span>
		</span>
	);
};

export default Logo;
