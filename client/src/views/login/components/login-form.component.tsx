import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowDownward } from '@mui/icons-material';
import NumberFormat from 'react-number-format';
import { ReactHookFormProps } from '../../../models/form.model';

export const LoginFormComponent: FC<ReactHookFormProps> = ({ errors, control, onSubmit }) => {
	return (
		<Paper
			sx={{
				p: 8,
				top: '50%',
				left: '50%',
				maxWidth: '500px',
				position: 'absolute',
				transform: 'translate(-50%, -50%)',
			}}>
			<Typography component="h1" variant="h5" textAlign="center" margin="16px 0">
				Login
			</Typography>
			<Typography component="div" variant="body1" textAlign="center" marginBottom="16px">
				Don't have an account? <Link to="/register">Sign up here</Link>
			</Typography>

			<ArrowDownward sx={{ display: 'block', margin: '0 auto' }} />
			<form onSubmit={onSubmit}>
				<Controller
					name="phone"
					control={control}
					rules={{
						required: 'Phone number is required.',
						pattern: {
							value: /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/g,
							message: 'Invalid phone number',
						},
					}}
					render={({ field }) => (
						<NumberFormat
							mask=""
							{...field}
							fullWidth
							type="tel"
							prefix={'+7'}
							label="Phone"
							id={field.name}
							margin="normal"
							name={field.name}
							autoComplete="off"
							error={!!errors?.phone}
							customInput={TextField}
							format="+7 ### ### ## ##"
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
							value: /^(?=.*[a-zA-Zа-яА-Я]).{8,}$/i,
							message: 'Password must contain at least 8 symbols',
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
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
					Login
				</Button>
			</form>
		</Paper>
	);
};
