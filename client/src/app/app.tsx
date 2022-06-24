import React, { FC } from 'react';

import { SignUpPage } from '../pages/sign-up.page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/home.page';

export const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/register" element={<SignUpPage />} />
			</Routes>
		</BrowserRouter>
	);
};
