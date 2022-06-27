import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { CustomButton } from '../../components/button';
import { useLocation } from 'react-router-dom';

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
						<Tooltip title="Open settings">
							<CustomButton location={location.pathname} handleMenuToggle={handleMenuToggle}>
								{location.pathname === '/register' ? 'Login' : 'Sign Up'}
							</CustomButton>
						</Tooltip>
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
