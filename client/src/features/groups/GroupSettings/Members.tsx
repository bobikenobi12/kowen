import {
	Heading,
	HStack,
	VStack,
	Table,
	TableCaption,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Box,
	Avatar,
	Badge,
	IconButton,
	Text,
	useColorModeValue,
	useToast,
	Tooltip,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useTypedSelector } from "../../../hooks/store";

import {
	type Group,
	useGetRolesWithUsersQuery,
} from "../../../app/services/groups";
import { type User } from "../../../app/services/auth";
import { selectCurrentUser } from "../../auth/authSlice";

import RoleMenu from "./RoleMenu";
import RemoveUserFromGroupModal from "./RemoveUserFromGroupModal";

export default function GroupMembers({ group }: { group: Group }) {
	const user = useTypedSelector(selectCurrentUser) as User;
	const { data: rolesWithUsers } = useGetRolesWithUsersQuery(group.id);

	return (
		<Box
			w="full"
			h="full"
			bg={useColorModeValue("white", "gray.800")}
			p={4}
			rounded="md">
			<Heading size="md" mb={4} fontWeight="bold">
				Group Members ({group.users.length + 1})
			</Heading>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Member</Th>
						<Th>Role</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>
							<HStack spacing={4}>
								<Avatar size="sm" name={user.username} />
								<VStack align="start" spacing={1}>
									<Text>
										{user.firstName} {user.lastName}
									</Text>
									<Text fontSize="sm" color="gray.500">
										{user.username}
									</Text>
								</VStack>
							</HStack>
						</Td>
						<Td>
							<Badge colorScheme="green">Member</Badge>
						</Td>
					</Tr>

					{rolesWithUsers &&
						rolesWithUsers.map(userWithRoles => (
							<Tr key={userWithRoles.user.id}>
								<Td>
									<HStack spacing={4}>
										<Avatar
											size="sm"
											name={userWithRoles.user.username}
										/>
										<VStack align="start" spacing={1}>
											<Text>
												{userWithRoles.user.firstName}{" "}
												{userWithRoles.user.lastName}
											</Text>
											<Text
												fontSize="sm"
												color="gray.500">
												{userWithRoles.user.username}
											</Text>
										</VStack>
									</HStack>
								</Td>
								<Td>
									<HStack spacing={4}>
										<HStack spacing={2}>
											{Array.from(
												userWithRoles.roles.slice(0, 3)
											).map(role => (
												<Badge
													colorScheme="green"
													key={role.id}>
													{role.roleUser.name}
												</Badge>
											))}
											{userWithRoles.roles.length > 3 && (
												<Tooltip
													hasArrow
													bg={useColorModeValue(
														"white",
														"gray.500"
													)}
													label={userWithRoles.roles
														.slice(3)
														.map(role => (
															<Badge
																colorScheme="green"
																key={role.id}>
																{
																	role
																		.roleUser
																		.name
																}
															</Badge>
														))}>
													<Badge colorScheme="green">
														{userWithRoles.roles
															.length - 3}{" "}
														more
													</Badge>
												</Tooltip>
											)}
										</HStack>
										<RoleMenu
											user={userWithRoles.user}
											group={group}
										/>
										<RemoveUserFromGroupModal
											user={userWithRoles.user}
											group={group}
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
