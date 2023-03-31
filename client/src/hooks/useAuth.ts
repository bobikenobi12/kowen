import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";

export const useAuth = () => {
	const token = useSelector(selectToken);
	// localStorage.clear();
	return useMemo(() => ({ token }), [token]);
};
