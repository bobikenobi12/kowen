import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setToken, selectEmail } from "../../features/auth/authSlice";
import { authApiSlice } from "./auth";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:8080/",
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
	const result = await baseQuery(args, api, extraOptions);

	if (result.error?.status === 403) {
		const email = selectEmail(api.getState());
		const refreshResult = await api.dispatch(
			authApiSlice.endpoints.refreshToken.initiate(email as string)
		);
		console.log(refreshResult)
		if (refreshResult.error) {
			api.dispatch(logout());
			return result;
		}
		const {token} = refreshResult.data;
		api.dispatch(setToken(token));
		return baseQuery(args, api, extraOptions);
	}
	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	tagTypes: [
		"Profile",
		"Chat",
		"Document",
		"Folder",
		"Group",
		"Roles",
		"Folder",
		"Documents",
	],
	endpoints: () => ({}),
});
