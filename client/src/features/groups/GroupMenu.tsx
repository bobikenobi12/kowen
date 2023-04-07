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
	useDisclosure,
	useToast,
	HStack,
	Icon,
} from "@chakra-ui/react";
import { BsBoxArrowLeft } from "react-icons/bs";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { useLeaveGroupMutation } from "../../app/services/groups";
import { useTypedSelector } from "../../hooks/store";
import { selectCurrentGroup } from "./groupsSlice";

export default function GroupMenu() {
	const [leaveGroup] = useLeaveGroupMutation();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const group = useTypedSelector(selectCurrentGroup);
	const toast = useToast();
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
							<Text>{group?.name}</Text>
						</MenuButton>
						<MenuList>
							<MenuItem>Group Settings</MenuItem>
							<MenuItem
								onClick={async () => {
									await leaveGroup(group!.id);
									toast({
										title: "Left Group",
										description: `You have left the group ${group?.name}`,
										status: "info",
										duration: 5000,
										isClosable: true,
									});
								}}>
								<HStack
									p={2}
									bg={useColorModeValue(
										"gray.100",
										"gray.700"
									)}
									color={useColorModeValue(
										"red.300",
										"red.700"
									)}
									_hover={{
										bg: useColorModeValue(
											"red.300",
											"red.700"
										),
										color: useColorModeValue(
											"gray.800",
											"white"
										),
									}}
									alignItems={"center"}
									justifyContent={"space-between"}
									w={"full"}
									borderRadius={"md"}
									cursor={"pointer"}
									transition={"all .3s ease"}>
									<Text as={"b"}>Leave Group</Text>
									<Icon as={BsBoxArrowLeft} />
								</HStack>
							</MenuItem>
						</MenuList>
					</>
				)}
			</Menu>
		</Flex>
	);
}
