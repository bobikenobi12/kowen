import { Routes, Route } from "react-router-dom";
import { Box, Center, VStack, Text } from "@chakra-ui/react";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

import { PrivateOutlet } from "./utils/PrivateOutlet";
import { PublicOutlet } from "./utils/PublicOutlet";

function App() {
	return (
		<Box>
			<Routes>
				<Route element={<PublicOutlet />}>
					<Route index path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
				<Route path="/" element={<PrivateOutlet />}>
					<Route index element={<Text>Home</Text>} />
				</Route>
			</Routes>
		</Box>
	);
}

export default App;
