import React, { FC, memo, useCallback, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ProfileComponent } from '../components/profile.component';
import { Reminder } from '../../../models/profile.model';
import { EditFormValues } from '../../../models/form.model';

interface RemindersContainerProps {
	userPhone: string;
	reminders: Reminder[];
	getProfile: () => void;
}

export const ProfileContainer: FC<RemindersContainerProps> = memo(({ userPhone, reminders, getProfile }) => {
	const [dialog, setDialog] = useState(false);

	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		reset,
	} = useForm<EditFormValues>({
		mode: 'onSubmit',
		defaultValues: { title: '', date: new Date(new Date().setHours(new Date().getHours() + 1)) },
	});

	const onSubmit = handleSubmit((data: EditFormValues) => {
		reset();
		handleClose();
	});

	const handleClose = () => {
		setDialog(false);
	};

	const handleOpen = useCallback(() => {
		setDialog(true);
	}, [setDialog]);

	const deleteReminder = async (reminder: string) => {
		await fetch(`${process.env.REACT_APP_SERVER_URL}/delete-reminder`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'DELETE',
			credentials: 'include',
			body: JSON.stringify({ phone: userPhone, reminder }),
		});
		getProfile();
	};

	return (
		<Container>
			<Grid container spacing={8} justifyContent="center" padding={'64px 0'}>
				<ProfileComponent
					dialog={dialog}
					errors={errors}
					control={control}
					onSubmit={onSubmit}
					register={register}
					setValue={setValue}
					reminders={reminders}
					handleOpen={handleOpen}
					handleClose={handleClose}
					deleteReminder={deleteReminder}
				/>
			</Grid>
		</Container>
	);
});
