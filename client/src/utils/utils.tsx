import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
	error: string;
	component: JSX.Element;
}
export const RequireAuth: FC<RequireAuthProps> = ({ error, component }) => {
	let location = useLocation();
	if (error === 'error') {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return component;
};
