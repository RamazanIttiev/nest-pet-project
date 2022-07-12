import bcrypt from 'bcrypt';

export const comparePasswords = async (userPassword: string, currentPassword: string): Promise<boolean> => {
	return await bcrypt.compare(currentPassword, userPassword);
};

export const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, 10);
};

export const getUsername = async (db: FirebaseFirestore.Firestore, username: string) => {
	return await db.collection('users').where('username', '==', username).get();
};

export const getExistingUser = async (db: FirebaseFirestore.Firestore, phone: string) => {
	return await db.collection('users').doc(`${phone}`).get();
};
