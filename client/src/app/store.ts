import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

// Api Slices
import { apiSlice } from "./services/apiSlice";

// Reducers
import authReducer from "../features/auth/authSlice";
import groupsReducer from "../features/groups/groupsSlice";
import foldersReducer from "../features/folders/foldersSlice";
import documentReducer from "../features/documents/documentSlice";
import chatSlice from "../features/chat/chatSlice";

const appReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	auth: authReducer,
	groups: groupsReducer,
	folders: foldersReducer,
	documents: documentReducer,
	chat: chatSlice,
});

const rootReducer = (state: any, action: any) => {
	if (action.type === "auth/logout") {
		state = undefined;
	}
	return appReducer(state, action);
};

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
