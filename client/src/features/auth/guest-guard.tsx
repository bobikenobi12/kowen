import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export default function GuestGuard() {
	const location = useLocation();
	const token = useAppSelector(state => state.auth._token);

	return token ? (
		<Navigate
			to={location.state?.from || "/home"}
			state={{ from: location }}
			replace
		/>
	) : (
		<Outlet />
	);
}
