import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { AddReminderButton } from '../../../components/add-reminder-button';

interface EmptyRemindersComponentProps {
	openAddDialog: () => void;
}

export const EmptyRemindersComponent: FC<EmptyRemindersComponentProps> = ({ openAddDialog }) => {
	console.log('empty');
	return (
		<Box
			sx={{
				width: '30%',
				display: 'flex',
				padding: '16px 0',
				alignItems: 'center',
				justifyContent: 'space-evenly',
			}}>
			<Typography>Add your first reminder</Typography>
			<AddReminderButton openAddDialog={openAddDialog} />
		</Box>
	);
};
