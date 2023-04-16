import {
	Flex,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Text,
	useColorModeValue,
	IconButton,
	CloseButton,
	useToast,
	Button,
} from "@chakra-ui/react";
import { BsBoxArrowLeft } from "react-icons/bs";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { useLeaveGroupMutation, Permission } from "../../app/services/groups";
import { useTypedSelector } from "../../hooks/store";
import {
	selectCurrentGroup,
	selectCurrentGroupPermissions,
} from "./groupsSlice";

import { selectCurrentUser } from "../auth/authSlice";

import { useNavigate } from "react-router-dom";

import AddUserToGroupModal from "./AddUserToGroupModal";

export default function GroupMenu() {
	const [leaveGroup] = useLeaveGroupMutation();
	const group = useTypedSelector(selectCurrentGroup);
	const permissions = useTypedSelector(selectCurrentGroupPermissions);
	const user = useTypedSelector(selectCurrentUser);

	if (!group) return null;

	const toast = useToast();
	const navigate = useNavigate();
	return (
		<Flex
			direction="row"
			w="full"
			alignSelf={"flex-start"}
			justifyContent={"space-between"}
			alignItems={"center"}
			bg={useColorModeValue("gray.200", "gray.600")}
			shadow="md">
			<Menu>
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
							<Text>{group.name}</Text>
						</MenuButton>
						<MenuList>
							<MenuItem
								onClick={() => {
									navigate(`/groups/${group.id}/settings`);
								}}
								onMouseOver={() => {
									// usePrefetch(
									// 	"getUserPermissionsForGroup",
									// );
								}}>
								Group Settings
							</MenuItem>
							{permissions &&
								user &&
								(permissions.includes(Permission.add_user) ||
									(group.creator.id === user.id && (
										<MenuItem>
											<AddUserToGroupModal />
										</MenuItem>
									)))}
							<MenuItem
								onClick={async () => {
									await leaveGroup(group.id);
									toast({
										title: "Left Group",
										description: `You have left the group ${group.name}`,
										status: "info",
										duration: 5000,
										isClosable: true,
									});
								}}>
								<Button
									rightIcon={<BsBoxArrowLeft />}
									colorScheme={"red"}
									alignItems={"center"}
									justifyContent={"space-between"}
									w={"full"}
									borderRadius={"md"}
									cursor={"pointer"}
									transition={"all .3s ease"}>
									Leave Group
								</Button>
							</MenuItem>
						</MenuList>
					</>
				)}
			</Menu>
		</Flex>
	);
}
