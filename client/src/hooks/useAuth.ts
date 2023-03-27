import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";

export const useAuth = () => {
	const token = useSelector(selectToken);
	return useMemo(() => ({ token }), [token]);
};
