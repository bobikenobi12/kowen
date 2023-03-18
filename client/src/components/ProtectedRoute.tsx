import { Outlet, Navigate, useLocation, Location } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function ProtectedRoute() {
	const user = useAppSelector(state => state.auth);
	const location = useLocation();

	if (!user._token) {
		return <Navigate to={{ pathname: "/login" }} />;
	}

	return <Outlet />;
}
