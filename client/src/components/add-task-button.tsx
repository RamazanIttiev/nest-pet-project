import React, { FC } from 'react';
import { Button } from '@mui/material';

interface AddTaskButtonProps {
	styles?: object;
	openAddDialog: () => void;
}

export const AddTaskButton: FC<AddTaskButtonProps> = ({ openAddDialog }) => {
	return (
		<Button size={'large'} variant="outlined" onClick={openAddDialog}>
			+
		</Button>
	);
};
