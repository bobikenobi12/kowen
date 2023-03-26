import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface User {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
}

export interface UserResponse {
	// user: User;
	message: string;
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

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/user/",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: builder => ({
		login: builder.mutation<UserResponse, LoginRequest>({
			query: credentials => ({
				url: "login",
				method: "POST",
				body: credentials,
			}),
		}),
		protected: builder.mutation<{ message: string }, void>({
			query: () => "protected",
		}),
		register: builder.mutation<void, RegisterRequest>({
			query: credentials => ({
				url: "register",
				method: "POST",
				body: credentials,
			}),
		}),
	}),
});

export const { useLoginMutation, useProtectedMutation, useRegisterMutation } =
	api;
