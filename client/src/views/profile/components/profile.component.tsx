import React, { FC } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Delete, Done } from '@mui/icons-material';
import { EditFormProps, EditFormValues } from '../../../models/form.model';
import { Reminder } from '../../../models/profile.model';
import { UseFormRegister } from 'react-hook-form';
import { AddReminder } from '../../../components/add-reminder';

interface ProfileComponentProps extends EditFormProps {
	dialog: boolean;
	reminders: Reminder[];
	handleClose: () => void;
	register: UseFormRegister<EditFormValues>;
	handleOpen: () => void;
}

export const ProfileComponent: FC<ProfileComponentProps> = ({
	dialog,
	handleOpen,
	register,
	handleClose,
	reminders,
	control,
	setValue,
	errors,
	onSubmit,
}) => {
	return (
		<>
			{reminders ? (
				reminders.map(reminder => {
					return (
						<Grid key={reminder.title} item md={4} sm={6} xs={11}>
							<Card>
								<CardActionArea
									onClick={handleOpen}
									sx={{
										minHeight: 100,
										overflow: 'scroll',
										display: 'flex',
										alignItems: 'baseline',
										justifyContent: 'start',
									}}>
									<CardContent>
										<Typography variant="h5" component="h3">
											{reminder.title}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions sx={{ justifyContent: 'center' }}>
									<Button>
										<Done />
									</Button>
									<Button>
										<Delete />
									</Button>
								</CardActions>
							</Card>
						</Grid>
					);
				})
			) : (
				<div>No reminders</div>
			)}

			<AddReminder
				dialog={dialog}
				errors={errors}
				control={control}
				onSubmit={onSubmit}
				setValue={setValue}
				register={register}
				handleOpen={handleOpen}
				handleClose={handleClose}
			/>
		</>
	);
};
