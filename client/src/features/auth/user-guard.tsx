import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export default function UserGuard() {
	const location = useLocation();
	const token = useAppSelector(state => state.auth._token);

	return token ? (
		<Outlet />
	) : (
		<Navigate to="auth/login" state={{ from: location }} replace />
	);
}
