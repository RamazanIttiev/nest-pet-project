import React from 'react';
import { Reminder } from './profile.model';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

export interface FormValues {
	name: string;
	phone: string;
	password: string;
}

// TODO: check if the types for useForm values are correct
export interface ReactHookFormProps {
	errors: FieldErrors<FormValues>;
	control: Control<FormValues, any>;
	onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}

export interface AddFormProps {
	errors: FieldErrors<Reminder>;
	control: Control<Reminder, any>;
	onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
	setValue: UseFormSetValue<Reminder>;
}
