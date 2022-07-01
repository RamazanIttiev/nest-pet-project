import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from '../pages/home.page';
import { Header } from '../views/header/header';
import { LoginPage } from '../pages/login.page';
import { ProfilePage } from '../pages/profile.page';
import { SignUpPage } from '../pages/sign-up.page';

export const App: FC = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route index element={<HomePage />} />
				<Route path="/register" element={<SignUpPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/profile" element={<ProfilePage />} />
			</Routes>
		</BrowserRouter>
	);
};
