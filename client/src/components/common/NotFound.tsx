import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function NotFound() {
	return (
		<>
			<ThemeToggle />
			<Flex
				minH={"100vh"}
				align={"center"}
				justify={"center"}
				flexDirection="column">
				<Heading
					display="inline-block"
					as="h2"
					size="2xl"
					bgGradient="linear(to-r, teal.400, teal.600)"
					backgroundClip="text">
					404
				</Heading>
				<Text fontSize="18px" mt={3} mb={2}>
					Page Not Found
				</Text>
				<Text color={"gray.500"} mb={6}>
					The page you're looking for does not seem to exist
				</Text>

				<Button
					colorScheme="teal"
					bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
					color="white"
					variant="solid">
					<Link to="/" state={{ from: "not-found" }}>
						Go Home
					</Link>
				</Button>
			</Flex>
		</>
	);
}
