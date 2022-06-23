export interface RegistrationStatus {
	success: boolean;
	message: string;
}

export interface LoggedUser {
	username: string;
	accessToken: string;
	expiresIn: string;
}
