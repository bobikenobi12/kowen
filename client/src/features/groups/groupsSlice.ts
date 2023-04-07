import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../app/services/groups";
import { RootState } from "../../app/store";
import { type Group } from "../../app/services/groups";

export interface GroupsState {
	groups: Group[];
	currentGroup: Group | null;
}

const initialState: GroupsState = {
	groups: [],
	currentGroup: JSON.parse(localStorage.getItem("currentGroup") || "null"),
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
		getFolderById(state, action: PayloadAction<number>) {
			state.groups?.find(group => group.id === action.payload);
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
				// set currentGroup to null if the user leaves the current group
				state.currentGroup = null;
				localStorage.removeItem("currentGroup");
			}
		);
	},
});

export default slice.reducer;

export const selectGroups = (state: RootState) => state.groups.groups;
export const selectCurrentGroup = (state: RootState) =>
	state.groups.currentGroup;
export const selectGroupById = (state: RootState, groupId: number) =>
	state.groups.groups?.find(group => group.id === groupId);
