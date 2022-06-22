import bcrypt from 'bcrypt';

export const comparePasswords = async (userPassword: string, currentPassword: string): Promise<boolean> => {
	return await bcrypt.compare(currentPassword, userPassword);
};
