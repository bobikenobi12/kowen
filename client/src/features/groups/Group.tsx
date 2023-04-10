import * as React from "react";

import {
	Flex,
	VStack,
	Text,
	Avatar,
	IconButton,
	useColorModeValue,
	HStack,
	Icon,
	Tooltip,
} from "@chakra-ui/react";

import { useNavigate, Outlet } from "react-router-dom";

import { useGetFoldersInGroupQuery } from "../../app/services/folders";

import { useTypedSelector, useAppDispatch } from "../../hooks/store";
import { selectCurrentGroup } from "./groupsSlice";
import { selectCurrentUser } from "../auth/authSlice";
import { type Folder } from "../../app/services/folders";

import { SettingsIcon } from "@chakra-ui/icons";
import { FaFolder } from "react-icons/fa";

import { FormatFolderName } from "../../utils/FormatFolderName";
import { DataToSrc } from "../../utils/Uint8ArrayToSrc";

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
	const dispatch = useAppDispatch();

	const [hoveredFolder, setHoveredFolder] = React.useState<Folder | null>(
		null
	);

	return (
		<Flex
			direction="row"
			w="fit-content"
			h="full"
			bg={useColorModeValue("gray.100", "gray.700")}>
			<Flex
				direction="column"
				w="fit-content"
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
									bg={useColorModeValue(
										"gray.100",
										"gray.700"
									)}
									onMouseEnter={() => {
										setHoveredFolder(folder);
									}}
									onMouseLeave={() => {
										setHoveredFolder(null);
									}}
									onClick={() => {
										navigate(
											`/groups/${group!.id}/folders/${
												folder.id
											}`
										);
										dispatch({
											type: "groups/setCurrentFolder",
											payload: folder,
										});
									}}>
									<HStack alignItems={"center"}>
										<Icon
											as={FaFolder}
											cursor="pointer"
											color="twitter.500"
										/>

										<Text>
											{FormatFolderName(folder.name)}
										</Text>
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
						src={
							user?.profilePicture
								? DataToSrc(user.profilePicture)
								: ""
						}
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
						<HStack
							alignItems={"flex-start"}
							justifyContent={"center"}>
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
									navigate("/settings");
								}}
							/>
						</Tooltip>
					</HStack>
				</Flex>
			</Flex>
			<Outlet />
		</Flex>
	);
}
