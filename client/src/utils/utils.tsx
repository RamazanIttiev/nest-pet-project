import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
	let isLoggedIn = localStorage.getItem('isAuthenticated');
	let location = useLocation();

	if (!JSON.parse(isLoggedIn)) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return children;
};
