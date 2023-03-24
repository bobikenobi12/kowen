import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../app/api/types/index";

const initialState: User = {
	id: "",
	username: "",
	firstName: "",
	lastName: "",
	email: "",
	avatar: "",
	_token: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials(state, action) {
			const { id, username, firstName, lastName, email, avatar, _token } =
				action.payload;
			state.id = id;
			state.username = username;
			state.firstName = firstName;
			state.lastName = lastName;
			state.email = email;
			state.avatar = avatar;
			state._token = _token;
			localStorage.setItem("auth", JSON.stringify(state));
		},
		logout(state) {
			state.id = "";
			state.username = "";
			state.firstName = "";
			state.lastName = "";
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
