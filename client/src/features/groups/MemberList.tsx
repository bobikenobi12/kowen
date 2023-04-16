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
} from "@chakra-ui/react";

import { useTypedSelector } from "../../hooks/store";

import { useGetRolesWithUsersQuery } from "../../app/services/groups";

import { useParams } from "react-router-dom";

import { FormatDate } from "../../utils/FormatDate";

import { selectGroupById } from "./groupsSlice";

import RoleBadge from "./GroupSettings/RoleBadge";

export default function MemberList() {
	const { groupId } = useParams();

	if (!groupId) {
		return null;
	}

	const { data: roles } = useGetRolesWithUsersQuery(
		parseInt(groupId as string)
	);

	const group = useTypedSelector(state =>
		selectGroupById(
			state,
			parseInt(useParams<{ groupId: string }>().groupId as string)
		)
	);

	return (
		<Flex
			direction="column"
			position="fixed"
			h={"100vh"}
			bg={useColorModeValue("gray.100", "gray.700")}
			alignItems="center"
			right={0}>
			{/* {roles?.map(userWithRoles => (
				<Popover key={userWithRoles.user.id} placement="left">
					<PopoverTrigger>
						<HStack
							key={userWithRoles.user.id}
							w="full"
							h="full"
							cursor="pointer"
							bg={useColorModeValue("gray.100", "gray.600")}>
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
							<VStack
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
										name={userWithRoles.user.username}
										src={userWithRoles.user.profilePicture}
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
										<Text>{userWithRoles.user.email}</Text>
									</VStack>
								</HStack>
								<HStack>
									<Text>{userWithRoles.user.firstName}</Text>
									<Text>{userWithRoles.user.lastName}</Text>
								</HStack>
								<HStack>
									<Text>Member since</Text>
									<Text>
										{FormatDate(
											userWithRoles.user.dateJoined
										)}
									</Text>
								</HStack>
								<Text>Roles</Text>
								<Flex
									wrap={"wrap"}
									align={"center"}
									justify={"center"}>
									{userWithRoles.roles.map(role => (
										<Badge key={role.id} m={1}>
											{role.roleUser.name}
										</Badge>
									))}
								</Flex>
							</VStack>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			))} */}
		</Flex>
	);
}
