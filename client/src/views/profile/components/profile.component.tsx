import React from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Delete, Done, Edit } from '@mui/icons-material';

export const ProfileComponent = () => {
	return (
		<Card>
			<CardActionArea
				sx={{
					minHeight: 150,
					overflow: 'scroll',
					display: 'flex',
					alignItems: 'baseline',
					justifyContent: 'start',
				}}>
				<CardContent>
					<Typography variant="h5" component="h3">
						My reminder
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions sx={{ justifyContent: 'center' }}>
				<Button>
					<Done />
				</Button>
				<Button>
					<Edit />
				</Button>
				<Button>
					<Delete />
				</Button>
			</CardActions>
		</Card>
	);
};
