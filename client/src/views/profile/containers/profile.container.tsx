import React from 'react';
import { Grid } from '@mui/material';
import { ProfileComponent } from '../components/profile.component';

const ProfileContainer = () => {
	return (
		<Grid container spacing={8} justifyContent="center" padding={'64px 0'}>
			<Grid item md={4} sm={6} xs={11}>
				<ProfileComponent />
			</Grid>
			<Grid item md={4} sm={6} xs={11}>
				<ProfileComponent />
			</Grid>
			<Grid item md={4} sm={6} xs={11}>
				<ProfileComponent />
			</Grid>
			<Grid item md={4} sm={6} xs={11}>
				<ProfileComponent />
			</Grid>
			<Grid item md={4} sm={6} xs={11}>
				<ProfileComponent />
			</Grid>
		</Grid>
	);
};

export default ProfileContainer;
