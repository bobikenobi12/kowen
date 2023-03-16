import { createSlice } from "@reduxjs/toolkit";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  _token: string;
  _documents: never[];
}

const [storedValue, setStoredValue] = useLocalStorage<User>("user", {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  avatar: "",
  _token: "",
  _documents: [],
});

const initialState: User = storedValue;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state = action.payload;
      setStoredValue(state);
    },
    logOut: (state) => {
      state = initialState;
      setStoredValue(state);
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: { auth: User }) => state.auth;
export const selectToken = (state: { auth: User }) => state.auth._token;
