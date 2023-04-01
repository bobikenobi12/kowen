// create a logout

import {
	Box,
	Button,
	Flex,
	Heading,
	Link,
	Stack,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";

import { useLogoutMutation } from "../../app/services/auth";

import { useTypedSelector, useAppDispatch } from "../../hooks/store";
import { selectToken } from "./authSlice";

export default function Logout() {
	const dispatch = useAppDispatch();
	const token = useTypedSelector(selectToken);
	const [logout, { isLoading }] = useLogoutMutation();
	const toast = useToast();

	return (
		<Box>
			<Button
				onClick={async () => {
					try {
						await logout();
						dispatch({ type: "auth/logout" });
						toast({
							title: "Logout successful",
							status: "success",
							duration: 5000,
							isClosable: true,
						});
					} catch (error: any) {
						toast({
							title: "Logout failed",
							description: error.message,
							status: "error",
							duration: 5000,
							isClosable: true,
						});
						console.error(error);
					}
				}}
				isLoading={isLoading}
				colorScheme="red"
				variant="outline">
				Logout
			</Button>
		</Box>
	);
}
