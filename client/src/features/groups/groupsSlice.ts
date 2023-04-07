import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../app/services/groups";
import { RootState } from "../../app/store";
import { type Group } from "../../app/services/groups";

export interface GroupsState {
	groups: Group[];
	currentGroup: Group | null;
	selectedSection: string;
}

const initialState: GroupsState = {
	groups: [],
	currentGroup: JSON.parse(localStorage.getItem("currentGroup") || "null"),
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
		getFolderById(state, action: PayloadAction<number>) {
			state.groups?.find(group => group.id === action.payload);
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
	},
});

export default slice.reducer;

export const selectGroups = (state: RootState) => state.groups.groups;
export const selectCurrentGroup = (state: RootState) =>
	state.groups.currentGroup;
export const selectSelectedSection = (state: RootState) =>
	state.groups.selectedSection;
