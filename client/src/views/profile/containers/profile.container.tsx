import React from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

const ProfileContainer = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-evenly',
				marginTop: '100px',
			}}>
			<Card
				sx={{
					maxWidth: '350px',
					width: '350px',
					'&.MuiPaper-root-MuiCard-root': {
						borderRadius: '24px',
					},
				}}>
				<CardActionArea>
					<CardContent>
						<Typography variant="h5" component="div">
							My reminder
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button>Edit</Button>
					<Button>Delete</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

export default ProfileContainer;
