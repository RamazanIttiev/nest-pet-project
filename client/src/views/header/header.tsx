import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { CustomLink } from '../../components/custom-link';
import { buttonLabel, buttonPath } from '../../utils/helpers';

export const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const settings = [
		{
			title: 'Log Out',
			callback: () => {
				localStorage.removeItem('reminders');
				setAnchorEl(null);
				navigate('/');
			},
		},
	];

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

					<Box sx={{ display: 'flex' }}>
						{location.pathname === '/profile' ? (
							<Tooltip title="Open settings">
								<IconButton
									aria-controls={open ? 'basic-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={open ? 'true' : undefined}
									onClick={handleMenuOpen}
									sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
								</IconButton>
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
							open={open}
							onClose={handleClose}
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
