import {
	Flex,
	HStack,
	Avatar,
	Text,
	useColorModeValue,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	VStack,
	Badge,
	Box,
	Heading,
	Divider,
} from "@chakra-ui/react";

import { useTypedSelector } from "../../hooks/store";

import { useGetRolesWithUsersQuery } from "../../app/services/groups";

import { useParams } from "react-router-dom";

import { FormatDate } from "../../utils/FormatDate";

import { selectGroupById } from "./groupsSlice";

import RoleBadge from "./GroupSettings/RoleBadge";

export default function MemberList() {
	const { groupId } = useParams();

	const group = useTypedSelector(state =>
		selectGroupById(state, Number(groupId))
	);

	const { data, isLoading, error } = useGetRolesWithUsersQuery(
		Number(groupId)
	);

	if (isLoading) return <div>Loading...</div>;
	if (error || !data) return <div>{JSON.stringify(error)}</div>;
	if (!group) return <div>Group not found</div>;

	return (
		<Flex
			direction="column"
			h={"100vh"}
			w="300px"
			bg={useColorModeValue("gray.100", "gray.700")}
			gap={2}
			alignItems="center"
			ml={"auto"}
			alignSelf={"flex-end"}
			overflowY="scroll">
			<Heading size="lg">Creator</Heading>
			<Box w="full" mt={2}>
				<Popover placement="left">
					<PopoverTrigger>
						<HStack
							p={2}
							w="full"
							h="full"
							cursor="pointer"
							bg={"transparent"}
							_hover={{
								bg: useColorModeValue("gray.100", "gray.600"),
							}}>
							<Avatar
								size="md"
								name={group?.creator.username}
								src={group?.creator.profilePicture}
							/>
							<Text>{group?.creator.username}</Text>
						</HStack>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverBody>
							<Box
								key={group?.creator.id}
								w="full"
								h="full"
								bg={useColorModeValue("gray.100", "gray.700")}>
								<HStack
									w="full"
									h="full"
									bg={useColorModeValue(
										"gray.100",
										"gray.700"
									)}>
									<Avatar
										size="md"
										name={group?.creator.username}
										src={group?.creator.profilePicture}
									/>
									<VStack
										w="full"
										h="full"
										bg={useColorModeValue(
											"gray.100",
											"gray.700"
										)}>
										<Text>{group?.creator.username}</Text>
										<Text>{group?.creator.email}</Text>
									</VStack>
								</HStack>
								<Divider mt={2} mb={2} />
								<HStack>
									<Text>{group?.creator.firstName}</Text>
									<Text>{group?.creator.lastName}</Text>
								</HStack>
								<HStack>
									<Text>Member since: </Text>
									<Text>
										{FormatDate(group?.creator.dateJoined)}
									</Text>
								</HStack>
							</Box>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			</Box>
			<Heading size="md">Members</Heading>
			{data.map(userWithRoles => (
				<Box key={userWithRoles.user.id} w="full">
					<Popover key={userWithRoles.user.id} placement="left">
						<PopoverTrigger>
							<HStack
								key={userWithRoles.user.id}
								p={2}
								w="full"
								h="full"
								cursor="pointer"
								bg={"transparent"}
								_hover={{
									bg: useColorModeValue(
										"gray.100",
										"gray.600"
									),
								}}>
								<Avatar
									size="md"
									name={userWithRoles.user.username}
									src={userWithRoles.user.profilePicture}
								/>
								<Text>{userWithRoles.user.username}</Text>
							</HStack>
						</PopoverTrigger>
						<PopoverContent>
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverBody>
								<Box
									key={userWithRoles.user.id}
									w="full"
									h="full"
									bg={useColorModeValue(
										"gray.100",
										"gray.700"
									)}>
									<HStack
										w="full"
										h="full"
										bg={useColorModeValue(
											"gray.100",
											"gray.700"
										)}>
										<Avatar
											size="md"
											name={userWithRoles.user.username}
											src={
												userWithRoles.user
													.profilePicture
											}
										/>
										<VStack
											w="full"
											h="full"
											bg={useColorModeValue(
												"gray.100",
												"gray.700"
											)}>
											<Text>
												{userWithRoles.user.username}
											</Text>
											<Text>
												{userWithRoles.user.email}
											</Text>
										</VStack>
									</HStack>
									<Divider mt={2} mb={2} />
									<HStack>
										<Text>
											{userWithRoles.user.firstName}
										</Text>
										<Text>
											{userWithRoles.user.lastName}
										</Text>
									</HStack>
									<HStack>
										<Text>Member since: </Text>
										<Text>
											{FormatDate(
												userWithRoles.user.dateJoined
											)}
										</Text>
									</HStack>
									<HStack>
										{userWithRoles.roles &&
											userWithRoles.roles.map(role => (
												<RoleBadge
													key={role.id}
													username={
														userWithRoles.user
															.username
													}
													userId={Number(
														userWithRoles.user.id
													)}
													groupId={group?.id}
													roleId={role.id}
													roleName={role.name}
												/>
											))}
									</HStack>
								</Box>
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</Box>
			))}
		</Flex>
	);
}
