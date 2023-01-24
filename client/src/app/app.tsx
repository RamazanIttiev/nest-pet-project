import React, { FC, useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from '../views/home/home';
import { SignUpContainer } from '../views/sign-up/containers/sign-up.container';
import { LoginContainer } from '../views/login/containers/login.container';
import { TasksContainer } from '../views/tasks/containers/tasks.container';
import { ProfileData } from '../models/profile.model';
import { RequireAuth } from '../utils/utils';
import { Alert, Backdrop, CircularProgress, Slide } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { TransitionProps } from '@mui/material/transitions';
import { AlertsModel } from '../models/alerts.model';
import { HeaderContainer } from '../views/header/containers/header.container';
import { Footer } from '../views/footer/footer';
import { SERVER_URL } from '../utils/helpers';

export const App: FC = () => {
	const location = useLocation();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<AlertsModel>({ message: '', severity: 'success' });
	const [profileData, setProfileData] = useState<ProfileData>({ phone: '', username: '', tasks: [] });

	const getProfile = useCallback(async () => {
		const data = await fetch(`${SERVER_URL}/profile`, {
			method: 'GET',
			credentials: 'include',
		});
		setIsLoading(false);

		return data
			.json()
			.then(profileData => {
				console.log(profileData);
				setProfileData(profileData);
			})
			.catch(() => handleError({ message: 'Something went wrong. Try to re-login', severity: 'error' }));
	}, []);

	useEffect(() => {
		setIsLoading(true);

		if (location.pathname === '/profile') {
			getProfile();
		}
	}, [getProfile, location.pathname]);

	const handleError = (error: AlertsModel) => {
		setError({ message: error.message, severity: error.severity });
	};

	const hideAlert = () => {
		setError({ message: '', severity: 'success' });
	};

	return (
		<>
			{location.pathname !== '/' && <HeaderContainer username={profileData.username} />}
			<Routes>
				<Route index element={<Home />} />
				<Route path="/register" element={<SignUpContainer handleError={handleError} />} />
				<Route path="/login" element={<LoginContainer handleError={handleError} />} />
				<Route
					path="/profile"
					element={
						<>
							{isLoading ? (
								<Backdrop open={isLoading}>
									<CircularProgress color="inherit" />
								</Backdrop>
							) : (
								<RequireAuth>
									<TasksContainer
										tasks={profileData.tasks}
										userPhone={profileData.phone}
										handleError={handleError}
										getProfile={getProfile}
									/>
								</RequireAuth>
							)}
						</>
					}
				/>
			</Routes>
			<Footer />
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				open={!!Boolean(error.message)}
				autoHideDuration={6000}
				onClose={hideAlert}
				TransitionComponent={(props: TransitionProps) => {
					return (
						<Slide
							{...props}
							direction="up"
							children={
								<Alert sx={{ width: '100%' }} severity={error.severity}>
									{error.message}
								</Alert>
							}
						/>
					);
				}}
			/>
		</>
	);
};
