import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/services/auth";
import type { RootState } from "../../app/store";

type AuthState = {
	token: string | null;
};

const initialState: AuthState = {
	token: localStorage.getItem("token") || null,
};

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addMatcher(
			api.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.token;
				localStorage.setItem("token", payload.token);
			}
		);
	},
});

export default slice.reducer;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
