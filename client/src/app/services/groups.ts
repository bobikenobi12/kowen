import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { type User } from "./auth";

export interface CreateGroupRequest {
	name: string;
	description: string;
}

export interface Role {
	id: number;
	name: string;
	permissions: GroupRolePermissions[];
}

export interface SetGroupRoleToUserRequest {
	groupId: number;
	userId: number;
	roleId: number;
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
	groupPicture: any;
	roleInGroup: {
		id: number;
		userId: number[];
		roleUser: {
			id: number;
			name: string;
		};
	};
}

export interface setGroupPictureRequest {
	groupId: number;
	picture: any;
}

export interface RolesWithUsers {
	role: Role;
	users: User[];
}

export enum GroupRolePermissions {
	can_view = "can_view",
	can_edit = "can_edit",
	can_delete = "can_delete",
	can_add = "can_add",
}

export interface saveGroupRoleRequest {
	groupId: number;
	role: Partial<Role>;
}

export interface saveGroupRoleResponse {
	id: number;
	name: string;
	permissions: GroupRolePermissions[];
	users: User[] | [];
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
	tagTypes: ["Group", "Roles"],
	endpoints: builder => ({
		createGroup: builder.mutation<void, CreateGroupRequest>({
			query: group => ({
				url: "create",
				method: "POST",
				body: group,
			}),
			invalidatesTags: ["Group"],
		}),
		showGroups: builder.query<Group[], void>({
			query: () => ({
				url: "showGroups",
				method: "GET",
			}),
			providesTags: ["Group"],
		}),
		showGroup: builder.query<Group, number>({
			query: groupId => ({
				url: `showGroup/${groupId}`,
				method: "GET",
			}),
			providesTags: ["Group"],
		}),
		setGroupPicture: builder.mutation<void, setGroupPictureRequest>({
			query: ({ groupId, picture }) => ({
				url: "setGroupPicture",
				method: "POST",
				params: { groupId, picture },
			}),
			invalidatesTags: ["Group"],
		}),
		getRolesWithUsers: builder.query<any, number>({
			query: groupId => ({
				url: `getRolesWithUsers/${groupId}`,
				method: "GET",
			}),
			providesTags: ["Roles"],
		}),
		saveGroupRole: builder.mutation<
			saveGroupRoleResponse,
			saveGroupRoleRequest
		>({
			query: role => ({
				url: "saveGroupRole",
				method: "POST",
				body: role,
			}),
			invalidatesTags: ["Roles"],
		}),
		setGroupRoleToUser: builder.mutation<void, SetGroupRoleToUserRequest>({
			query: role => ({
				url: "setGroupRoleToUser",
				method: "POST",
				body: role,
			}),
		}),
		addUserToGroup: builder.mutation<
			void,
			{ groupId: number; username: string }
		>({
			query: ({ groupId, username }) => ({
				url: "addUserToGroup",
				method: "POST",
				body: { groupId, username },
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
		getUsersInGroup: builder.query<User[], number>({
			query: groupId => ({
				url: `getUsersInGroup/${groupId}`,
				method: "GET",
			}),
		}),
		getDocumentsInGroup: builder.query<void, Ids>({
			query: ({ groupId, folderId }) => ({
				url: `getDocumentsInGroup/${groupId}/${folderId}`,
				method: "GET",
			}),
		}),
		leaveGroup: builder.mutation<void, number>({
			query: groupId => ({
				url: `leaveGroup/${groupId}`,
				method: "POST",
			}),
			invalidatesTags: ["Group"],
		}),
	}),
});

export const {
	useCreateGroupMutation,
	useShowGroupsQuery,
	useShowGroupQuery,
	useSetGroupPictureMutation,
	useGetRolesWithUsersQuery,
	useSaveGroupRoleMutation,
	useSetGroupRoleToUserMutation,
	useAddUserToGroupMutation,
	useRequestToJoinToGroupQuery,
	useAcceptUserToGroupMutation,
	useDeclineUserToGroupMutation,
	useRemoveUserFromGroupMutation,
	useGetWaitingUsersQuery,
	useGetUsersInGroupQuery,
	useGetDocumentsInGroupQuery,
	useLeaveGroupMutation,
} = api;
