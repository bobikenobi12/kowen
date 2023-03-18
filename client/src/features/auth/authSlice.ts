import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../app/api/types/index";

const initialState: User = JSON.parse(localStorage.getItem("user") || "{}");

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials(state, action) {
			const { id, first_name, last_name, email, avatar, _token } =
				action.payload;
			state.id = id;
			state.first_name = first_name;
			state.last_name = last_name;
			state.email = email;
			state.avatar = avatar;
			state._token = _token;
		},
		getCredentials(state) {
			return state;
		},
	},
});

// will add logout if needed
export const { setCredentials } = authSlice.actions;
export const { getCredentials } = authSlice.actions;

export default authSlice.reducer;
