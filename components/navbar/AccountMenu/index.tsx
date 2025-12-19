import React from 'react';

import AccountMenuItem from './AccountMenuItem';

import useLogOut from '@/hooks/auth/useLogOut';

import { useAppSelector } from '@/redux/hooks';

interface Props {
	onClose: () => void;
}

const AccountMenu = ({ onClose }: Props) => {
	const user = useAppSelector((state) => state.user);
	const logOut = useLogOut();

	return (
		<div className="absolute right-0 mt-[0.35rem] w-48 bg-neutral-800 rounded-md shadow-lg z-[100]">
			<div className="p-1 flex flex-col justify-center items-start">
				<AccountMenuItem
					onClick={onClose}
					href={`/user/${user.id}`}
					label="Profile"
				/>
				<div className="w-full border-t border-neutral-500"></div>
				<AccountMenuItem onClick={logOut} label="Log out" />
			</div>
		</div>
	);
};

export default AccountMenu;
