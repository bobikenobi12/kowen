import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice as api } from "../../app/services/auth";
import type { RootState } from "../../app/store";
import { type User } from "../../app/services/auth";

interface AuthState {
	user: User | null;
	token: string | null;
	userProfileMode: "view" | "edit";
}

const initialState: AuthState = {
	user: localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user")!)
		: null,
	token: localStorage.getItem("token")
		? JSON.parse(localStorage.getItem("token")!)
		: null,
	userProfileMode: "view",
};

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: state => {
			state.user = null;
			state.token = null;
			localStorage.clear();
		},
		setToken: (state, { payload }) => {
			state.token = payload;
			localStorage.setItem("token", JSON.stringify(payload));
		},
		setUserProfileMode: (state, { payload }) => {
			state.userProfileMode = payload;
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			api.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.user = payload.user;
				state.token = payload.token;
				localStorage.setItem(
					"refreshToken",
					JSON.stringify(payload.refreshToken)
				);
				localStorage.setItem("token", JSON.stringify(payload.token));
				localStorage.setItem("user", JSON.stringify(payload.user));
			}
		);
		builder.addMatcher(
			api.endpoints.setProfilePicture.matchFulfilled,
			(state, { payload }) => {
				state.user = payload;
				localStorage.setItem("user", JSON.stringify(payload));
			}
		);
		builder.addMatcher(
			api.endpoints.changeEmail.matchFulfilled,
			(state, { payload }) => {
				state.user = payload.user;
				state.token = payload.token;
				localStorage.setItem("user", JSON.stringify(payload.user));
				localStorage.setItem("token", JSON.stringify(payload.token));
			}
		);
		builder.addMatcher(
			api.endpoints.changeFirstName.matchFulfilled,
			(state, { payload }) => {
				state.user = payload;
				localStorage.setItem("user", JSON.stringify(payload));
			}
		);
		builder.addMatcher(
			api.endpoints.changeLastName.matchFulfilled,
			(state, { payload }) => {
				state.user = payload;
				localStorage.setItem("user", JSON.stringify(payload));
			}
		);
		builder.addMatcher(
			api.endpoints.changeUsername.matchFulfilled,
			(state, { payload }) => {
				state.user = payload;
				localStorage.setItem("user", JSON.stringify(payload));
			}
		);
		builder.addMatcher(
			api.endpoints.changePassword.matchFulfilled,
			(state, { payload }) => {
				state.user = payload;
				localStorage.setItem("user", JSON.stringify(payload));
			}
		);
	},
});

export default slice.reducer;

export const selectToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectUserProfileMode = (state: RootState) =>
	state.auth.userProfileMode;
export const setToken = slice.actions.setToken;
export const logout = slice.actions.logout;
