import { Outlet, Navigate, useLocation, Location } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export default function UserGuard() {
	const user = useAppSelector(state => state.auth);
	const { state } = useLocation();

	if (!user._token) {
		return <Navigate to="/login" state={state} replace />;
	}

	return <Outlet />;
}
