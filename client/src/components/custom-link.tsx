import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface CustomLinkProps {
	children: React.ReactNode;
	location: string;
	styles?: object;
}

export const CustomLink: FC<CustomLinkProps> = ({ children, location, styles }) => {
	const LinkStyles = {
		textDecoration: 'none',
		padding: '16px',
		...styles,
	};
	return (
		<Link style={LinkStyles} to={location}>
			<Typography color="#fff">{children}</Typography>
		</Link>
	);
};
