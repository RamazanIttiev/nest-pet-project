import * as React from 'react';
import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { CustomLink } from '../../../components/custom-link';
import { buttonLabel, buttonPath } from '../../../utils/helpers';

import AvatarIcon from '../../../assets/avatar.svg';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface HeaderComponentProps {
	username: string;
	anchorEl: HTMLElement;
	isMenuOpened: boolean;
	handleMenuClose: () => void;
	settings: { title: string; callback: () => Promise<void> }[];
	handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const HeaderComponent: FC<HeaderComponentProps> = ({
	username,
	settings,
	anchorEl,
	isMenuOpened,
	handleMenuOpen,
	handleMenuClose,
}) => {
	const location = useLocation();

	return (
		<AppBar position="static">
			<Container maxWidth="lg">
				<Toolbar
					disableGutters
					sx={{
						justifyContent: 'space-between',
					}}>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}>
						LOGO
					</Typography>

					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						{location.pathname === '/profile' ? (
							<Tooltip title="Open settings">
								<Button
									aria-haspopup="true"
									onClick={handleMenuOpen}
									aria-expanded={isMenuOpened ? 'true' : undefined}
									aria-controls={isMenuOpened ? 'basic-menu' : undefined}
									sx={{ p: 0 }}>
									<>
										<Typography color={'#fff'} mr={1}>
											{username}
										</Typography>
										<Avatar sx={{ border: '1px solid #fff' }} alt={username} src={AvatarIcon} />
									</>
								</Button>
							</Tooltip>
						) : location.pathname === '/' ? (
							<>
								<CustomLink
									styles={{
										marginRight: '16px',
									}}
									location="/login">
									Login
								</CustomLink>
								<CustomLink
									styles={{
										marginRight: '16px',
									}}
									location="/register">
									Sign Up
								</CustomLink>
							</>
						) : (
							<CustomLink location={buttonPath(buttonLabel(location.pathname))}>
								{buttonLabel(location.pathname)}
							</CustomLink>
						)}
						<Menu
							sx={{ mt: '45px' }}
							open={isMenuOpened}
							onClose={handleMenuClose}
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}>
							{settings.map(setting => (
								<MenuItem key={setting.title} onClick={setting.callback}>
									<Typography textAlign="center">{setting.title}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
