import {
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

const router = createBrowserRouter([
	{
		element: <PrivateOutlet />,
		children: [
			{
				path: "/groups/",
				element: <Groups />,
				children: [
					{
						path: ":groupId/",
						element: <Group />,
						children: [
							{
								path: "folders/:folderId",
								element: <Folder />,
							},
						],
					},
				],
			},
			{
				path: "/settings",
				element: <UserSettings />,
			},
			{
				path: "/groups/:groupId/settings",
				element: <GroupSettings />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
	{
		element: <PublicOutlet />,
		children: [
			{
				path: "/",
				element: <Hero />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
]);

function App() {
	return (
		<Box>
			<RouterProvider router={router} />
		</Box>
	);
}

export default App;
