import { Routes, Route } from "react-router-dom";
import { Box, Center, VStack, Text } from "@chakra-ui/react";

import { PrivateOutlet } from "./utils/PrivateOutlet";
import { PublicOutlet } from "./utils/PublicOutlet";

import Hero from "./components/Hero";
import Navbar from "./components/Navigation/Navbar";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

import NotFound from "./components/common/NotFound";

import Groups from "./features/groups/Groups";
import Group from "./features/groups/Group";

import { useAppDispatch } from "./hooks/store";

function App() {
	const dispatch = useAppDispatch();

	return (
		<Box>
			<Routes>
				<Route element={<PublicOutlet />}>
					<Route index path="/" element={<Hero />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
				<Route path="/" element={<PrivateOutlet />}>
					<Route path="home" element={<Navbar />} />
					<Route path="groups" element={<Groups />} />
					{/* when a group is clicked we want to dispatch the route to the store */}
					<Route path="groups/:groupId" element={<Group />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Box>
	);
}

export default App;
