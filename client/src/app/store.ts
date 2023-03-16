import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { userApiSlice } from "../app/api/user-api-slice";
import authMiddleware from "./middleware/authMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userApiSlice.middleware, authMiddleware);
  }

});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
