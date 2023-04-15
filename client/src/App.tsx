import {
	BrowserRouter as Router,
	Routes,
	Route,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { PrivateOutlet } from "./utils/PrivateOutlet";
import { PublicOutlet } from "./utils/PublicOutlet";

import Hero from "./components/Hero";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

import NotFound from "./components/common/NotFound";

import Groups from "./features/groups/Groups";
import Group from "./features/groups/Group";
import Folder from "./features/folders/Folder";

import UserSettings from "./features/auth/UserSettings";
import GroupSettings from "./features/groups/GroupSettings/GroupSettings";

// const router = createBrowserRouter([
// 	{
// 		element: <PrivateOutlet />,
// 		children: [
// 			{
// 				path: "/groups/",
// 				element: <Groups />,
// 				errorElement: <NotFound />,
// 				children: [
// 					{
// 						path: ":groupId/",
// 						element: <Group />,
// 						children: [
// 							{
// 								path: "folders/:folderId",
// 								element: <Folder />,
// 							},
// 						],
// 					},
// 				],
// 			},
// 			{
// 				path: "/settings",
// 				element: <UserSettings />,
// 			},
// 			{
// 				path: "/groups/:groupId/settings",
// 				element: <GroupSettings />,
// 			},
// 			{
// 				path: "/404",
// 				element: <NotFound />,
// 			},
// 			{
// 				path: "*",
// 				element: <NotFound />,
// 			},
// 		],
// 	},
// 	{
// 		element: <PublicOutlet />,
// 		children: [
// 			{
// 				path: "/",
// 				element: <Hero />,
// 			},
// 			{
// 				path: "/login",
// 				element: <Login />,
// 			},
// 			{
// 				path: "/register",
// 				element: <Register />,
// 			},
// 		],
// 	},
// ]);

function App() {
	return (
		<Box>
			<Router>
				<Routes>
					<Route element={<PrivateOutlet />}>
						<Route path="groups" element={<Groups />}>
							<Route path=":groupId" element={<Group />}>
								<Route
									path="folders/:folderId"
									element={<Folder />}
								/>
								<Route
									path="settings"
									element={<GroupSettings />}
								/>
							</Route>
						</Route>
						<Route path="settings" element={<UserSettings />} />
						<Route path="404" element={<NotFound />} />
						<Route path="*" element={<NotFound />} />
					</Route>

					<Route element={<PublicOutlet />}>
						<Route path="/" element={<Hero />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Route>
				</Routes>
			</Router>
		</Box>
	);
}

export default App;
