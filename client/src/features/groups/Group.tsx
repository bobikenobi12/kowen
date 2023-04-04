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
	CloseButton,
	Icon,
} from "@chakra-ui/react";

import * as React from "react";

import {
	useGetFoldersInGroupQuery,
	useSaveFolderToGroupMutation,
} from "../../app/services/folders";

import { useTypedSelector, useAppDispatch } from "../../hooks/store";
import { selectCurrentGroup } from "./groupsSlice";
import { selectFolders } from "../folders/folderSlice";
import { type Folder } from "../../app/services/folders";

import {
	SettingsIcon,
	ChevronDownIcon,
	InfoOutlineIcon,
	DeleteIcon,
	EditIcon,
} from "@chakra-ui/icons";

import EditFolder from "../folders/EditFolder";

export default function Group() {
	const group = useTypedSelector(selectCurrentGroup);
	const { data: folders } = useGetFoldersInGroupQuery(group!.id);

	console.log("folders", folders);
	return (
		// consists of 3 panes top mid and bottom
		// top pane: group name and arrow down icon that opens a dropdown menu with group settings and leave group
		// mid pane: list of folders
		// bottom pane: profile picture, username, first and last name, settings icon
		<Flex
			direction="column"
			w="full"
			h="full"
			bg={useColorModeValue("gray.50", "inherit")}>
			<Flex
				direction="row"
				w="full"
				alignSelf={"flex-start"}
				justifyContent={"space-between"}
				alignItems={"center"}
				bg={useColorModeValue("gray.200", "gray.600")}
				shadow="md">
				<Menu isLazy>
					{({ isOpen }) => (
						<>
							<MenuButton
								w="full"
								p={3}
								transition={"all .3s ease"}
								rightIcon={
									isOpen ? (
										<CloseButton />
									) : (
										<IconButton
											aria-label="Group Options"
											icon={<ChevronDownIcon />}
											variant="ghost"
											size={"sm"}
										/>
									)
								}
								textAlign="left"
								border={0}
								isActive={isOpen}
								as={IconButton}
								aria-label="Group Options">
								Testing
							</MenuButton>
							<MenuList>
								<MenuItem>Group Settings</MenuItem>
								<MenuItem>Leave Group</MenuItem>
							</MenuList>
						</>
					)}
				</Menu>
			</Flex>
			<VStack
				w="full"
				py={4}
				h="full"
				gap={2}
				bg={useColorModeValue("gray.100", "gray.700")}>
				{folders ? (
					folders.map((folder: Folder) => {
						return (
							<Flex
								key={folder.id}
								direction="row"
								alignItems={"center"}
								justifyContent={"space-between"}
								w="full"
								h={12}
								p={4}
								bg={useColorModeValue("gray.100", "gray.700")}>
								<Icon
									as={InfoOutlineIcon}
									cursor="pointer"
									_hover={{
										transform: "scale(1.1)",
										borderRadius: "30%",
									}}
									color="twitter.500"
								/>

								<Text>{folder.name}</Text>
								<HStack>
									<EditFolder
										groupId={group!.id}
										folderId={folder.id}
									/>
									<Icon
										as={DeleteIcon}
										cursor="pointer"
										_hover={{
											transform: "scale(1.1)",
											borderRadius: "30%",
										}}
										color="red.500"
									/>
								</HStack>
							</Flex>
						);
					})
				) : (
					<Text>Click the + button to create a folder</Text>
				)}
			</VStack>
			<Flex
				direction="row"
				w="full"
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
