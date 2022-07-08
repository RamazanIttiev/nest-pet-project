import React, { FC } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Delete, Done, Edit } from '@mui/icons-material';
import { EditDialog } from '../../../components/edit-dialog';
import { EditFormProps } from '../../../models/form.model';
import { DialogState } from '../../../models/dialog.model';

interface ProfileComponentProps extends EditFormProps {
	dialog: DialogState;
	handleClose: () => void;
	handleOpen: (openState: DialogState) => () => void;
}

export const ReminderComponent: FC<ProfileComponentProps> = ({
	dialog,
	handleOpen,
	handleClose,
	control,
	setValue,
	errors,
	onSubmit,
}) => {
	return (
		<>
			<Card>
				<CardActionArea
					onClick={handleOpen({ state: 'edit', opened: true })}
					sx={{
						minHeight: 150,
						overflow: 'scroll',
						display: 'flex',
						alignItems: 'baseline',
						justifyContent: 'start',
					}}>
					<CardContent>
						<Typography variant="h5" component="h3">
							My reminder
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
