import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../../models/form.model';
import { LoginFormComponent } from '../components/login-form.component';

const defaultValues: Omit<FormValues, 'name'> = {
	phone: '',
	password: '',
};

export const LoginContainer = () => {
	const [formData, setFormData] = useState(defaultValues);

	const createProfile = async (phone: string, username: string, password: string) => {
		const formattedPhoneNumber = Number(phone.replace(/[^+\d]+/g, ''));

		return await fetch('http://localhost:3001/login', {
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
	return <LoginFormComponent errors={errors} control={control} onSubmit={onSubmit} />;
};
