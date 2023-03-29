import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface CreateGroupRequest {
	name: string;
	description: string;
}

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/group/",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: builder => ({
		createGroup: builder.mutation<void, CreateGroupRequest>({
			query: group => ({
				url: "create",
				method: "POST",
				body: group,
			}),
		}),
	}),
});

export const { useCreateGroupMutation } = api;
