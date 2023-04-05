import {
	Table,
	TableCaption,
	Thead,
	Tbody,
	Tr,
	Td,
	Th,
	Flex,
	Heading,
	IconButton,
} from "@chakra-ui/react";
import { selectCurrentUser } from "./authSlice";
import { useTypedSelector, useAppDispatch } from "../../hooks/store";
import { FormatDate } from "../../utils/FormatDate";

import { EditIcon } from "@chakra-ui/icons";

export default function ViewOnlyUserDetails() {
	const user = useTypedSelector(selectCurrentUser);
	const dispatch = useAppDispatch();

	return (
		<Table variant="simple">
			<TableCaption placement="top" px={2}>
				<Flex
					direction="row"
					w="full"
					justifyContent={"space-between"}
					alignItems={"center"}
					mx="auto">
					<Heading size="md">User Settings</Heading>
					<IconButton
						aria-label="Edit User Settings"
						icon={<EditIcon />}
						variant="unstyled"
						rounded={"full"}
						color={"gray.800"}
						bg={"white"}
						_hover={{
							bg: "gray.100",
							transform: "scale(1.1)",
							borderRadius: "30%",
						}}
						onClick={() => {
							dispatch({
								type: "auth/setUserProfileMode",
								payload: "edit",
							});
						}}
					/>
				</Flex>
			</TableCaption>
			<Tbody>
				<Tr>
					<Th>Full Name</Th>
					<Td>
						{user?.firstName} {user?.lastName}
					</Td>
				</Tr>
				<Tr>
					<Th>Email</Th>
					<Td>{user?.email}</Td>
				</Tr>
				<Tr>
					<Th>Username</Th>
					<Td>{user?.username}</Td>
				</Tr>
				<Tr>
					<Th>Date Joined</Th>
					<Td>{FormatDate(user?.dateJoined as Date)}</Td>
				</Tr>
			</Tbody>
		</Table>
	);
}
