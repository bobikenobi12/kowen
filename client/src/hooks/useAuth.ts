import { useMemo } from "react";
import { useTypedSelector } from "./store";
import { selectToken } from "../features/auth/authSlice";

export const useAuth = () => {
	const token = useTypedSelector(selectToken);
	// localStorage.clear();
	return useMemo(() => ({ token }), [token]);
};
