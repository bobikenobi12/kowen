import {
	Heading,
	HStack,
	VStack,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Box,
	Avatar,
	Badge,
	Text,
	useColorModeValue,
	useToast,
	Icon,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	Flex,
} from "@chakra-ui/react";

import { useTypedSelector } from "../../../hooks/store";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import {
	type Group,
	useGetRolesWithUsersQuery,
	useRemoveRoleFromUserMutation,
} from "../../../app/services/groups";
import { type User } from "../../../app/services/auth";
import { selectCurrentUser } from "../../auth/authSlice";

import RoleMenu from "./RoleMenu";
import RemoveUserFromGroupModal from "./RemoveUserFromGroupModalDialog";
import RoleBadge from "./RoleBadge";

export default function GroupMembers({ group }: { group: Group }) {
	const user = useTypedSelector(selectCurrentUser) as User;
	const { data: rolesWithUsers } = useGetRolesWithUsersQuery(group.id);
	const [removeRoleFromUser] = useRemoveRoleFromUserMutation();
	const toast = useToast();

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
						<Th>Actions</Th>
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
						<Td colSpan={2}>
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
									<HStack spacing={3}>
										<HStack spacing={2}>
											{/* display the users roles up to 3 */}
											{/* if there are more than 3 roles, display the 3 roles and a badge with the number of remaining roles */}
											{userWithRoles.roles &&
												userWithRoles.roles
													.slice(0, 3)
													.map(role => (
														<RoleBadge
															key={role.id}
															roleId={role.id}
															roleName={
																role.roleUser
																	.name
															}
															userId={parseInt(
																userWithRoles
																	.user.id
															)}
															groupId={group.id}
															username={
																userWithRoles
																	.user
																	.username
															}
														/>
													))}
											{userWithRoles.roles &&
												userWithRoles.roles.length >
													3 && (
													<Popover>
														<PopoverTrigger>
															<Badge
																colorScheme="green"
																cursor="pointer">
																+
																{userWithRoles
																	.roles
																	.length - 3}
															</Badge>
														</PopoverTrigger>
														<PopoverContent>
															<PopoverArrow />
															<PopoverCloseButton />
															<PopoverHeader>
																Roles
															</PopoverHeader>
															<PopoverBody>
																<Flex
																	alignItems="center"
																	wrap={
																		"wrap"
																	}
																	w="fit-content"
																	gap={2}>
																	{userWithRoles.roles.map(
																		role => (
																			<Badge
																				colorScheme="green"
																				key={
																					role.id
																				}>
																				<HStack
																					spacing={
																						2
																					}>
																					<Text>
																						{
																							role
																								.roleUser
																								.name
																						}
																					</Text>
																					<Icon
																						as={
																							IoMdRemoveCircleOutline
																						}
																						cursor="pointer"
																						size="sm"
																						_hover={{
																							transform:
																								"scale(1.1)",
																							transition:
																								"all 0.2s ease-in-out",
																							color: useColorModeValue(
																								"red.500",
																								"red.100"
																							),
																						}}
																						onClick={async () => {
																							try {
																								await removeRoleFromUser(
																									{
																										groupId:
																											group.id,
																										roleId: role.id,
																										userId: parseInt(
																											userWithRoles
																												.user
																												.id
																										),
																									}
																								);
																								toast(
																									{
																										title: "Role removed",
																										description: `You have removed the role ${role.roleUser.name} from ${userWithRoles.user.username}`,
																										status: "success",
																										duration: 5000,
																										isClosable:
																											true,
																									}
																								);
																							} catch (err) {
																								console.log(
																									err
																								);
																								toast(
																									{
																										title: "Error",
																										description:
																											"There was an error removing the role",
																										status: "error",
																										duration: 5000,
																										isClosable:
																											true,
																									}
																								);
																							}
																						}}
																					/>
																				</HStack>
																			</Badge>
																		)
																	)}
																</Flex>
															</PopoverBody>
														</PopoverContent>
													</Popover>
												)}
										</HStack>
									</HStack>
								</Td>
								<Td>
									<HStack spacing={4}>
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
