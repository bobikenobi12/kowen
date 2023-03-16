import useLocalStorage from "../../hooks/useLocalStorage";
import { RootState, AppDispatch } from "../store";
import { setCredentials } from "../../features/auth/authSlice";
import { User } from "../api/types";

// if any of the user-api-slice endpoints are called, then update the local storage and the redux store with the new user data
// do that with custom middleware

const authMiddleware: any = (store: { getState: () => RootState; dispatch: AppDispatch }) => (next: any) => (action: any) => {
    const result = next(action);
    const state = store.getState();
    
    const setUser = useLocalStorage("user", {} as User)[1];

    if (state.userApi.mutations.login?.status === "fulfilled") {
        const user: User = state.userApi.mutations.login.data as User;
        setUser(user);
        store.dispatch(setCredentials(user));
    } else if (state.userApi.mutations.register?.status === "fulfilled") {
        const user: User = state.userApi.mutations.register.data as User;
        setUser(user);
        store.dispatch(setCredentials(user));
    } else if (state.userApi.mutations.logout?.status === "fulfilled") {
        setUser({} as User);
        store.dispatch(setCredentials({}));
    } else if (state.userApi.queries.getUser?.status === "fulfilled") { // debating on where to use this, but for now it's here
        const user: User = state.userApi.queries.getUser.data as User;
        setUser(user);
        store.dispatch(setCredentials(user));
    }

    return result;
}

export default authMiddleware;


