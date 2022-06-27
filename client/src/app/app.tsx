import React, { FC } from 'react';

import { SignUpPage } from '../pages/sign-up.page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/home.page';
import { Header } from '../views/header/header';
import { LoginPage } from '../pages/login.page';

export const App: FC = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route index element={<HomePage />} />
				<Route path="/register" element={<SignUpPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
};
