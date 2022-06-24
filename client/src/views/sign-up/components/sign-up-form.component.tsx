import React, { FC, ReactNode } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { FormValues } from '../containers/sign-up.container';
import { InputMask } from 'primereact/inputmask';

// TODO: check if the types for useForm values are correct
interface SignUpFormProps {
	passwordHeader: ReactNode;
	passwordFooter: ReactNode;
	errors: FieldErrors<FormValues>;
	control: Control<FormValues, any>;
	onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}

export const SignUpFormComponent: FC<SignUpFormProps> = ({
	passwordFooter,
	passwordHeader,
	errors,
	control,
	onSubmit,
}) => {
	return (
		<div className="form-wrapper">
			<h1 className="form-title">Create your account :)</h1>
			<form onSubmit={onSubmit} className="p-fluid form">
				<div className="form-field">
					<span className="p-float-label">
						<Controller
							name="name"
							control={control}
							rules={{ required: 'Name is required.' }}
							render={({ field, fieldState }) => (
								<InputText
									id={field.name}
									{...field}
									autoFocus
									className={classNames({ 'p-invalid': fieldState.error })}
								/>
							)}
						/>
						<label htmlFor="name" className={classNames({ 'p-error': errors.name })}>
							Name*
						</label>
					</span>
					{errors?.name && <small className="p-error">{errors.name.message}</small>}
				</div>
				<div className="form-field">
					<span className="p-float-label p-input-icon-right">
						<i className="pi pi-envelope" />
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
							render={({ field, fieldState }) => (
								<InputMask
									id={field.name}
									{...field}
									mask="+7(999) 999-9999"
									className={classNames({ 'p-invalid': fieldState.error })}
								/>
							)}
						/>
						<label htmlFor="email" className={classNames({ 'p-error': errors.phone })}>
							Phone*
						</label>
					</span>
					{errors?.phone && <small className="p-error">{errors.phone.message}</small>}
				</div>
				<div className="form-field">
					<span className="p-float-label">
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
							render={({ field, fieldState }) => (
								<Password
									id={field.name}
									{...field}
									toggleMask
									className={classNames({ 'p-invalid': fieldState.error })}
									header={passwordHeader}
									footer={passwordFooter}
								/>
							)}
						/>
						<label htmlFor="password" className={classNames({ 'p-error': errors.password })}>
							Password*
						</label>
					</span>
					{errors?.password && <small className="p-error">{errors.password.message}</small>}
				</div>
				<div className="form-checkbox">
					<Controller
						name="accept"
						control={control}
						rules={{ required: true }}
						render={({ field, fieldState }) => (
							<Checkbox
								inputId={field.name}
								onChange={e => field.onChange(e.checked)}
								checked={field.value}
								className={classNames({ 'p-invalid': fieldState.error })}
							/>
						)}
					/>
					<label htmlFor="accept" className={classNames({ 'p-error': errors.accept })}>
						I agree to the terms and conditions*
					</label>
				</div>

				<Button type="submit" label="Submit" className="mt-2" />
			</form>
		</div>
	);
};
