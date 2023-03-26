function validateUsername(username: string): string | undefined {
	if (username.length < 3) {
		return "Username must be at least 3 characters long";
	}
	if (username.length > 20) {
		return "Username must be at most 20 characters long";
	}
	if (!/^[a-zA-Z0-9]+$/.test(username)) {
		return "Username must only contain alphanumeric characters";
	}
}

function validateEmail(email: string): string | undefined {
	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
		return "Invalid email address";
	}
}
function validateFirstName(firstName: string): string | undefined {
	if (firstName.length < 1) {
		return "First name must be at least 1 character long";
	}
	if (firstName.length > 50) {
		return "First name must be at most 50 characters long";
	}
	if (!/^[a-zA-Z]+$/.test(firstName)) {
		return "First name must only contain alphabetic characters";
	}
}

function validateLastName(lastName: string): string | undefined {
	if (lastName.length < 1) {
		return "Last name must be at least 1 character long";
	}
	if (lastName.length > 50) {
		return "Last name must be at most 50 characters long";
	}
	if (!/^[a-zA-Z]+$/.test(lastName)) {
		return "Last name must only contain alphabetic characters";
	}
}

function validatePassword(password: string): string | undefined {
	if (password.length < 6) {
		return "Password must be at least 6 characters long";
	}
	if (password.length > 50) {
		return "Password must be at most 50 characters long";
	}
	if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(password)) {
		return "Password must contain at least one lowercase letter, one uppercase letter, and one number";
	}
}

function validateConfirmPassword(
	password: string,
	confirmPassword: string
): string | undefined {
	if (password !== confirmPassword) {
		return "Passwords do not match";
	}
}

export default function validateField(
	field: string,
	value: string
): string | undefined {
	switch (field) {
		case "username":
			return validateUsername(value);
		case "email":
			return validateEmail(value);
		case "firstName":
			return validateFirstName(value);
		case "lastName":
			return validateLastName(value);
		case "password":
			return validatePassword(value);
		case "confirmPassword":
			return validateConfirmPassword(value, field);
		default:
			return undefined;
	}
}
