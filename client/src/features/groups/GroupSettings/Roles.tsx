import {
	HStack,
	Avatar,
	Text,
	VStack,
	Box,
	useColorModeValue,
	useToast,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	Button,
} from "@chakra-ui/react";

import { useAppDispatch, useTypedSelector } from "../../../hooks/store";
import {
	type Group,
	useGetRolesWithUsersQuery,
} from "../../../app/services/groups";

import { selectCurrentUser } from "../../auth/authSlice";

import CreateGroupRole from "./CreateGroupRole";

export default function GroupRoles({ group }: { group: Group }) {
	return (
		<Box
			w="full"
			h="full"
			bg={useColorModeValue("white", "gray.800")}
			p={4}
			rounded="md">
			<CreateGroupRole group={group} />
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Role Name</Th>
						<Th>Permissions</Th>
						<Th>Actions</Th>
					</Tr>
				</Thead>
				<Tbody>
					{group.roleInGroup.userId.map(role => (
						<Tr>
							<Td>{role}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
}
