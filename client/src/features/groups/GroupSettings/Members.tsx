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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useTypedSelector } from "../../../hooks/store";

import {
	type Group,
	useSetGroupRoleToUserMutation,
} from "../../../app/services/groups";
import { type User } from "../../../app/services/auth";
import { selectCurrentUser } from "../../auth/authSlice";

export default function GroupMembers({ group }: { group: Group }) {
	const user = useTypedSelector(selectCurrentUser) as User;
	const [setGroupRoleToUser] = useSetGroupRoleToUserMutation();
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

					{group.users.map(user => (
						<Tr key={user.id}>
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
								<IconButton
									aria-label="Add Role To Member"
									icon={<AddIcon />}
									size="sm"
									variant="ghost"
									onClick={async () => {
										try {
											await setGroupRoleToUser({
												groupId: group.id,
												userId: parseInt(user.id),
												roleId: 2,
											});
											toast({
												title: "Role added to member",
												description:
													"The role was added to the member",
												status: "success",
												duration: 5000,
												isClosable: true,
											});
										} catch (error) {
											toast({
												title: "Error adding role to member",

												description:
													"There was an error adding the role to the member",
												status: "error",
												duration: 5000,
												isClosable: true,
											});
										}
									}}
								/>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
}
