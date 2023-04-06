import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface saveFolderToGroupRequest {
	groupId: number;
	name: string;
}

export interface Folder {
	id: number;
	name: string;
}

export const api = createApi({
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
		saveFolderToGroup: builder.mutation<Folder, saveFolderToGroupRequest>({
			query: ({ groupId, name }) => ({
				url: `saveTo/group/${groupId}`,
				method: "POST",
				params: { name },
			}),
		}),
		getFoldersInGroup: builder.query<Folder[], number>({
			query: groupId => ({
				url: "getFoldersInGroup",
				method: "POST",
				params: { groupId },
			}),
		}),
		changeFolderName: builder.mutation<
			Folder,
			{ groupId: number; folderId: number; name: string }
		>({
			query: ({ groupId, folderId, name }) => ({
				url: `changeName/${groupId}/${folderId}`,
				method: "POST",
				params: { name },
			}),
		}),
		deleteFolderFromGroup: builder.mutation<
			Folder,
			{ groupId: number; folderId: number }
		>({
			query: ({ groupId, folderId }) => ({
				url: `delete`,
				method: "POST",
				params: { groupId, folderId },
			}),
		}),
	}),
});

export const {
	useSaveFolderToGroupMutation,
	useGetFoldersInGroupQuery,
	useChangeFolderNameMutation,
	useDeleteFolderFromGroupMutation,
} = api;
