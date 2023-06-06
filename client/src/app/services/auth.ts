import { apiSlice } from "./apiSlice";

export interface User {
	id: string;
	password: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	lastLogin: string;
	profilePicture: string;
	dateJoined: Date;
}

export interface LoginResponse {
	user: User;
	token: string;
	refreshToken: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

export interface ChangePasswordRequest {
	password: string;
	newPassword: string;
	confirmNewPassword: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: credentials => ({
				url: "login",
				method: "POST",
				body: credentials,
			}),
		}),
		register: builder.mutation<void, RegisterRequest>({
			query: credentials => ({
				url: "register",
				method: "POST",
				body: credentials,
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: "logout",
				method: "POST",
			}),
		}),
		setProfilePicture: builder.mutation<User, FormData>({
			query: FormData => ({
				url: "setProfilePic",
				method: "POST",
				body: FormData,
			}),
		}),
		downloadProfilePicture: builder.query<File, void>({
			query: () => ({
				url: "getProfilePic",
				method: "GET",
			}),
		}),
		changeUsername: builder.mutation<
			User,
			{ username: string; password: string }
		>({
			query: ({ username, password }) => ({
				url: "changeUsername",
				method: "POST",
				body: { username, password },
			}),
		}),
		changeFirstName: builder.mutation<
			User,
			{ firstName: string; password: string }
		>({
			query: ({ firstName, password }) => ({
				url: "changeFirstName",
				method: "POST",
				body: { firstName, password },
			}),
		}),
		changeLastName: builder.mutation<
			User,
			{ lastName: string; password: string }
		>({
			query: ({ lastName, password }) => ({
				url: "changeLastName",
				method: "POST",
				body: { lastName, password },
			}),
		}),
		changeEmail: builder.mutation<
			LoginResponse,
			{ email: string; password: string }
		>({
			query: ({ email, password }) => ({
				url: "changeEmail",
				method: "POST",
				body: { email, password },
			}),
		}),
		changePassword: builder.mutation<User, ChangePasswordRequest>({
			query: ({ password, newPassword, confirmNewPassword }) => ({
				url: "changePassword",
				method: "POST",
				body: { password, newPassword, confirmNewPassword },
			}),
		}),
		getUser: builder.query<User, void>({
			query: () => ({
				url: "getMe",
				method: "GET",
			}),
		}),
		refreshToken: builder.mutation<string, string>({
			query: email => ({
				url: "refresh",
				method: "POST",
				body: {
					email,
				},
				headers: {
					authorization: `Bearer ${localStorage.getItem(
						"refreshToken"
					)}`,
				},
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useSetProfilePictureMutation,
	useDownloadProfilePictureQuery,
	useChangeUsernameMutation,
	useChangeFirstNameMutation,
	useChangeLastNameMutation,
	useChangeEmailMutation,
	useChangePasswordMutation,
	useGetUserQuery,
} = authApiSlice;
