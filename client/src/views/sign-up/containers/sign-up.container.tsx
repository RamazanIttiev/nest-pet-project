import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Divider } from 'primereact/divider';
import { SignUpFormComponent } from '../components/sign-up-form.component';
import { SignUpAsideComponent } from '../components/sign-up-aside.component';

export interface FormValues {
	name: string;
	phone: string;
	password: string;
	accept: boolean;
}

const defaultValues: FormValues = {
	name: '',
	phone: '',
	password: '',
	accept: false,
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
	} = useForm<FormValues>({ defaultValues: formData });

	const onSubmit = handleSubmit((data: FormValues) => {
		createProfile(data.phone, data.name, data.password)
			.then(res => {
				console.log(res);
			})
			.catch(error => alert(error));

		setFormData(data);
		reset();
	});

	const passwordHeader = <h6>Pick a password</h6>;
	const passwordFooter = (
		<>
			<Divider />
			<p className="mt-2">Suggestions</p>
			<ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
				<li>At least one lowercase</li>
				<li>At least one uppercase</li>
				<li>At least one numeric</li>
				<li>Minimum 8 characters</li>
			</ul>
		</>
	);

	return (
		<>
			<SignUpFormComponent
				errors={errors}
				control={control}
				onSubmit={onSubmit}
				passwordFooter={passwordFooter}
				passwordHeader={passwordHeader}
			/>
			<SignUpAsideComponent />
		</>
	);
};
