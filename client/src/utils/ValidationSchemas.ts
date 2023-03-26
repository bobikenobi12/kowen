import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(1, "First name must be at least 1 character long")
		.max(50, "First name must be at most 50 characters long")
		.matches(
			/^[a-zA-Z]+$/,
			"First name must only contain alphabetic characters"
		)
		.required("First name is required"),
	lastName: Yup.string()
		.min(1, "Last name must be at least 1 character long")
		.max(50, "Last name must be at most 50 characters long")
		.matches(
			/^[a-zA-Z]+$/,
			"Last name must only contain alphabetic characters"
		)
		.required("Last name is required"),
	username: Yup.string()
		.min(1, "Username must be at least 1 character long")
		.max(50, "Username must be at most 50 characters long")
		.matches(
			/^[a-zA-Z0-9]+$/,
			"Username must only contain alphanumeric characters"
		)
		.required("Username is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters long")
		.max(50, "Password must be at most 50 characters long")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
			"Password must contain at least one lowercase letter, one uppercase letter, and one number"
		)
		.required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), undefined], "Passwords do not match")
		.required("Confirm password is required"),
});

export const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters long")
		.max(50, "Password must be at most 50 characters long")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
			"Password must contain at least one lowercase letter, one uppercase letter, and one number"
		)
		.required("Password is required"),
});
