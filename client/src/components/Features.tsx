import {
	Box,
	Button,
	Heading,
	Text,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export default function Features() {
	const navigate = useNavigate();

	return (
		<Box
			height="100vh"
			width="100vw"
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			gap={5}>
			<VStack
				border={useColorModeValue("1px solid black", "1px solid white")}
				padding={5}
				borderRadius={5}
				boxShadow={useColorModeValue("md", "lg")}>
				<Heading>Features</Heading>

				<Text> - Simple, intuitive, and easy to use</Text>
				<Text> - Secure, with user authentication</Text>
				<Text>
					{" "}
					- Provides a hierarchical folder structure for organizing
					documents
				</Text>
				<Text>
					{" "}
					- There is a hierarchical permission system for controlling
					access to documents and folders
				</Text>
				<Text> - Dynamic search for finding documents</Text>
				<Text> - Stores the contents of documents in a database</Text>
				<Text>
					{" "}
					- Documents can be uploaded via the web interface or via the
					REST API
				</Text>
				<Text>
					{" "}
					- Documents can be downloaded via the web interface or via
					the REST API
				</Text>
				<Text> - Documents can be organized into folders</Text>
				<Text>
					{" "}
					- Group chat for sharing information with other users
				</Text>
			</VStack>
			<Button
				colorScheme="teal"
				bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
				color="white"
				variant="solid"
				onClick={() => navigate("/login")}>
				Login
			</Button>
		</Box>
	);
}
