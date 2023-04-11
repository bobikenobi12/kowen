import { useMemo } from "react";
import { useTypedSelector } from "./store";
import { selectToken } from "../features/auth/authSlice";
import { selectCurrentUser } from "../features/auth/authSlice";

export const useAuth = () => {
	const token = useTypedSelector(selectToken);
	const user = useTypedSelector(selectCurrentUser);
	localStorage.clear();
	return useMemo(() => ({ token, user }), [token, user]);
};
