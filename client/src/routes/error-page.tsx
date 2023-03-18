import { HStack, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

interface Error {
	status: number;
	statusText: string;
	message: string;
}

export default function ErrorPage() {
	const error = useRouteError() as Error;
	return (
		<HStack>
			<Text>{error.status}</Text>
			<Text>{error.statusText}</Text>
			<Text>{error.message}</Text>
		</HStack>
	);
}
