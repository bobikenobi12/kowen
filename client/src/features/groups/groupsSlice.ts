import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../app/services/groups";
import { RootState } from "../../app/store";
import { type User } from "../../app/services/auth";
import { type Group } from "../../app/services/groups";

export interface GroupsState {
	groups: Group[];
	currentGroup: Group | null;
}
const slice = createSlice({
	name: "groups",
	initialState: {
		groups: [],
		currentGroup: null,
	} as GroupsState,
	reducers: {
		setCurrentGroup(state, action: PayloadAction<Group>) {
			state.currentGroup = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			api.endpoints.createGroup.matchFulfilled,
			(state, action) => {
				console.log(action);
			}
		);
		builder.addMatcher(
			api.endpoints.showGroups.matchFulfilled,
			(state, action) => {
				state.groups = action.payload;
				console.log(action.payload);
			}
		);
	},
});

export default slice.reducer;

export const selectGroups = (state: RootState) => state.groups.groups;
export const selectCurrentGroup = (state: RootState) =>
	state.groups.currentGroup;
