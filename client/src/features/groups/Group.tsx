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

import { useParams, useNavigate, Outlet } from "react-router-dom";

import { BsFillChatDotsFill } from "react-icons/bs";

import { useGetFoldersInGroupQuery } from "../../app/services/folders";
import {
	useGetUserPermissionsForGroupQuery,
	Permission,
} from "../../app/services/groups";

import { selectGroupById, selectIsCreator } from "./groupsSlice";

import { useTypedSelector, useAppDispatch } from "../../hooks/store";
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
import MemberList from "./MemberList";

export default function Group() {
	const { groupId } = useParams();

	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const user = useTypedSelector(selectCurrentUser);
	const isCreator = useTypedSelector(state =>
		selectIsCreator(state, Number(groupId))
	);
	const group = useTypedSelector(state =>
		selectGroupById(state, parseInt(groupId as string))
	);

	const [hoveredFolder, setHoveredFolder] = React.useState<Folder | null>(
		null
	);

	const {
		data: permissions,
		error: permissionsError,
		isLoading: permissionsLoading,
	} = useGetUserPermissionsForGroupQuery(Number(groupId));

	const {
		data: folders,
		isLoading,
		error,
	} = useGetFoldersInGroupQuery(Number(groupId));

	if (permissionsError || error) {
		return <div>Error: {JSON.stringify(error ?? permissionsError)}</div>;
	}

	if (isLoading || permissionsLoading) {
		return <div>Loading...</div>;
	}

	if (!group) {
		return <div>Group not found</div>;
	}

	return (
		<>
			<Flex
				direction="column"
				w={{ base: 250, md: 300 }}
				h="full"
				bg={useColorModeValue("gray.50", "inherit")}>
				<GroupMenu />
				<Flex
					direction="row"
					w="full"
					alignItems={"center"}
					justifyContent={"space-between"}
					p={2}
					bg={useColorModeValue("gray.100", "gray.700")}>
					<Text
						ml={4}
						fontSize="sm"
						as={"b"}
						color={useColorModeValue("gray.500", "gray.400")}>
						Folders
					</Text>
					{permissions &&
						(isCreator ||
							permissions?.includes(Permission.add_folder)) && (
							<CreateFolder groupId={group.id} />
						)}
				</Flex>
				<VStack
					w="full"
					h="full"
					gap={2}
					bg={useColorModeValue("gray.100", "gray.700")}
					overflowY="scroll"
					css={{
						"&::-webkit-scrollbar": {
							width: "0.5em",
						},
						"&::-webkit-scrollbar-track": {
							"-webkit-box-shadow":
								"inset 0 0 6px rgba(0,0,0,0.00)",
						},
						"&::-webkit-scrollbar-thumb": {
							backgroundColor: "rgba(0,0,0,.1)",
						},
					}}
					spacing={0}>
					<Flex
						direction="row"
						alignItems={"center"}
						justifyContent={"space-between"}
						w="full"
						h={12}
						p={4}
						cursor={"pointer"}
						bg={useColorModeValue("gray.100", "gray.700")}
						_hover={{
							bg: useColorModeValue("gray.200", "gray.600"),
						}}
						onClick={() => {
							navigate(`/groups/${group!.id}/chat`);
						}}>
						<HStack alignItems={"center"}>
							<Icon
								as={BsFillChatDotsFill}
								cursor="pointer"
								color="twitter.500"
							/>
							<Text>Group Chat</Text>
						</HStack>
					</Flex>

					{folders && folders.length > 0 ? (
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
									_hover={{
										bg: useColorModeValue(
											"gray.200",
											"gray.600"
										),
									}}
									onMouseEnter={() => {
										setHoveredFolder(folder);
									}}
									onMouseLeave={() => {
										setHoveredFolder(null);
									}}
									onClick={() => {
										navigate(
											`/groups/${group!.id}/${folder.id}`
										);
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
									{hoveredFolder &&
										group &&
										hoveredFolder?.id === folder.id &&
										group.id && (
											<HStack>
												{permissions &&
													(isCreator ||
														permissions.includes(
															Permission.edit_folder
														)) && (
														<EditFolder
															groupId={group!.id}
															folderId={folder.id}
														/>
													)}
												{permissions &&
													(isCreator ||
														permissions.includes(
															Permission.delete_folder
														)) && (
														<DeleteFolder
															folderId={folder.id}
															groupId={group!.id}
														/>
													)}
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
								? DataToSrc(user?.profilePicture)
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
							<Text>{user!.firstName}</Text>
							<Text>{user!.lastName}</Text>
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
			<MemberList />
		</>
	);
}
