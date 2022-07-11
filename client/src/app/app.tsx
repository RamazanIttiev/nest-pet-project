import React, { FC, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../views/header/header';
import { HomeContainer } from '../views/home/containers/home.container';
import { SignUpContainer } from '../views/sign-up/containers/sign-up.container';
import { LoginContainer } from '../views/login/containers/login.container';
import { ReminderContainer } from '../views/reminder/containers/reminder.container';
import { Reminders } from '../models/reminders.model';

export const App: FC = () => {
	const [reminders, setReminders] = useState<Reminders[]>([]);

	const handleReminders = useCallback((data: Reminders[]) => {
		localStorage.setItem('reminders', JSON.stringify(data));
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
				<Route path="/reminders" element={<ReminderContainer reminders={reminders} />} />
			</Routes>
		</BrowserRouter>
	);
};
