import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/services/auth";
import type { RootState } from "../../app/store";

type AuthState = {
	token: string | null;
};

const slice = createSlice({
	name: "auth",
	initialState: { token: null } as AuthState,
	reducers: {},
	extraReducers: builder => {
		builder.addMatcher(
			api.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.token;
				// state.user = payload.user;
			}
		);
	},
});

export default slice.reducer;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
