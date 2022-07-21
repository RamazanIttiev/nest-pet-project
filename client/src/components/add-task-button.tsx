import React, { FC } from 'react';
import { Button } from '@mui/material';

interface AddTaskButtonProps {
	styles?: object;
	openAddDialog: () => void;
}

export const AddTaskButton: FC<AddTaskButtonProps> = ({ openAddDialog, styles }) => {
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
