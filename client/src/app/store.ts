import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth-slice";
import { authApi } from "../features/auth/auth-api-slice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware().concat(authApi.middleware);
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
