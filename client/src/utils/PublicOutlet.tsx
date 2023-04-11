import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PublicOutlet() {
	const auth = useAuth();
	const location = useLocation();

	return auth.token === null ? (
		<Outlet />
	) : (
		<Navigate to="/groups" state={{ from: location }} />
	);
}
