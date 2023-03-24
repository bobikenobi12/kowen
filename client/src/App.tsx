import { Provider } from "react-redux";
import { store } from "./app/store";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout";
import Root from "./routes/root";
import Home from "./routes/home";
import ErrorPage from "./routes/error-page";
import UserGuard from "./features/auth/user-guard";
import GuestGuard from "./features/auth/guest-guard";
import Register from "./features/auth/register";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <UserGuard />,
				children: [
					{
						path: "/",
						element: <Root />,
					},
					{
						path: "home",
						element: <Home />,
					},
				],
			},
			{
				path: "auth/",
				element: <GuestGuard />,
				children: [
					{
						path: "register",
						element: <Register />,
					},
				],
			},
		],
	},
]);

export default function App() {
	return (
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<RouterProvider router={router} />
			</ChakraProvider>
		</Provider>
	);
}
