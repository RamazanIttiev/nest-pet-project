import React, { FC } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Delete, Done, Edit } from '@mui/icons-material';
import { EditDialog } from '../../../components/edit-dialog';
import { EditFormProps } from '../../../models/form.model';
import { DialogState } from '../../../models/dialog.model';
import { Reminders } from '../../../models/reminders.model';

interface ProfileComponentProps extends EditFormProps {
	dialog: DialogState;
	reminders: Reminders[];
	handleClose: () => void;
	handleOpen: (openState: DialogState) => () => void;
}

export const ReminderComponent: FC<ProfileComponentProps> = ({
	dialog,
	handleOpen,
	handleClose,
	reminders,
	control,
	setValue,
	errors,
	onSubmit,
}) => {
	return (
		<>
			{reminders.map(reminder => {
				return (
					<Grid item md={4} sm={6} xs={11}>
						<Card>
							<CardActionArea
								onClick={handleOpen({ state: 'edit', opened: true })}
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
								<Button onClick={handleOpen({ state: 'edit', opened: true })}>
									<Edit />
								</Button>
								<Button>
									<Delete />
								</Button>
							</CardActions>
						</Card>
					</Grid>
				);
			})}

			<EditDialog
				dialog={dialog}
				errors={errors}
				control={control}
				onSubmit={onSubmit}
				setValue={setValue}
				handleOpen={handleOpen}
				handleClose={handleClose}
			/>
		</>
	);
};
