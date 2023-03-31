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
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/user/",
	}),
	endpoints: builder => ({
		login: builder.mutation<UserResponse, LoginRequest>({
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
	}),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = api;
