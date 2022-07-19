import React, { FC } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Delete, Done } from '@mui/icons-material';
import { AddFormProps } from '../../../models/form.model';
import { Reminder } from '../../../models/profile.model';
import { UseFormRegister } from 'react-hook-form';

interface RemindersComponentProps extends AddFormProps {
	dialog: boolean;
	reminders: Reminder[];
	register: UseFormRegister<Reminder>;
	deleteReminder: (reminder: string) => Promise<void>;
	completeReminder: (reminder: string) => Promise<void>;
}

export const RemindersComponent: FC<RemindersComponentProps> = ({ reminders, deleteReminder, completeReminder }) => {
	return (
		<>
			{reminders.map(reminder => (
				<Grid key={reminder.title} item md={4} sm={6} xs={11}>
					<Card>
						<CardActionArea
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
							<Button onClick={() => completeReminder(reminder.title)}>
								<Done />
							</Button>
							<Button onClick={() => deleteReminder(reminder.title)}>
								<Delete />
							</Button>
						</CardActions>
					</Card>
				</Grid>
			))}
		</>
	);
};
