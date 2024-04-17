import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { PrivateOutlet } from "./utils/PrivateOutlet";
import { PublicOutlet } from "./utils/PublicOutlet";
import { SettingsOutlet } from "./utils/SettingsOutlet";

import Hero from "./components/Hero";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

import NotFound from "./components/common/NotFound";

import Groups from "./features/groups/Groups";
import Group from "./features/groups/Group";
import Folder from "./features/folders/Folder";
import Chat from "./features/chat/Chat";

import UserSettings from "./features/auth/UserSettings";

import Features from "./components/Features";

function App() {
	return (
		<Box>
			<Router>
				<Routes>
					<Route element={<PrivateOutlet />}>
						<Route path="groups" element={<Groups />}>
							<Route path=":groupId" element={<Group />}>
								<Route element={<Folder />} path=":folderId" />
								<Route element={<Chat />} path="chat" />
							</Route>
						</Route>
						<Route
							element={<SettingsOutlet />}
							path="groups/:groupId/settings"
						/>
						<Route path="settings" element={<UserSettings />} />
						<Route path="404" element={<NotFound />} />
						<Route path="*" element={<NotFound />} />
					</Route>

					<Route element={<PublicOutlet />}>
						<Route path="/" element={<Hero />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Route>
					<Route path="features" element={<Features />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</Box>
	);
}

export default App;
