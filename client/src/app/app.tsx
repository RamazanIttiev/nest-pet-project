import React, { FC, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../views/header/header';
import { HomeContainer } from '../views/home/containers/home.container';
import { SignUpContainer } from '../views/sign-up/containers/sign-up.container';
import { LoginContainer } from '../views/login/containers/login.container';
import { ProfileContainer } from '../views/profile/containers/profile.container';
import { Reminder } from '../models/profile.model';

export const App: FC = () => {
	const [reminders, setReminders] = useState<Reminder[]>([]);

	const handleReminders = useCallback((data: Reminder[]) => {
		localStorage.setItem('profileData', JSON.stringify(data));
	}, []);

	useEffect(() => {
		setReminders(JSON.parse(localStorage.getItem('reminders')));
	}, []);

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route index element={<HomeContainer />} />
				<Route path="/register" element={<SignUpContainer />} />
				<Route path="/login" element={<LoginContainer handleReminders={handleReminders} />} />
				<Route path="/profile" element={<ProfileContainer reminders={reminders} />} />
			</Routes>
		</BrowserRouter>
	);
};
