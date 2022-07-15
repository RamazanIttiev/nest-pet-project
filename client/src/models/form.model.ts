import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import React from 'react';

export interface FormValues {
	name: string;
	phone: string;
	password: string;
}

export interface EditFormValues {
	title: 'title' | string;
	date: Date;
}

// TODO: check if the types for useForm values are correct
export interface ReactHookFormProps {
	errors: FieldErrors<FormValues>;
	control: Control<FormValues, any>;
	onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}

export interface EditFormProps {
	errors: FieldErrors<EditFormValues>;
	control: Control<EditFormValues, any>;
	onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
	setValue: UseFormSetValue<EditFormValues>;
}
