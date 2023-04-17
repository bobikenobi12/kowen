import {
	HStack,
	Box,
	useColorModeValue,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	List,
	ListItem,
	Button,
} from "@chakra-ui/react";

import { useTypedSelector } from "../../../hooks/store";

import {
	type Group,
	Permission,
	useGetRolesInGroupQuery,
	useGetUserPermissionsForGroupQuery,
} from "../../../app/services/groups";

import { selectIsCreator } from "../groupsSlice";

import CreateGroupRole from "./CreateGroupRole";
import RemoveRoleFromGroupDialog from "./RemoveRoleFromGroupDialog";

export default function GroupRoles({ group }: { group: Group }) {
	const isCreator = useTypedSelector(selectIsCreator);

	const { data: roles, isLoading, error } = useGetRolesInGroupQuery(group.id);
	const {
		data: permissions,
		isLoading: permissionsLoading,
		error: permissionsError,
	} = useGetUserPermissionsForGroupQuery(group.id);

	if (isLoading || permissionsLoading) return <Box>Loading...</Box>;
	if (error) return <Box>Error: {JSON.stringify(error)}</Box>;
	if (permissionsError)
		return <Box>Error: {JSON.stringify(permissionsError)}</Box>;

	return (
		<Box
			w="full"
			h="full"
			bg={useColorModeValue("white", "gray.800")}
			p={4}
			rounded="md">
			{permissions &&
				(permissions.includes(Permission.add_role) || isCreator) && (
					<CreateGroupRole group={group} />
				)}
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
										{permissions &&
											(permissions.includes(
												Permission.edit_role
											) ||
												isCreator) && (
												<Button
													colorScheme="blue"
													size="sm"
													onClick={() => {
														console.log(
															"Edit role"
														);
													}}>
													Edit
												</Button>
											)}
										{permissions &&
											(permissions.includes(
												Permission.remove_role
											) ||
												isCreator) && (
												<RemoveRoleFromGroupDialog
													group={group}
													role={role.roleUser}
												/>
											)}
									</HStack>
								</Td>
							</Tr>
						))}
				</Tbody>
			</Table>
		</Box>
	);
}
