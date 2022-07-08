import React, { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { EditFormProps } from '../models/form.model';
import { DialogState } from '../models/dialog.model';

interface EditDialogProps extends EditFormProps {
	dialog: DialogState;
	handleClose: () => void;
	handleOpen: (openState: DialogState) => () => void;
}

export const EditDialog: FC<EditDialogProps> = ({ dialog, handleClose, control, setValue, errors, onSubmit }) => {
	return (
		<Dialog open={dialog.opened} onClose={handleClose}>
			<Typography variant="h6" component="h4" textAlign="center">
				Edit your reminder
			</Typography>
			<form onSubmit={onSubmit}>
				<DialogContent>
					<Controller
						name="title"
						control={control}
						rules={{ required: 'Title is required.' }}
						render={({ field }) => (
							<TextField
								{...field}
								autoFocus
								fullWidth
								multiline
								sx={{ mb: 2 }}
								autoComplete="off"
								error={!!errors?.title}
								placeholder="Add your reminder"
								helperText={errors?.title && errors?.title.message}
							/>
						)}
					/>
					<Controller
						name="date"
						control={control}
						render={({ field }) => (
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									label="Basic example"
									value={field.value}
									inputFormat={'dd/MM/yyyy'}
									onChange={newValue => {
										setValue(field.name, newValue);
									}}
									renderInput={params => <TextField fullWidth {...params} />}
								/>
							</LocalizationProvider>
						)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit">Subscribe</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
