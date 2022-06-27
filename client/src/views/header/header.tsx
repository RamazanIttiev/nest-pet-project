import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { CustomButton } from '../../components/button';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Header = () => {
	const location = useLocation();
	const [isOpened, setMenuOpen] = React.useState<boolean>(false);

	const handleMenuToggle = () => {
		setMenuOpen(!isOpened);
	};

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

					<Box>
						{location.pathname === '/' ? (
							<Tooltip title="Open settings">
								<IconButton onClick={handleMenuToggle} sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
								</IconButton>
							</Tooltip>
						) : (
							<Link
								style={{ textDecoration: 'none' }}
								to={location.pathname === '/register' ? '/login' : '/register'}>
								<CustomButton>{location.pathname === '/register' ? 'Login' : 'Sign Up'}</CustomButton>
							</Link>
						)}
						<Menu
							sx={{ mt: '45px' }}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={isOpened}
							onClose={handleMenuToggle}>
							{settings.map(setting => (
								<MenuItem key={setting} onClick={handleMenuToggle}>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
