import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../../models/form.model';
import { LoginFormComponent } from '../components/login-form.component';
import { useNavigate } from 'react-router-dom';

const defaultValues: Omit<FormValues, 'name'> = {
	phone: '',
	password: '',
};

export const LoginContainer: FC = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState(defaultValues);

	const login = async (phone: string, password: string) => {
		const formattedPhoneNumber = Number(phone.replace(/[^+\d]+/g, ''));

		return await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({ phone: formattedPhoneNumber, password }),
		});
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({ defaultValues: formData, mode: 'onSubmit' });

	const onSubmit = handleSubmit((data: Omit<FormValues, 'name'>) => {
		login(data.phone, data.password)
			.then(response => {
				localStorage.setItem('isAuthenticated', 'true');
				if (response.ok) navigate('/profile');
			})
			.catch(error => alert(error));

		setFormData(data);
		reset();
	});
	return <LoginFormComponent errors={errors} control={control} onSubmit={onSubmit} />;
};
