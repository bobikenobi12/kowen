import { Routes, Route } from "react-router-dom";
import { Box, Center, VStack, Text } from "@chakra-ui/react";

import { Login } from "./features/auth/Login";
import { PrivateOutlet } from "./utils/PrivateOutlet";
// import { ProtectedComponent } from "./features/auth/ProtectedComponent";
import { PublicOutlet } from "./utils/PublicOutlet";
// function Hooray() {
// 	return (
// 		<Center h="500px">
// 			<VStack>
// 				<Box>Hooray you logged in!</Box>
// 				<Box>
// 					<ProtectedComponent />
// 				</Box>
// 			</VStack>
// 		</Center>
// 	);
// }

function App() {
	return (
		<Box>
			<Routes>
				<Route element={<PublicOutlet />}>
					<Route path="/login" element={<Login />} />
				</Route>
				<Route path="/" element={<PrivateOutlet />}>
					<Route index element={<Text>Home</Text>} />
				</Route>
			</Routes>
		</Box>
	);
}

export default App;
