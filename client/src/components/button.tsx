import React, { FC } from 'react';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

interface CustomButtonProps {
	children: React.ReactNode;
	location: string;
	handleMenuToggle: () => void;
}

export const CustomButton: FC<CustomButtonProps> = ({ children, location, handleMenuToggle }) => {
	return (
		<Button>
			{location === '/' ? (
				<IconButton onClick={handleMenuToggle} sx={{ p: 0 }}>
					<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
				</IconButton>
			) : (
				<Typography color="#fff">{children}</Typography>
			)}
		</Button>
	);
};
