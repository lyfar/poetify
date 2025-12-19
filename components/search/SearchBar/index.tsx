'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

const SearchBar = ({ value = '' }: { value?: string }) => {
	const [query, setQuery] = useState(value);
	const router = useRouter();

	useEffect(() => {
		setQuery(value);
	}, [value]);

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const normalized = query.trim();
		if (!normalized) {
			router.push('/search');
			return;
		}
		router.push(`/search?query=${encodeURIComponent(normalized)}`);
	};

	return (
		<form
			onSubmit={handleSearch}
			className="h-full w-full lg:w-96 relative group"
		>
			<label
				htmlFor="search"
				className="absolute inset-y-0 left-0 flex items-center pl-3 text-spotify-black lg:text-neutral-400 lg:group-focus-within:text-white lg:group-hover:text-white group-hover:cursor-pointer"
			>
				<HiMiniMagnifyingGlass size={25} />
			</label>
			<input
				id="search"
				placeholder="What do you want to play?"
				value={query}
				className="truncate text-black lg:text-white transition-all duration-200 rounded-md lg:rounded-full bg-white lg:bg-neutral-800 h-full w-full lg:focus:w-96 lg:w-96 pl-11 font-funnel text-sm font-medium placeholder-spotify-black lg:placeholder-neutral-400 focus:outline-none focus:ring-2 lg:focus:ring-white focus:border-transparent lg:group-hover:bg-neutral-700"
				type="text"
				onChange={(e) => setQuery(e.target.value)}
			/>
		</form>
	);
};

export default SearchBar;
