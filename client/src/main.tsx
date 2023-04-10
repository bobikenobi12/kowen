import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./app/store";

// import { worker } from "./mocks/browser";
import { Provider } from "react-redux";

import theme from "./theme";
// Initialize the msw worker, wait for the service worker registration to resolve, then mount
// worker.start({ quiet: true }).then(() =>
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ChakraProvider>
		</Provider>
	</React.StrictMode>
);
// );
