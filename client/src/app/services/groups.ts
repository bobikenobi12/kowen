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
	permissions: Permissions[];
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

export interface Group {
	id: number;
	name: string;
	description: string;
	creator: User;
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

export enum Permissions {
	add_role,
	apply_role,
	edit_role,
	remove_role,
	remove_user,
	add_user,
	edit_group,
	add_folder,
	delete_folder,
	edit_folder,
	add_document,
	remove_document,
	download_document,
	save_new_document_version,
	preview_document,
	edit_document,
}

export interface saveGroupRoleRequest {
	groupId: number;
	role: Partial<Role>;
}

export interface saveGroupRoleResponse {
	id: number;
	name: string;
	permissions: Permissions[];
	users: User[] | [];
}

export interface getRolesInGroupResponse {
	id: number;
	name: string;
	userId: number[];
	roleUser: Role;
}

export interface getRolesWithUsers {
	user: User;
	roles: getRolesInGroupResponse[];
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
	tagTypes: ["Group", "Roles", "Folder", "Document"],
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
		getRolesWithUsers: builder.query<getRolesWithUsers[], number>({
			query: groupId => ({
				url: `getRolesWithUsers/${groupId}`,
				method: "GET",
			}),
			providesTags: ["Roles", "Group"],
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
			invalidatesTags: ["Roles"],
		}),
		getRolesInGroup: builder.query<getRolesInGroupResponse[], number>({
			query: groupId => ({
				url: `getRoles/${groupId}`,
				method: "GET",
			}),
			providesTags: ["Roles"],
		}),
		removeRoleFromGroup: builder.mutation<
			void,
			{ groupId: number; roleId: number }
		>({
			query: ({ groupId, roleId }) => ({
				url: "removeRole",
				method: "POST",
				params: { groupId, roleId },
			}),
			invalidatesTags: ["Roles"],
		}),
		removeRoleFromUser: builder.mutation<
			void,
			{ groupId: number; userId: number; roleId: number }
		>({
			query: ({ groupId, userId, roleId }) => ({
				url: "removeRoleFromUser",
				method: "POST",
				params: { groupId, userId, roleId },
			}),
			invalidatesTags: ["Roles"],
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
			invalidatesTags: ["Group"],
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
		removeUserFromGroup: builder.mutation<
			void,
			{ groupId: number; userId: number }
		>({
			query: ({ groupId, userId }) => ({
				url: "removeUser",
				method: "POST",
				params: { groupId, userId },
			}),
			invalidatesTags: ["Group", "Roles"],
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
	useRemoveRoleFromGroupMutation,
	useRemoveRoleFromUserMutation,
	useSetGroupRoleToUserMutation,
	useGetRolesInGroupQuery,
	useAddUserToGroupMutation,
	useRequestToJoinToGroupQuery,
	useAcceptUserToGroupMutation,
	useDeclineUserToGroupMutation,
	useRemoveUserFromGroupMutation,
	useGetWaitingUsersQuery,
	useGetUsersInGroupQuery,
	useLeaveGroupMutation,
} = api;
