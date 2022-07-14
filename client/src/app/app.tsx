import React, { FC, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from '../views/header/header';
import { HomeContainer } from '../views/home/containers/home.container';
import { SignUpContainer } from '../views/sign-up/containers/sign-up.container';
import { LoginContainer } from '../views/login/containers/login.container';
import { ProfileContainer } from '../views/profile/containers/profile.container';
import { ProfileData } from '../models/profile.model';

export const App: FC = () => {
	const location = useLocation();
	const [profileData, setProfileData] = useState<ProfileData>({ phone: '', username: '', reminders: [] });

	useEffect(() => {
		if (location.pathname === '/profile') {
			fetch('http://localhost:3001/profile', {
				method: 'GET',
				credentials: 'include',
			})
				.then(response => {
					return response.json();
				})
				.then(profileData => {
					return setProfileData(profileData);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}, [location.pathname]);

	return (
		<>
			<Header />
			<Routes>
				<Route index element={<HomeContainer />} />
				<Route path="/register" element={<SignUpContainer />} />
				<Route path="/login" element={<LoginContainer />} />
				<Route path="/profile" element={<ProfileContainer reminders={profileData.reminders} />} />
			</Routes>
		</>
	);
};
