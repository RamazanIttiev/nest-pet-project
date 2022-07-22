import React, { FC } from 'react';
import { Box, Container, Link, Typography } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

export const Footer: FC = () => {
	return (
		<Container
			maxWidth="lg"
			component="footer"
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
				p: '16px',
			}}>
			<Typography
				sx={{
					fontSize: '12px',
					color: '#0000006e',
				}}>
				Created by &nbsp;
				<Link color="#0000006e" target="_blank" href="https://github.com/RamazanIttiev">
					Ramazan Ittiev
				</Link>
			</Typography>
			<Box
				sx={{
					display: 'flex',
				}}>
				<Link
					sx={{ width: '24px', height: '24px', display: 'block', mr: 1 }}
					target="_blank"
					href="https://github.com/RamazanIttiev">
					<GitHub sx={{ width: '100%' }} />
				</Link>
				<Link
					sx={{ width: '24px', height: '24px', display: 'block' }}
					target="_blank"
					href="https://www.linkedin.com/mwlite/in/ramazan-ittiev">
					<LinkedIn sx={{ width: '100%' }} />
				</Link>
			</Box>
		</Container>
	);
};
