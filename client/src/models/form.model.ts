import { Control, FieldErrors } from 'react-hook-form';
import React from 'react';

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
