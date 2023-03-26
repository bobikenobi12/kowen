import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PublicOutlet() {
	const auth = useAuth();
	const location = useLocation();

	return auth.token === null ? (
		<Outlet />
	) : (
		<Navigate to="/" state={{ from: location }} />
	);
}
