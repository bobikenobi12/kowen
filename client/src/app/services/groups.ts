import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { type User } from "./auth";

export interface CreateGroupRequest {
	name: string;
	description: string;
}

export interface Role {
	name: string;
	permissions: string[];
}

export interface SaveGroupRoleRequest {
	groupId: number;
	role: Role;
}

export interface SetGroupRoleToUserRequest {
	groupId: number;
	userId: number;
	roleName: string;
}

export interface Ids {
	groupId: number;
	folderId: number;
}
export interface Documents {
	id: number;
	name: string;
	documentExtension: string;
	roles: {
		id: number;
		userId: number[];
		roleUser: {
			id: number;
			name: string;
			permissions: string[];
		};
	};
}

export interface Group {
	id: number;
	name: string;
	description: string;
	users: User[];
	waitingUsersId: number[];
	groupPicture: string;
	roleInGroup: {
		id: number;
		userId: number[];
		roleUser: {
			id: number;
			name: string;
		};
	};
}

export const api = createApi({
	reducerPath: "groupsApi",
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
		showGroups: builder.query<Group[], void>({
			query: () => ({
				url: "showGroups",
				method: "GET",
			}),
		}),
		setProfilePicture: builder.mutation<void, FormData>({
			// groupId
			query: formData => ({
				url: "addGroupPictire",
				method: "POST",
				body: formData,
			}),
		}),
		saveGroupRole: builder.mutation<void, SaveGroupRoleRequest>({
			query: role => ({
				url: "saveGroupRole",
				method: "POST",
				body: role,
			}),
		}),
		setGroupRoleToUser: builder.mutation<void, SetGroupRoleToUserRequest>({
			query: role => ({
				url: "setGroupRoleToUser",
				method: "POST",
				body: role,
			}),
		}),
		addUserToGroup: builder.mutation<void, number>({
			query: groupId => ({
				url: "addUserToGroup",
				method: "POST",
				body: groupId,
			}),
		}),
		requestToJoinToGroup: builder.query<void, number>({
			query: groupId => ({
				url: "requestGroup",
				method: "POST",
				body: groupId,
			}),
		}),
		acceptUserToGroup: builder.mutation<void, number[]>({
			query: ids => ({
				url: "acceptUser",
				method: "POST",
				body: ids,
			}),
		}),
		declineUserToGroup: builder.mutation<void, number[]>({
			query: ids => ({
				url: "declineUser",
				method: "POST",
				body: ids,
			}),
		}),
		removeUserFromGroup: builder.mutation<void, number[]>({
			query: ids => ({
				url: "removeUser",
				method: "POST",
				body: ids,
			}),
		}),
		getWaitingUsers: builder.query<User[], number>({
			query: groupId => ({
				url: `getWaitingUsers/${groupId}`,
				method: "GET",
			}),
		}),
		getGroupUsers: builder.query<User[], number>({
			query: groupId => ({
				url: `getGroupUsers/${groupId}`,
				method: "GET",
			}),
		}),
		getDocumentsInGroup: builder.query<void, Ids>({
			query: ({ groupId, folderId }) => ({
				url: `getDocumentsInGroup/${groupId}/${folderId}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useCreateGroupMutation,
	useShowGroupsQuery,
	useSetProfilePictureMutation,
	useSaveGroupRoleMutation,
	useSetGroupRoleToUserMutation,
	useAddUserToGroupMutation,
	useRequestToJoinToGroupQuery,
	useAcceptUserToGroupMutation,
	useDeclineUserToGroupMutation,
	useRemoveUserFromGroupMutation,
	useGetWaitingUsersQuery,
	useGetGroupUsersQuery,
	useGetDocumentsInGroupQuery,
	usePrefetch,
} = api;
