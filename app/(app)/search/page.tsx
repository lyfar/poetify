import React, { Suspense } from 'react';

import { BiSolidCategory } from 'react-icons/bi';

import Loader from '@/components/shared/Loader';
import SearchPageClient from '@/components/search/SearchPageClient';

const Browse = () => {
	return (
		<Suspense fallback={<Loader />}>
			<SearchPageClient browseIcon={<BiSolidCategory className="w-6 h-6 lg:w-8 lg:h-8" />} />
		</Suspense>
	);
};

export default Browse;
