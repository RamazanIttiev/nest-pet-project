import React, { FC, memo, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { RemindersComponent } from '../components/reminders.component';
import { Reminder } from '../../../models/profile.model';
import { AddReminderDialog } from '../../../components/add-reminder-dialog';
import { AddReminderButton } from '../../../components/add-reminder-button';
import { AlertsModel } from '../../../models/alerts.model';

interface RemindersContainerProps {
	userPhone: string;
	reminders: Reminder[];
	getProfile: () => void;
	handleError: (error: AlertsModel) => void;
}

export const RemindersContainer: FC<RemindersContainerProps> = memo(
	({ userPhone, reminders, getProfile, handleError }) => {
		const [dialog, setDialog] = useState(false);

		const {
			control,
			register,
			handleSubmit,
			setValue,
			formState: { errors },
			reset,
		} = useForm<Reminder>({
			mode: 'onSubmit',
			defaultValues: { title: '', date: new Date(new Date().setHours(new Date().getHours() + 1)) },
		});

		const onSubmit = handleSubmit(async (reminder: Reminder) => {
			await fetch(`${process.env.REACT_APP_SERVER_URL}/add-reminder`, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({ phone: userPhone, reminder }),
			});
			await getProfile();

			reset();
			closeAddDialog();
		});

		const closeAddDialog = () => {
			setDialog(false);
		};

		const openAddDialog = () => {
			setDialog(true);
		};

		const completeReminder = async (reminder: string) => {
			await deleteReminder(reminder);

			handleError({ message: 'You have completed your reminder', severity: 'success' });
		};

		const deleteReminder = async (reminder: string) => {
			await fetch(`${process.env.REACT_APP_SERVER_URL}/delete-reminder`, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
				credentials: 'include',
				body: JSON.stringify({ phone: userPhone, reminder }),
			});
			await getProfile();

			handleError({ message: 'You have removed your reminder', severity: 'success' });
		};

		return (
			<Container>
				<Grid container spacing={8} justifyContent="center" padding={'64px 0'}>
					<RemindersComponent
						dialog={dialog}
						errors={errors}
						control={control}
						onSubmit={onSubmit}
						register={register}
						setValue={setValue}
						reminders={reminders}
						deleteReminder={deleteReminder}
						completeReminder={completeReminder}
					/>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column',
							justifyContent: 'space-evenly',
							position: 'absolute',
							top: '81px',
							right: '50%',
							transform: 'translateX(50%)',
						}}>
						{reminders.length === 0 && <Typography mb={1}>Add your first reminder</Typography>}
						<AddReminderButton
							styles={{
								width: '100%',
								height: '32px',
							}}
							openAddDialog={openAddDialog}
						/>
					</Box>
					<AddReminderDialog
						dialog={dialog}
						errors={errors}
						control={control}
						onSubmit={onSubmit}
						setValue={setValue}
						register={register}
						closeAddDialog={closeAddDialog}
					/>
				</Grid>
			</Container>
		);
	},
);
