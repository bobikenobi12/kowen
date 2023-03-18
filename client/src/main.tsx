import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import App from "./App";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/dashboard",
				element: <App />,
			},
			{
				path: "/settings",
				element: <div>Settings</div>,
			},
		],
	},
	// {
	// 	element: <ProtectedRoute />,
	// 	children: [
	// 		{
	// 			path: "/root",
	// 			element: (
	// 				<Root>
	// 					<Outlet />
	// 				</Root>
	// 			),
	// 		},
	// 		{
	// 			path: "/settings",
	// 			element: <div>Settings</div>,
	// 		},
	// 	],
	// },
	// {
	// 	path: "/login",
	// 	element: <div>Login</div>,
	// },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<RouterProvider router={router} />
			</ChakraProvider>
		</Provider>
	</React.StrictMode>
);
