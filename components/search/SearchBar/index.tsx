'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

const SEARCH_PATH = '/search';

const normalizePathname = (pathname: string | null) =>
	(pathname ?? '').replace(/\/$/, '');

const getQueryFromWindow = () => {
	if (typeof window === 'undefined') {
		return '';
	}
	try {
		return (new URLSearchParams(window.location.search).get('query') ?? '').trim();
	} catch {
		return '';
	}
};

const SearchBar = ({ value }: { value?: string }) => {
	const [query, setQuery] = useState(value ?? '');
	const router = useRouter();
	const pathname = usePathname();
	const normalizedPathname = normalizePathname(pathname);
	const isSearchPage = normalizedPathname.endsWith(SEARCH_PATH);

	useEffect(() => {
		if (typeof value === 'string') {
			setQuery(value);
			return;
		}

		if (isSearchPage) {
			setQuery(getQueryFromWindow());
		}
	}, [value, isSearchPage]);

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const normalized = query.trim();
		if (!normalized) {
			router.push(SEARCH_PATH);
			return;
		}
		router.push(`${SEARCH_PATH}?query=${encodeURIComponent(normalized)}`);
	};

	useEffect(() => {
		const normalized = query.trim();
		if (!isSearchPage) {
			return;
		}

		const queryFromUrl = getQueryFromWindow();
		if (normalized === queryFromUrl) {
			return;
		}

		const timer = window.setTimeout(() => {
			if (!normalized) {
				router.replace(SEARCH_PATH);
				return;
			}
			router.replace(`${SEARCH_PATH}?query=${encodeURIComponent(normalized)}`);
		}, 200);

		return () => window.clearTimeout(timer);
	}, [query, isSearchPage, pathname, router]);

	const handleFocus = () => {
		if (!isSearchPage) {
			router.push(SEARCH_PATH);
		}
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
				onFocus={handleFocus}
				onChange={(e) => setQuery(e.target.value)}
			/>
		</form>
	);
};

export default SearchBar;
