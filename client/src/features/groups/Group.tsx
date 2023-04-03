import {
	Box,
	Center,
	VStack,
	Text,
	useColorModeValue,
	Avatar,
	IconButton,
	Button,
} from "@chakra-ui/react";

import * as React from "react";

import {
	useGetFoldersInGroupQuery,
	useSaveFolderToGroupMutation,
} from "../../app/services/folders";

import { useTypedSelector } from "../../hooks/store";

import { useParams, useNavigate } from "react-router-dom";

export default function Group() {
	const { groupId } = useParams();

	const navigate = useNavigate();

	const { data: folders } = useGetFoldersInGroupQuery(
		parseInt(groupId as string)
	);

	// save folder to group
	const [saveFolderToGroup] = useSaveFolderToGroupMutation();

	return (
		<Box
			mx="auto"
			maxW={{ base: "xl", md: "4xl" }}
			py="12"
			px={{ base: "4", md: "6" }}>
			<VStack>
				{folders?.map(folder => (
					<Center
						key={folder.id}
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
						onClick={() => {
							navigate(`/groups/${groupId}/folders/${folder.id}`);
						}}>
						<Avatar size="xl" name={folder.name} />
						<Box ml="4" textAlign="left">
							<Text fontWeight="bold" fontSize="lg">
								{folder.name}
							</Text>
						</Box>
					</Center>
				))}
			</VStack>
			<Button
				onClick={async () => {
					await saveFolderToGroup({
						groupId: parseInt(groupId as string),
						name: "Anton Stakov",
					});
					navigate(0);
				}}>
				Add Folder
			</Button>
		</Box>
	);
}
