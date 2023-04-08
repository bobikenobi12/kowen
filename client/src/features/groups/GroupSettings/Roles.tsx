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

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../../hooks/store";
import {
	type Group,
	useGetRolesWithUsersQuery,
} from "../../../app/services/groups";

import { selectCurrentUser } from "../../auth/authSlice";

import CreateGroupRole from "./CreateGroupRole";

export default function GroupRoles({ group }: { group: Group }) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { data: roles } = useGetRolesWithUsersQuery(group.id);
	const user = useTypedSelector(selectCurrentUser);
	console.log(roles);

	const toast = useToast();

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
					{roles?.map(role => (
						<Tr>
							<Td>{role.role.name}</Td>
							<Td>{role.role.permissions}</Td>
							<Td>
								<HStack>
									<Button>Edit</Button>
									<Button>Delete</Button>
								</HStack>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
}
