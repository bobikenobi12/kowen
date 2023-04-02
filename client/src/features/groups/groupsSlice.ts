import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../app/services/groups";
import { RootState } from "../../app/store";
import { type User } from "../../app/services/auth";
import { type Group } from "../../app/services/groups";

export interface GroupsState {
	groups: Group[];
}

const slice = createSlice({
	name: "groups",
	initialState: {
		groups: [],
	} as GroupsState,
	reducers: {},
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
