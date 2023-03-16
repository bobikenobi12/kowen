import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  _token: string;
}

const initialState: User = JSON.parse(localStorage.getItem("user") || "{}");

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { id, first_name, last_name, email, avatar, _token } = action.payload;
      state.id = id;
      state.first_name = first_name;
      state.last_name = last_name;
      state.email = email;
      state.avatar = avatar;
      state._token = _token;
    },
  //   logOut(state) { 
  //     state.id = "";
  //     state.first_name = "";
  //     state.last_name = "";
  //     state.email = "";
  //     state.avatar = "";
  //     state._token = "";
  // },
  },
});

// will add logout if needed
export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
