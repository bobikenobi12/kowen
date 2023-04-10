// create a logout

import { Box, Button, useToast } from "@chakra-ui/react";

import { useLogoutMutation } from "../../app/services/auth";

import { useAppDispatch } from "../../hooks/store";

export default function Logout() {
	const [logout, { isLoading }] = useLogoutMutation();
	const toast = useToast();
	const dispatch = useAppDispatch();

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
