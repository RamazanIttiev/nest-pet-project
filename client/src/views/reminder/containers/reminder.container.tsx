import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { ReminderComponent } from '../components/reminder.component';
import { useForm } from 'react-hook-form';
import { DialogState } from '../../../models/dialog.model';
import { Reminders } from '../../../models/reminders.model';

export const ReminderContainer: FC = memo(() => {
	const [reminders, setReminders] = useState<Reminders[]>([]);
	const [dialog, setDialog] = useState({ state: 'edit', opened: false });

	useEffect(() => {
		setReminders(JSON.parse(localStorage.getItem('reminders')));
	}, []);

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors, dirtyFields },
		reset,
	} = useForm<{ title: string; date: Date }>({ mode: 'onSubmit' });

	const onSubmit = handleSubmit((data: { title: string; date: Date }) => {
		console.log(dirtyFields);
		reset();
	});

	const handleClose = () => {
		setDialog({ state: 'edit', opened: false });
	};

	const handleOpen = useCallback(
		(openState: DialogState) => () => {
			console.log(openState.state);
			setDialog({ state: openState.state, opened: openState.opened });
		},
		[setDialog],
	);

	return (
		<Container>
			<Grid container spacing={8} justifyContent="center" padding={'64px 0'}>
				<ReminderComponent
					dialog={dialog}
					errors={errors}
					control={control}
					onSubmit={onSubmit}
					setValue={setValue}
					reminders={reminders}
					handleOpen={handleOpen}
					handleClose={handleClose}
				/>
			</Grid>
		</Container>
	);
});
