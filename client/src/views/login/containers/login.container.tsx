import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../../models/form.model';
import { LoginFormComponent } from '../components/login-form.component';
import { useNavigate } from 'react-router-dom';
import { formatPhoneNumber } from '../../../utils/helpers';
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
		setIsLoading(true);

		return await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({ phone: formatPhoneNumber(phone), password }),
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

				if (response.ok) {
					navigate('/profile');
					setIsLoading(false);

					return response.json();
				} else {
					setIsLoading(false);

					return response.json().then(response => {
						handleError({ message: response.message, severity: 'error' });
					});
				}
			})
			.catch(() => handleError({ message: 'Something went wrong. Try to reload', severity: 'error' }));

		setFormData(data);
		reset();
	});
	return <LoginFormComponent isLoading={isLoading} errors={errors} control={control} onSubmit={onSubmit} />;
};
