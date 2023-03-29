import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../app/services/groups";
import { RootState } from "../../app/store";

const slice = createSlice({
	name: "groups",
	initialState: null,
	reducers: {
		// getGroupsStart: (state) => {
		//     state.loading = true;
		// }
	},
	extraReducers: builder => {
		builder.addMatcher(
			api.endpoints.createGroup.matchFulfilled,
			(state, action) => {
				console.log(action);
			}
		);
	},
});

export default slice.reducer;
