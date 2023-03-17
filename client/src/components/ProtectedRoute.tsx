import { Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function ProtectedRoute({ children, ...rest }: any) {
	const user = useAppSelector(state => state.auth);

	return (
		<Route
			{...rest}
			render={() =>
				user ? (
					children
				) : (
					<Navigate
						to={{
							pathname: "/login",
						}}
					/>
				)
			}
		/>
	);
}
