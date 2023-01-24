import * as React from 'react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderComponent } from '../components/header.component';
import { SERVER_URL } from '../../../utils/helpers';

interface HeaderContainerProps {
	username: string;
}

export const HeaderContainer: FC<HeaderContainerProps> = ({ username }) => {
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const isMenuOpened = Boolean(anchorEl);

	const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		setAnchorEl(null);

		localStorage.removeItem('isAuthenticated');

		await fetch(`${SERVER_URL}/logout`, {
			method: 'GET',
			credentials: 'include',
		});

		navigate('/');
	};

	const settings = [
		{
			title: 'Log Out',
			callback: handleLogout,
		},
	];

	return (
		<HeaderComponent
			username={username}
			anchorEl={anchorEl}
			settings={settings}
			isMenuOpened={isMenuOpened}
			handleMenuOpen={handleMenuOpen}
			handleMenuClose={handleMenuClose}
		/>
	);
};
