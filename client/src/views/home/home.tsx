import React, { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import './theme/header.css';
import CustomButton from '../../components/custom-button';

export const Home: FC = () => {
	return (
		<Grid container pb={8}>
			<Grid item md={7} xs={0}>
				<Box
					sx={{
						position: 'relative',
						textAlign: 'center',
						color: '#fff',
						background: 'linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%)',
					}}>
					<Box
						sx={{
							height: '65vh',
							width: '100%',
							margin: '0',
							display: 'flex',
							justifyContent: 'center',
							textAlign: 'start',
							flexDirection: 'column',
							padding: '0 24px',
						}}>
						<Typography component="h1" variant="h3">
							Welcome!
						</Typography>
						<Typography
							sx={{
								color: '#0000006e',
								width: '80%',
								mt: 2,
							}}>
							{/*Here you can create an account that I will be securely stored in database. Also, you can add*/}
							{/*your personal tasks and get notified via sms on the date and time that you have set*/}
							Here you can create an account that I will be securely stored in database. Also, you can add
							your personal tasks that will be linked to your account and be accessible on any logged in
							device
						</Typography>
					</Box>

					<svg
						className="waves"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						viewBox="0 24 150 28"
						preserveAspectRatio="none"
						shape-rendering="auto">
						<defs>
							<path
								id="gentle-wave"
								d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
							/>
						</defs>
						<g className="parallax">
							<use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
							<use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
							<use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
							<use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
						</g>
					</svg>
				</Box>
			</Grid>
			<Grid
				item
				md={5}
				xs={12}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					p: '0 64px',
				}}>
				<CustomButton href="/register" type="submit" variant="contained">
					Sign In
				</CustomButton>
				<Typography
					sx={{
						position: 'relative',

						'&:before, &:after': {
							content: '""',
							width: '40%',
							height: '1px',
							display: 'block',
							position: 'absolute',
							top: '13px',
							background: '#0000006e',
						},

						'&:after': {
							right: 0,
						},
					}}
					textAlign="center">
					or
				</Typography>
				<CustomButton href="/login" type="submit" variant="contained">
					Log In
				</CustomButton>
			</Grid>
		</Grid>
	);
};
