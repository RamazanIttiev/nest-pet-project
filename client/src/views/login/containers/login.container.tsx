import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../../models/form.model';
import { LoginFormComponent } from '../components/login-form.component';
import { useNavigate } from 'react-router-dom';
import { Reminders } from '../../../models/reminders.model';

const defaultValues: Omit<FormValues, 'name'> = {
	phone: '',
	password: '',
};

interface LoginContainerProps {
	handleReminders: (data: Reminders[]) => void;
}

export const LoginContainer: FC<LoginContainerProps> = ({ handleReminders }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState(defaultValues);

	const login = async (phone: string, password: string) => {
		const formattedPhoneNumber = Number(phone.replace(/[^+\d]+/g, ''));

		return await fetch('http://localhost:3001/login', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
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
			.then(res => {
				// navigate('/reminders');
				return res.json();
			})
			.then(data => {
				handleReminders(data.userReminders);
			})
			.catch(error => alert(error));

		setFormData(data);
		reset();
	});
	return <LoginFormComponent errors={errors} control={control} onSubmit={onSubmit} />;
};
