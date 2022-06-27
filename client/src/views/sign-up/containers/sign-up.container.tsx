import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpFormComponent } from '../components/sign-up-form.component';
import { SignUpAsideComponent } from '../components/sign-up-aside.component';
import { Container, Grid } from '@mui/material';

export interface FormValues {
	name: string;
	phone: string;
	password: string;
}

const defaultValues: FormValues = {
	name: '',
	phone: '',
	password: '',
};

export const SignUpContainer: FC = () => {
	const [formData, setFormData] = useState(defaultValues);

	const createProfile = async (phone: string, username: string, password: string) => {
		const formattedPhoneNumber = Number(phone.replace(/[^+\d]+/g, ''));

		return await fetch('http://localhost:3001/register', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ phone: formattedPhoneNumber, username, password }),
		});
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({ defaultValues: formData, mode: 'onSubmit' });

	const onSubmit = handleSubmit((data: FormValues) => {
		createProfile(data.phone, data.name, data.password)
			.then(res => {
				console.log(res);
			})
			.catch(error => alert(error));

		setFormData(data);
		reset();
	});

	return (
		<Container maxWidth="lg">
			<Grid container sx={{ transform: 'translateY(50%)' }} spacing={8}>
				<Grid item md={6}>
					<SignUpFormComponent errors={errors} control={control} onSubmit={onSubmit} />
				</Grid>
				<Grid item md={6}>
					<SignUpAsideComponent />
				</Grid>
			</Grid>
		</Container>
	);
};
