import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { useAppSelector } from "./app/hooks";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import ErrorPage from "./routes/error-page";

import GuestGuard from "./components/guards/guest-guard";
import UserGuard from "./components/guards/user-guard";
import SignIn from "./routes/sign-in";
import SignUp from "./routes/sign-up";

const router = createBrowserRouter([
	{
		element: <UserGuard />,
		children: [
			{
				path: "/",
				element: <Root />,
			},
			{
				path: "*",
				element: <ErrorPage />,
			},
		],
	},
	{
		element: <GuestGuard />,
		children: [
			{
				path: "/sign-in",
				element: <SignIn />,
			},
			{
				path: "/sign-up",
				element: <SignUp />,
			},
			{
				path: "*",
				element: <ErrorPage />,
			},
		],
	},
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
