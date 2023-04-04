import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/services/auth";
import type { RootState } from "../../app/store";
import { type User } from "../../app/services/auth";

interface AuthState {
	user: User | null;
	token: string | null;
}

const initialState: AuthState = {
	user: localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user")!)
		: null,
	token: localStorage.getItem("token")
		? JSON.parse(localStorage.getItem("token")!)
		: null,
};

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, { payload }) => {
			state.user = payload.user;
			localStorage.setItem("user", JSON.stringify(payload.user));
			state.token = payload.token;
			localStorage.setItem("token", JSON.stringify(payload.token));
		},
		logout: state => {
			state.user = null;
			state.token = null;
			localStorage.removeItem("user");
			localStorage.removeItem("token");
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			api.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.user = payload.user;
				state.token = payload.token;
				localStorage.setItem("token", JSON.stringify(payload.token));
				localStorage.setItem("user", JSON.stringify(payload.user));
			}
		);
		builder.addMatcher(
			api.endpoints.logout.matchFulfilled,
			(state, { payload }) => {
				state.token = null;
				localStorage.removeItem("token");
				state.user = null;
				localStorage.removeItem("user");
			}
		);
	},
});

export default slice.reducer;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
