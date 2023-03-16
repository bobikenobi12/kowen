import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./types/index";

export const userApiSlice = createApi({
    reducerPath: "userApi",
    tagTypes: ["User"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        prepareHeaders(headers) {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<User, { email: string; password: string }>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        logout: builder.mutation<User, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["User"],
        }),
        register: builder.mutation<User, User>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        getUser: builder.query<User, void>({
            query: () => "/auth/user",
            providesTags: ["User"],
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useGetUserQuery } = userApiSlice;



