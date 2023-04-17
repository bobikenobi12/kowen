import {
	HStack,
	Box,
	useColorModeValue,
	useToast,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	List,
	ListItem,
} from "@chakra-ui/react";

import { useAppDispatch } from "../../../hooks/store";
import {
	type Group,
	useGetRolesInGroupQuery,
} from "../../../app/services/groups";

import CreateGroupRole from "./CreateGroupRole";
import RemoveRoleFromGroupDialog from "./RemoveRoleFromGroupDialog";

export default function GroupRoles({ group }: { group: Group }) {
	const toast = useToast();
	const dispatch = useAppDispatch();
	const { data: roles, isLoading, error } = useGetRolesInGroupQuery(group.id);

	if (isLoading) return <Box>Loading...</Box>;
	if (error) return <Box>Error: {JSON.stringify(error)}</Box>;

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
					{roles &&
						roles.map(role => (
							<Tr key={role.id}>
								<Td>{role.roleUser.name}</Td>
								<Td>
									<List spacing={3} styleType="disc">
										{role.roleUser.permissions.map(
											(permission, idx) => (
												<ListItem
													key={idx}
													fontSize="sm"
													color={useColorModeValue(
														"gray.600",
														"gray.400"
													)}>
													{permission}
												</ListItem>
											)
										)}
									</List>
								</Td>
								<Td>
									<HStack>
										<RemoveRoleFromGroupDialog
											group={group}
											role={role.roleUser}
										/>
									</HStack>
								</Td>
							</Tr>
						))}
				</Tbody>
			</Table>
		</Box>
	);
}
