// drawer of group icons
// each group icon is a button that opens the group's page

import {
	Box,
	Center,
	VStack,
	Text,
	Avatar,
	Button,
	useColorModeValue,
	useToast,
	IconButton,
	useColorMode,
} from "@chakra-ui/react";

import { useShowGroupsQuery } from "../../app/services/groups";
import { ArrowRightIcon } from "@chakra-ui/icons";

import { useAppDispatch } from "../../hooks/store";

import { Link } from "react-router-dom";

import Navbar from "../../components/Navigation/Navbar";

export default function Groups() {
	const toast = useToast();
	const { data } = useShowGroupsQuery();
	const dispatch = useAppDispatch();

	return (
		<>
			<Navbar />
			<Box
				mx="auto"
				maxW={{ base: "xl", md: "4xl" }}
				py="12"
				px={{ base: "4", md: "6" }}>
				<VStack>
					{data?.map(group => (
						<Center
							key={group.id}
							bg={useColorModeValue("white", "gray.800")}
							rounded="lg"
							shadow="base"
							overflow="hidden"
							w="full"
							h="full"
							p="6"
							_hover={{
								bg: useColorModeValue("gray.100", "gray.700"),
							}}
							transition="all 0.2s"
							cursor="pointer"
							as={Link}
							to={`/groups/${group.id}`}
							onClick={() =>
								dispatch({
									type: "router/setRoute",
									payload: {
										route: `/groups/${group.id}`,
										path: "/groups/:groupId",
										params: { groupId: group.id },
									},
								})
							}>
							<Avatar size="xl" name={group.name} />
							<Box ml="4" textAlign="left">
								<Text fontWeight="bold" fontSize="lg">
									{group.name}
								</Text>
								<Text
									fontSize="sm"
									color={useColorModeValue(
										"gray.600",
										"gray.400"
									)}>
									{group.description}
								</Text>
							</Box>
							<IconButton
								aria-label="View Group"
								icon={<ArrowRightIcon />}
								variant="ghost"
								colorScheme="blue"
								size="sm"
								ml="auto"
							/>
						</Center>
					))}
				</VStack>
			</Box>
		</>
	);
}
