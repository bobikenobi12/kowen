import {
	HStack,
	Avatar,
	Text,
	VStack,
	Box,
	useColorModeValue,
	Button,
} from "@chakra-ui/react";

import { useTypedSelector } from "../../../hooks/store";

import {
	type Group,
	Permission,
	useGetUserPermissionsForGroupQuery,
} from "../../../app/services/groups";

import { selectIsCreator } from "../groupsSlice";

export default function GroupOverview({ group }: { group: Group }) {
	const bg = useColorModeValue("white", "gray.800");

	const isCreator = useTypedSelector(state =>
		selectIsCreator(state, group.id)
	);

	const {
		data: permissions,
		isLoading,
		error,
	} = useGetUserPermissionsForGroupQuery(group.id);

	if (isLoading) return <Box>Loading...</Box>;
	if (error) return <Box>Error: {JSON.stringify(error)}</Box>;

	return (
		<Box
			bg={bg}
			p={4}
			w="full"
			h="full"
			borderRadius="lg"
			boxShadow="lg"
			overflow="hidden"
			justifyContent="flex-start"
			alignItems="center"
			display="flex"
			flexDirection="column">
			<HStack spacing={4}>
				<Avatar size="xl" name={group.name} />
				<VStack align="start" spacing={1}>
					<Text fontSize="2xl" fontWeight="bold">
						{group.name}
					</Text>
					<Text fontSize="sm" color="gray.500">
						{group.description}
					</Text>
				</VStack>
			</HStack>
			{permissions &&
				(isCreator || permissions.includes(Permission.edit_group)) && (
					<Button mt={4} colorScheme="blue">
						Edit Group
					</Button>
				)}
		</Box>
	);
}
