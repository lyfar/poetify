import '../globals.css';

import AppLayout from '@/layouts/AppLayout';

import { demoUser } from '@/mocks/demoData';

import StoreProvider from '@/redux/StoreProvider';
import { preloadedAuthState } from '@/redux/slices/authSlice';
import { preloadedUserState } from '@/redux/slices/userSlice';

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const currentUser = demoUser;

	return (
		<StoreProvider
			preloadedState={{
				auth: preloadedAuthState(true),
				user: preloadedUserState(currentUser),
			}}
		>
			<AppLayout>{children}</AppLayout>
		</StoreProvider>
	);
}
