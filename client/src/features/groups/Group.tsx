import * as React from "react";

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
	HStack,
	CloseButton,
	Icon,
	Tooltip,
	useToast,
	Button,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { useGetFoldersInGroupQuery } from "../../app/services/folders";

import { useTypedSelector } from "../../hooks/store";
import { selectCurrentGroup } from "./groupsSlice";
import { selectFolders } from "../folders/folderSlice";
import { selectCurrentUser } from "../auth/authSlice";
import { type Folder } from "../../app/services/folders";

import { SettingsIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FaFolder } from "react-icons/fa";

import { FormatFolderName } from "../../utils/FormatFolderName";

import EditFolder from "../folders/EditFolder";
import CreateFolder from "../folders/CreateFolder";
import DeleteFolder from "../folders/DeleteFolder";
import GroupMenu from "./GroupMenu";

import ThemeToggle from "../../components/common/ThemeToggle";

export default function Group() {
	const group = useTypedSelector(selectCurrentGroup);
	const user = useTypedSelector(selectCurrentUser);
	const { data: folders } = useGetFoldersInGroupQuery(group!.id);
	const navigate = useNavigate();

	const [hoveredFolder, setHoveredFolder] = React.useState<Folder | null>(
		null
	);

	const toast = useToast();

	return (
		<Flex
			direction="column"
			w="full"
			h="full"
			bg={useColorModeValue("gray.50", "inherit")}>
			<GroupMenu />
			<Flex
				direction="row"
				w="full"
				alignItems={"center"}
				justifyContent={"space-between"}
				bg={useColorModeValue("gray.100", "gray.700")}>
				<Text
					ml={4}
					fontSize="sm"
					as={"b"}
					color={useColorModeValue("gray.500", "gray.400")}>
					Folders
				</Text>
				<CreateFolder groupId={group!.id} />
			</Flex>

			<VStack
				w="full"
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
								cursor={"pointer"}
								bg={useColorModeValue("gray.100", "gray.700")}
								onMouseEnter={() => {
									setHoveredFolder(folder);
								}}
								onMouseLeave={() => {
									setHoveredFolder(null);
								}}>
								<HStack alignItems={"center"}>
									<Icon
										as={FaFolder}
										cursor="pointer"
										color="twitter.500"
									/>

									<Text>{FormatFolderName(folder.name)}</Text>
								</HStack>
								{hoveredFolder?.id === folder.id && (
									<HStack>
										<EditFolder
											groupId={group!.id}
											folderId={folder.id}
										/>
										<DeleteFolder
											folderId={folder.id}
											groupId={group!.id}
										/>
									</HStack>
								)}
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
				alignSelf={"flex-end"}
				alignItems={"center"}
				p={2}
				bg={useColorModeValue("gray.200", "gray.600")}>
				<Avatar
					name={user!.username}
					src={user!.profilePicture || ""}
				/>
				<VStack
					alignItems={"flex-start"}
					justifyContent={"center"}
					px={2}>
					<Text
						fontWeight={"bold"}
						fontSize={"lg"}
						color={useColorModeValue("gray.800", "white")}>
						{user?.username}
					</Text>
					<HStack alignItems={"flex-start"} justifyContent={"center"}>
						<Text>{user?.firstName}</Text>
						<Text>{user?.lastName}</Text>
					</HStack>
				</VStack>
				<HStack spacing={2} ml="auto">
					<ThemeToggle />

					<Tooltip
						label="User Settings"
						aria-label="User Settings"
						hasArrow>
						<IconButton
							aria-label="User Settings"
							icon={<SettingsIcon fontSize={"lg"} />}
							variant="ghost"
							onClick={() => {
								navigate("/user-settings	");
							}}
						/>
					</Tooltip>
				</HStack>
			</Flex>
		</Flex>
	);
}
