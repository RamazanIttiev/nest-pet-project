export const buttonLabel = (label: string) => {
	switch (label) {
		case '/register': {
			return 'Log In';
		}
		case '/login': {
			return 'Sign Up';
		}
		case '/profile': {
			return 'Log Out';
		}
		default: {
			return 'Log Out';
		}
	}
};

export const buttonPath = (path: string) => {
	switch (path) {
		case 'Log In': {
			return '/login';
		}
		case 'Sign Up': {
			return '/register';
		}
		case 'Log Out': {
			return '/';
		}
		default: {
			return '/';
		}
	}
};

export const formatPhoneNumber = (phone: string) => Number(phone.replace(/[^+\d]+/g, ''));

export const SERVER_URL = 'http://localhost:3001';
