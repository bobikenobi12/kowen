import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface saveFolderToGroup {
	groupId: number;
	name: FormData;
}
export const foldersApi = createApi({
	reducerPath: "foldersApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/folder/",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: builder => ({
		saveFolderToGroup: builder.mutation<void, saveFolderToGroup>({
			query: ({ groupId, name }) => ({
				url: `saveTo/group/${groupId}`,
				method: "POST",
				params: { name },
			}),
		}),
		getFoldersInGroup: builder.query<void, number>({
			query: groupId => ({
				url: "getFoldersInGroup",
				method: "GET",
				params: { groupId },
			}),
		}),
	}),
});
