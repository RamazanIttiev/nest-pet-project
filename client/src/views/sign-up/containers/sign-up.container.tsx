import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpFormComponent } from '../components/sign-up-form.component';
import { FormValues } from '../../../models/form.model';

const defaultValues: FormValues = {
	name: '',
	phone: '',
	password: '',
};

export const SignUpContainer: FC = () => {
	const [formData, setFormData] = useState(defaultValues);

	const createProfile = async (phone: string, username: string, password: string) => {
		const formattedPhoneNumber = Number(phone.replace(/[^+\d]+/g, ''));

		return await fetch(`${process.env.REACT_APP_SERVER_URL}/register`, {
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

	return <SignUpFormComponent errors={errors} control={control} onSubmit={onSubmit} />;
};
