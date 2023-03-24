import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../app/api/types/index";

const initialState: User = {
	id: "",
	username: "",
	first_name: "",
	last_name: "",
	email: "",
	avatar: "",
	_token: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials(state, action) {
			const {
				id,
				username,
				first_name,
				last_name,
				email,
				avatar,
				_token,
			} = action.payload;
			state.id = id;
			state.username = username;
			state.first_name = first_name;
			state.last_name = last_name;
			state.email = email;
			state.avatar = avatar;
			state._token = _token;
			localStorage.setItem("auth", JSON.stringify(state));
		},
		logout(state) {
			state.id = "";
			state.username = "";
			state.first_name = "";
			state.last_name = "";
			state.email = "";
			state.avatar = "";
			state._token = "";
			localStorage.removeItem("auth");
		},
	},
});

// will add logout if needed
export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
