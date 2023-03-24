import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export default function Layout() {
	return (
		<Box>
			<Outlet />
		</Box>
	);
}
