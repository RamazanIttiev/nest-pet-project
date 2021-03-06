import React, { FC } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import { Controller, UseFormRegister } from 'react-hook-form';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AddFormProps } from '../models/form.model';
import { Task } from '../models/profile.model';

interface AddTaskProps extends AddFormProps {
	dialog: boolean;
	closeAddDialog: () => void;
	register: UseFormRegister<Task>;
}

export const AddTaskDialog: FC<AddTaskProps> = ({
													dialog,
													register,
													closeAddDialog,
													control,
													setValue,
													errors,
													onSubmit,
												}) => {
	return (
		<Dialog open={dialog} onClose={closeAddDialog}>
			<Box sx={{ pt: 2 }}>
				<Typography variant="h6" component="h4" textAlign="center">
					Add your task
				</Typography>
				<form onSubmit={onSubmit}>
					<DialogContent>
						<TextField
							{...register('title', {
								required: 'Minimum 3 letters.',
								pattern: /^.{3,}$/,
								maxLength: 80,
							})}
							autoFocus
							fullWidth
							multiline
							sx={{ mb: 2 }}
							autoComplete="off"
							error={!!errors?.title}
							placeholder="Add your task"
							helperText={errors?.title && errors?.title.message}
						/>
						<Controller
							name="date"
							control={control}
							render={({ field }) => (
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<MobileDateTimePicker
										label="Date and time"
										ampm={false}
										value={field.value}
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
						<Button onClick={closeAddDialog}>Cancel</Button>
						<Button type="submit">Add</Button>
					</DialogActions>
				</form>
			</Box>
		</Dialog>
	);
};
