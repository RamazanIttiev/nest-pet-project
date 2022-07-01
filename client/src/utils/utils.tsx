import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
	let isLoggedIn = localStorage.getItem('accessToken');
	let location = useLocation();

	if (!JSON.parse(isLoggedIn)) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};
