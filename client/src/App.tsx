import { Routes, Route } from "react-router-dom";
import { Box, Center, VStack, Text } from "@chakra-ui/react";

import { PrivateOutlet } from "./utils/PrivateOutlet";
import { PublicOutlet } from "./utils/PublicOutlet";

import Hero from "./components/Hero";
import Navbar from "./components/Navigation/Navbar";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

import NotFound from "./components/common/NotFound";

import Dashboard from "./components/Dashboard/Dashboard";

import UserSettings from "./features/auth/UserSettings";
import GroupSettings from "./features/groups/GroupSettings/GroupSettings";

function App() {
	return (
		<Box>
			<Routes>
				<Route element={<PublicOutlet />}>
					<Route index path="/" element={<Hero />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
				<Route element={<PrivateOutlet />}>
					<Route index path="/dashboard" element={<Dashboard />} />
					<Route path="/user-settings" element={<UserSettings />} />
					<Route
						path="dashboard/group-settings/:groupId"
						element={<GroupSettings />}
					/>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Box>
	);
}

export default App;
