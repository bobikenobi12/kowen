import { configureStore } from "@reduxjs/toolkit";
import { api as authApi } from "./services/auth";
import { api as groupApi } from "./services/groups";
import authReducer from "../features/auth/authSlice";
import groupsReducer from "../features/groups/groupsSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		groups: groupsReducer,
		[authApi.reducerPath]: authApi.reducer,
		[groupApi.reducerPath]: groupApi.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
