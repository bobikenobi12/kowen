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

export const CreateGroupSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, "Group name must be at least 3 character long")
		.max(15, "Group name must be at most 15 characters long")
		.matches(
			/^[a-zA-Z0-9]+$/,
			"Group name must only contain alphanumeric characters"
		)
		.required("Group name is required"),
	description: Yup.string()
		.min(15, "Group description must be at least 15 character long")
		.max(50, "Group description must be at most 50 characters long")
		.required("Group description is required"),
});

export const EditFolderSchema = Yup.object().shape({
	name: Yup.string().required("Folder name is required"),
});

export const UploadFileSchema = Yup.object().shape({
	file: Yup.mixed().required("A file is required"),
});

export const ValidateNewCredentialsSchema = Yup.object().shape({
	username: Yup.string()
		.min(1, "Username must be at least 1 character long")
		.max(50, "Username must be at most 50 characters long")
		.matches(
			/^[a-zA-Z0-9]+$/,
			"Username must only contain alphanumeric characters"
		)
		.required("Username is required"),
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
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
});

export const ValidateConfirmPasswordSchema = Yup.object().shape({
	password: Yup.string()
		.min(6, "Password must be at least 6 characters long")
		.max(50, "Password must be at most 50 characters long")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
			"Password must contain at least one lowercase letter, one uppercase letter, and one number"
		)
		.required("Password is required"),
});

export const SaveFolderToGroupSchema = Yup.object().shape({
	name: Yup.string().required("Folder name is required"),
});
