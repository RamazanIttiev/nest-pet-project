import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../views/header/header';
import { HomeContainer } from '../views/home/containers/home.container';
import { SignUpContainer } from '../views/sign-up/containers/sign-up.container';
import { LoginContainer } from '../views/login/containers/login.container';
import { ReminderContainer } from '../views/reminder/containers/reminder.container';

export const App: FC = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route index element={<HomeContainer />} />
				<Route path="/register" element={<SignUpContainer />} />
				<Route path="/login" element={<LoginContainer />} />
				<Route path="/reminders" element={<ReminderContainer />} />
			</Routes>
		</BrowserRouter>
	);
};
