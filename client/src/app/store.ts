import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
// Middleware
import { asyncFunctionMiddleware } from "./middleware/asyncFucntionMiddleware";

// Api
import { api as authApi } from "./services/auth";
import { api as groupApi } from "./services/groups";
import { api as folderApi } from "./services/folders";
import { api as documentsApi } from "./services/documents";
import { api as chatApi } from "./services/chat";

// Reducers
import authReducer from "../features/auth/authSlice";
import groupsReducer from "../features/groups/groupsSlice";
import routerReducer from "../features/router/routerSlice";
import foldersReducer from "../features/folders/foldersSlice";
import documentReducer from "../features/documents/documentSlice";
import chatSlice from "../features/chat/chatSlice";

const appReducer = combineReducers({
	auth: authReducer,
	groups: groupsReducer,
	router: routerReducer,
	folders: foldersReducer,
	documents: documentReducer,
	chat: chatSlice,
	[authApi.reducerPath]: authApi.reducer,
	[groupApi.reducerPath]: groupApi.reducer,
	[folderApi.reducerPath]: folderApi.reducer,
	[documentsApi.reducerPath]: documentsApi.reducer,
	[chatApi.reducerPath]: chatApi.reducer,
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
		}).concat(
			authApi.middleware,
			groupApi.middleware,
			folderApi.middleware,
			documentsApi.middleware,
			chatApi.middleware,
			asyncFunctionMiddleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
