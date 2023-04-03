import {
	Flex,
	VStack,
	Text,
	Avatar,
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useColorModeValue,
	useToast,
	HStack,
} from "@chakra-ui/react";

import * as React from "react";

import {
	useGetFoldersInGroupQuery,
	useSaveFolderToGroupMutation,
} from "../../app/services/folders";

import { useAppDispatch, useTypedSelector } from "../../hooks/store";

import { useNavigate } from "react-router-dom";

import { SettingsIcon, ArrowDownIcon } from "@chakra-ui/icons";

export default function Group() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { data: folders } = useGetFoldersInGroupQuery(4);

	// save folder to group
	const [saveFolderToGroup] = useSaveFolderToGroupMutation();

	return (
		// consists of 3 panes top mid and bottom
		// top pane: group name and arrow down icon that opens a dropdown menu with group settings and leave group
		// mid pane: list of folders
		// bottom pane: profile picture, username, first and last name, settings icon
		<Flex
			direction="column"
			w="full"
			h="full"
			bg={useColorModeValue("gray.200", "gray.600")}>
			<Flex
				direction="row"
				w="full"
				alignSelf={"flex-start"}
				bg={useColorModeValue("gray.200", "gray.600")}>
				<Text>Group Name</Text>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Group Options"
						icon={<ArrowDownIcon />}
						variant="outline"
					/>
					<MenuList>
						<MenuItem>Group Settings</MenuItem>
						<MenuItem>Leave Group</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
			<Flex
				direction="row"
				w="full"
				bg={useColorModeValue("gray.100", "gray.700")}>
				<VStack
					direction="column"
					w="full"
					h="full"
					bg={useColorModeValue("gray.100", "gray.700")}>
					{folders?.map(folder => (
						<Text>{folder.name}</Text>
					))}
				</VStack>
			</Flex>
			<Flex
				direction="row"
				w="full"
				alignSelf={"flex-end"}
				bg={useColorModeValue("gray.200", "gray.600")}>
				<Avatar />
				<VStack>
					<Text>Username</Text>
					<HStack>
						<Text>First Name</Text>
						<Text>Last Name</Text>
					</HStack>
				</VStack>
				<IconButton
					aria-label="User Options"
					icon={<SettingsIcon />}
					variant="outline"
					alignSelf={"flex-end"}
				/>
			</Flex>
		</Flex>
	);
}
