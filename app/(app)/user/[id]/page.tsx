import React from 'react';
import { redirect } from 'next/navigation';

import { demoUser } from '@/mocks/demoData';

import UserContainer from '@/components/user/UserContainer';

export const dynamicParams = false;

export const generateStaticParams = async () => [{ id: demoUser.id }];

const User = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	if (id !== demoUser.id) {
		redirect('/');
	}

	return (
		<UserContainer
			id={demoUser.id}
			imageUrl={demoUser.images?.[0]?.url}
			displayName={demoUser.display_name}
			followers={demoUser.followers}
		/>
	);
};

export default User;
