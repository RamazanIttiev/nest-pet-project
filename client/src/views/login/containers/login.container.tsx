import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../../models/form.model';
import { LoginFormComponent } from '../components/login-form.component';
import { useNavigate } from 'react-router-dom';
import { formatPhoneNumber, SERVER_URL } from '../../../utils/helpers';
import { AlertsModel } from '../../../models/alerts.model';

const defaultValues: Omit<FormValues, 'name'> = {
	phone: '',
	password: '',
};

interface LoginContainerProps {
	handleError: (error: AlertsModel) => void;
}

export const LoginContainer: FC<LoginContainerProps> = ({ handleError }) => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState(defaultValues);

	const login = async (phone: string, password: string) => {
		const userToken = await fetch(`${SERVER_URL}/login`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({ phone: formatPhoneNumber(phone), password }),
		});

		return userToken.json();
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({ defaultValues: formData, mode: 'onSubmit' });

	const onSubmit = handleSubmit((data: Omit<FormValues, 'name'>) => {
		setIsLoading(true);

		const loggedUser = login(data.phone, data.password);

		loggedUser
			.then(() => {
				setIsLoading(false);
				navigate('/profile');
			})
			.catch(() => handleError({ message: 'Something went wrong. Try to re-login', severity: 'error' }));

		setFormData(data);
		reset();
	});
	return <LoginFormComponent isLoading={isLoading} errors={errors} control={control} onSubmit={onSubmit} />;
};
