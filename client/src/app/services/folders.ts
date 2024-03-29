import { apiSlice } from "./apiSlice";

export interface saveFolderToGroupRequest {
	groupId: number;
	name: string;
}

export interface Folder {
	id: number;
	name: string;
}

export const api = apiSlice.injectEndpoints({
	endpoints: builder => ({
		saveFolderToGroup: builder.mutation<Folder, saveFolderToGroupRequest>({
			query: ({ groupId, name }) => ({
				url: `folder/saveTo/group/${groupId}`,
				method: "POST",
				params: { name },
			}),
			invalidatesTags: ["Folder"],
		}),
		getFoldersInGroup: builder.query<Folder[], number>({
			query: groupId => ({
				url: "folder/getFoldersInGroup",
				method: "POST",
				params: { groupId },
			}),
			providesTags: ["Folder"],
		}),
		getFolderInGroup: builder.query<
			Folder,
			{ groupId: number; folderId: number }
		>({
			query: ({ groupId, folderId }) => ({
				url: "folder/getFolderInGroup",
				method: "POST",
				params: { groupId, folderId },
			}),
			providesTags: ["Folder"],
		}),
		changeFolderName: builder.mutation<
			Folder,
			{ groupId: number; folderId: number; name: string }
		>({
			query: ({ groupId, folderId, name }) => ({
				url: `folder/changeName/${groupId}/${folderId}`,
				method: "POST",
				params: { name },
			}),
			invalidatesTags: ["Folder"],
		}),
		deleteFolderFromGroup: builder.mutation<
			Folder,
			{ groupId: number; folderId: number }
		>({
			query: ({ groupId, folderId }) => ({
				url: `folder/delete`,
				method: "POST",
				params: { groupId, folderId },
			}),
			invalidatesTags: ["Folder"],
		}),
	}),
});

export const {
	useSaveFolderToGroupMutation,
	useGetFoldersInGroupQuery,
	useGetFolderInGroupQuery,
	useChangeFolderNameMutation,
	useDeleteFolderFromGroupMutation,
} = api;
