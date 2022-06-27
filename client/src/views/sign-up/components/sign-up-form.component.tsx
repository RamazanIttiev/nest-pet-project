import React, { FC } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { FormValues } from '../containers/sign-up.container';
import { Button, TextField } from '@mui/material';

// TODO: check if the types for useForm values are correct
interface SignUpFormProps {
	errors: FieldErrors<FormValues>;
	control: Control<FormValues, any>;
	onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}

export const SignUpFormComponent: FC<SignUpFormProps> = ({ errors, control, onSubmit }) => {
	return (
		<>
			<h1>Create your account :)</h1>
			<form onSubmit={onSubmit}>
				<Controller
					name="name"
					control={control}
					rules={{ required: 'Name is required.' }}
					render={({ field }) => (
						<TextField
							{...field}
							autoFocus
							fullWidth
							label="Name"
							id={field.name}
							margin="normal"
							name={field.name}
							autoComplete="off"
							error={!!errors?.name}
							helperText={errors?.name && errors?.name.message}
						/>
					)}
				/>
				<Controller
					name="phone"
					control={control}
					rules={{
						required: 'Phone number is required.',
						pattern: {
							value: /^[+]7*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
							message: 'Invalid phone number',
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							autoFocus
							fullWidth
							label="Phone"
							id={field.name}
							margin="normal"
							name={field.name}
							autoComplete="off"
							error={!!errors?.phone}
							helperText={errors?.phone && errors?.phone.message}
						/>
					)}
				/>
				<Controller
					name="password"
					control={control}
					rules={{
						required: 'Password is required.',
						pattern: {
							value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i,
							message: 'Follow password requirements.',
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							autoFocus
							fullWidth
							id={field.name}
							type="password"
							margin="normal"
							label="Password"
							name={field.name}
							autoComplete="off"
							error={!!errors?.password}
							helperText={errors?.password && errors?.password.message}
						/>
					)}
				/>

				<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
					Sign In
				</Button>
			</form>
		</>
	);
};
