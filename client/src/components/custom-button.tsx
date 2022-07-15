import React, { FC } from 'react';
import { Button, CircularProgress } from '@mui/material';

interface CustomButtonProps {
	sx?: object;
	fullWidth: boolean;
	isLoading: boolean;
	children: JSX.Element | string;
	type: 'button' | 'submit' | 'reset';
	variant: 'text' | 'outlined' | 'contained';
}

const CustomButton: FC<CustomButtonProps> = ({ children, sx, type, fullWidth, variant, isLoading }) => {
	return (
		<Button
			disabled={isLoading}
			type={type}
			fullWidth={fullWidth}
			variant={variant}
			sx={{ ...sx, mt: 3, mb: 2, height: '52px' }}>
			{isLoading ? <CircularProgress /> : children}
		</Button>
	);
};

export default CustomButton;
