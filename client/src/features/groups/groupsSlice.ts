import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../app/services/groups";
import { RootState } from "../../app/store";
import { type Group } from "../../app/services/groups";
import { type Folder } from "../../app/services/folders";
import { type getDocuments } from "../../app/services/documents";
import { type getRolesInGroupResponse } from "../../app/services/groups";

export interface GroupsState {
	groups: Group[];
	currentGroup: Group | null;
	roles: getRolesInGroupResponse[] | null;
	selectedSection: string;
}

const initialState: GroupsState = {
	groups: [],
	currentGroup: JSON.parse(localStorage.getItem("currentGroup") || "null"),
	roles: null,
	selectedSection: "overview",
};

const slice = createSlice({
	name: "groups",
	initialState,
	reducers: {
		setCurrentGroup(state, action: PayloadAction<Group>) {
			state.currentGroup = action.payload;
			localStorage.setItem(
				"currentGroup",
				JSON.stringify(action.payload)
			);
		},
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
		builder.addMatcher(
			api.endpoints.leaveGroup.matchFulfilled,
			(state, action) => {
				state.currentGroup = null;
				localStorage.removeItem("currentGroup");
				localStorage.removeItem("currentFolder");
			}
		);
		builder.addMatcher(
			api.endpoints.showGroup.matchFulfilled,
			(state, action) => {
				state.currentGroup = action.payload;
				localStorage.setItem(
					"currentGroup",
					JSON.stringify(action.payload)
				);
			}
		);
		builder.addMatcher(
			api.endpoints.getRolesInGroup.matchFulfilled,
			(state, action) => {
				state.roles = action.payload;
			}
		);
	},
});

export default slice.reducer;

export const selectGroups = (state: RootState) => state.groups.groups;
export const selectCurrentGroup = (state: RootState) =>
	state.groups.currentGroup;
export const selectSelectedSection = (state: RootState) =>
	state.groups.selectedSection;
export const selectGroupById = (state: RootState, id: number) =>
	state.groups.groups.find(group => group.id === id);
export const selectRoles = (state: RootState) => state.groups.roles;
