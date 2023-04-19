import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../app/services/groups";
import { RootState } from "../../app/store";
import { type Group } from "../../app/services/groups";
import { type getRolesInGroupResponse } from "../../app/services/groups";
import { Permission } from "../../app/services/groups";

export interface GroupsState {
	groups: Group[];
	roles: getRolesInGroupResponse[] | null;
	selectedSection: string;
	currentGroupPermissions: Permission[] | null;
}

const initialState: GroupsState = {
	groups: [],
	roles: null,
	selectedSection: "overview",
	currentGroupPermissions: null,
};

const slice = createSlice({
	name: "groups",
	initialState,
	reducers: {
		setSelectedSection(state, action: PayloadAction<string>) {
			state.selectedSection = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			api.endpoints.showGroups.matchFulfilled,
			(state, action) => {
				state.groups = action.payload;
			}
		);
		// builder.addMatcher(
		// 	api.endpoints.leaveGroup.matchFulfilled,
		// 	(state, action) => {
		// 		state.groups = state.groups.filter(
		// 			group => group.id !== action.payload
		// 		);
		// 	}
		// );
		// builder.addMatcher(
		// 	api.endpoints.showGroup.matchFulfilled,
		// 	(state, action) => {
		// 		state.currentGroup = action.payload;
		// 		localStorage.setItem(
		// 			"currentGroup",
		// 			JSON.stringify(action.payload)
		// 		);
		// 	}
		// );
		builder.addMatcher(
			api.endpoints.getRolesInGroup.matchFulfilled,
			(state, action) => {
				state.roles = action.payload;
			}
		);
		builder.addMatcher(
			api.endpoints.getUserPermissionsForGroup.matchFulfilled,
			(state, action) => {
				state.currentGroupPermissions = action.payload;
			}
		);
	},
});

export default slice.reducer;

export const selectGroups = (state: RootState) => state.groups.groups;
// export const selectCurrentGroup = (state: RootState) =>
// 	state.groups.currentGroup;
export const selectSelectedSection = (state: RootState) =>
	state.groups.selectedSection;
export const selectGroupById = (state: RootState, id: number) =>
	state.groups.groups.find(group => group.id === id);
export const selectCurrentGroupPermissions = (state: RootState) =>
	state.groups.currentGroupPermissions;
export const selectRoles = (state: RootState) => state.groups.roles;
export const selectIsCreator = (state: RootState, groupId: number) => {
	const group = selectGroupById(state, groupId);
	if (group) {
		return group.creator.id === state.auth.user?.id;
	}
	return false;
};
