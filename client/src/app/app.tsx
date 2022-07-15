import React, { FC, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from '../views/header/header';
import { HomeContainer } from '../views/home/containers/home.container';
import { SignUpContainer } from '../views/sign-up/containers/sign-up.container';
import { LoginContainer } from '../views/login/containers/login.container';
import { ProfileContainer } from '../views/profile/containers/profile.container';
import { ProfileData } from '../models/profile.model';
import { RequireAuth } from '../utils/utils';
import { Backdrop, CircularProgress } from '@mui/material';

export const App: FC = () => {
	const location = useLocation();

	const [isLoading, setIsLoading] = useState(false);
	const [profileData, setProfileData] = useState<ProfileData>({ phone: '', username: '', reminders: [] });

	useEffect(() => {
		setIsLoading(true);

		if (location.pathname === '/profile') {
			fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, {
				method: 'GET',
				credentials: 'include',
			})
				.then(response => {
					if (response.ok) {
						setIsLoading(false);
						return response.json();
					}
					throw new Error('Something went wrong');
				})
				.then(profileData => {
					return setProfileData(profileData);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}, [location.pathname]);

	const clearProfile = () => {
		setProfileData({ phone: '', username: '', reminders: [] });
	};

	return (
		<>
			<Header clearProfile={clearProfile} username={profileData.username} />
			<Routes>
				<Route index element={<HomeContainer />} />
				<Route path="/register" element={<SignUpContainer />} />
				<Route path="/login" element={<LoginContainer />} />
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
									<ProfileContainer reminders={profileData.reminders} />
								</RequireAuth>
							)}
						</>
					}
				/>
			</Routes>
		</>
	);
};
