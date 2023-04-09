import { configureStore } from "@reduxjs/toolkit";
import { api as authApi } from "./services/auth";
import { api as groupApi } from "./services/groups";
import { api as folderApi } from "./services/folders";
import { api as documentsApi } from "./services/documents";
import authReducer from "../features/auth/authSlice";
import groupsReducer from "../features/groups/groupsSlice";
import routerReducer from "../features/router/routerSlice";
import foldersReducer from "../features/folders/folderSlice";
import documentReducer from "../features/documents/documentSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		groups: groupsReducer,
		router: routerReducer,
		folders: foldersReducer,
		documents: documentReducer,
		[authApi.reducerPath]: authApi.reducer,
		[groupApi.reducerPath]: groupApi.reducer,
		[folderApi.reducerPath]: folderApi.reducer,
		[documentsApi.reducerPath]: documentsApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			groupApi.middleware,
			folderApi.middleware,
			documentsApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
