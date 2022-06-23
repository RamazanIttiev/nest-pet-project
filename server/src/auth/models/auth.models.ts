export interface RegistrationStatus {
	success: boolean;
	message: unknown;
}

export interface LoggedUser {
	username: string;
	accessToken: string;
	expiresIn: string;
}
