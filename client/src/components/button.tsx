import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

interface CustomButtonProps {
	children: React.ReactNode;
}

export const CustomButton: FC<CustomButtonProps> = ({ children }) => {
	return (
		<Button>
			<Typography color="#fff">{children}</Typography>
		</Button>
	);
};
