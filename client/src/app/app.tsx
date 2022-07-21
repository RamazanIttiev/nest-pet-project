import React, { FC, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from '../views/home/home';
import { SignUpContainer } from '../views/sign-up/containers/sign-up.container';
import { LoginContainer } from '../views/login/containers/login.container';
import { RemindersContainer } from '../views/reminders/containers/reminders.container';
import { ProfileData } from '../models/profile.model';
import { RequireAuth } from '../utils/utils';
import { Alert, Backdrop, CircularProgress, Slide } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { TransitionProps } from '@mui/material/transitions';
import { AlertsModel } from '../models/alerts.model';
import { HeaderContainer } from '../views/header/containers/header.container';
import { Footer } from '../views/footer/footer';

export const App: FC = () => {
	const location = useLocation();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<AlertsModel>({ message: '', severity: 'success' });
	const [profileData, setProfileData] = useState<ProfileData>({ phone: '', username: '', reminders: [] });

	useEffect(() => {
		setIsLoading(true);

		if (location.pathname === '/profile') {
			getProfile();
		}
	}, [location.pathname]);

	const getProfile = async () => {
		await fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, {
			method: 'GET',
			credentials: 'include',
		})
			.then(response => {
				if (response.ok) {
					setIsLoading(false);
					return response.json();
				} else {
					return setError({ message: 'Something went wrong', severity: 'error' });
				}
			})
			.then(profileData => {
				return setProfileData(profileData);
			})
			.catch(() => {
				return setError({ message: 'Something went wrong. Try to re-login', severity: 'error' });
			});
	};

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
									<RemindersContainer
										reminders={profileData.reminders}
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
