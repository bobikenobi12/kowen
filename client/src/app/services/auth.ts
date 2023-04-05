import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

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

const boundary = `----${new Date().getTime()}`;

export const api = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/user/",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
				headers.set(
					"Content-Type",
					`multipart/form-data; boundary=<calculated when request is sent>`
				);
			}
			return headers;
		},
	}),
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
				params: {
					picture: FormData,
				},
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
			User,
			{ email: string; password: string }
		>({
			query: ({ email, password }) => ({
				url: "changeEmail",
				method: "POST",
				body: { email, password },
			}),
		}),
		getUser: builder.query<User, void>({
			query: () => ({
				url: "getMe",
				method: "GET",
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
	useGetUserQuery,
} = api;
