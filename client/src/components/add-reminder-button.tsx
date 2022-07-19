import React, { FC } from 'react';
import { Button } from '@mui/material';

interface AddReminderButtonProps {
	styles?: object;
	openAddDialog: () => void;
}

export const AddReminderButton: FC<AddReminderButtonProps> = ({ openAddDialog, styles }) => {
	return (
		<Button
			variant="outlined"
			sx={{
				height: '100%',
				fontSize: '32px',
				...styles,
			}}
			onClick={openAddDialog}>
			+
		</Button>
	);
};
