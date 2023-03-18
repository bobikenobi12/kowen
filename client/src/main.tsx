import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";

import App from "./App";
import ErrorPage from "./pages/error-page";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		element: <ProtectedRoute />,
		children: [
			{
				path: "/dashboard",
				element: <div>Dashboard</div>,
			},
			{
				path: "/settings",
				element: <div>Settings</div>,
			},
		],
	},
	{
		path: "/login",
		element: <div>Login</div>,
	},
	{
		path: "*",
		element: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider>
				<RouterProvider router={router} />
			</ChakraProvider>
		</Provider>
	</React.StrictMode>
);
