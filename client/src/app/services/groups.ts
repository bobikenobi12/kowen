import { apiSlice } from "./apiSlice";
import { type User } from "./auth";

export interface CreateGroupRequest {
	name: string;
	description: string;
}

export interface Role {
	id: number;
	name: string;
	permissions: Permission[];
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

export enum Permission {
	add_role = "add_role",
	apply_role = "apply_role",
	edit_role = "edit_role",
	remove_role = "remove_role",
	remove_user = "remove_user",
	add_user = "add_user",
	edit_group = "edit_group",
	add_folder = "add_folder",
	delete_folder = "delete_folder",
	edit_folder = "edit_folder",
	add_document = "add_document",
	remove_document = "remove_document",
	download_document = "download_document",
	save_new_document_version = "save_new_document_version",
	preview_document = "preview_document",
	edit_document = "edit_document",
	send_message = "send_message",
	clear_chat = "clear_chat",
	edit_messages = "edit_messages",
	delete_messages = "delete_messages",
}

export interface saveGroupRoleRequest {
	groupId: number;
	role: Partial<Role>;
}

export interface saveGroupRoleResponse {
	id: number;
	name: string;
	permissions: Permission[];
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

export const api = apiSlice.injectEndpoints({
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
		removePermissionFromRole: builder.mutation<
			void,
			{ groupId: number; roleId: number; permission: Permission }
		>({
			query: ({ groupId, roleId, permission }) => ({
				url: `removePermissionFromRole/${groupId}/${roleId}`,
				method: "POST",
				params: { permission },
			}),
			invalidatesTags: ["Roles"],
		}),
		addPermissionToRole: builder.mutation<
			void,
			{ groupId: number; roleId: number; permission: Permission }
		>({
			query: ({ groupId, roleId, permission }) => ({
				url: `addPermissionToRole/${groupId}/${roleId}`,
				method: "POST",
				params: { permission },
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
		getUserPermissionsForGroup: builder.query<Permission[], number>({
			query: groupId => ({
				url: `getPermissionsInGroup/${groupId}`,
				method: "GET",
			}),
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
	useRemovePermissionFromRoleMutation,
	useAddPermissionToRoleMutation,
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
	useGetUserPermissionsForGroupQuery,
	usePrefetch,
} = api;
