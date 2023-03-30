import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	Center,
	Avatar,
	Menu,
	MenuButton,
	MenuList,
	MenuDivider,
	MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, BellIcon } from "@chakra-ui/icons";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ThemeToggle from "../common/ThemeToggle";
import GroupModal from "../../features/groups/GroupActions";

export default function Navbar() {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Box>
			<Flex
				bg={useColorModeValue("white", "gray.800")}
				color={useColorModeValue("gray.600", "white")}
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.900")}
				align={"center"}>
				<Flex
					flex={{ base: 1, md: "auto" }}
					ml={{ base: -2 }}
					display={{ base: "flex", md: "none" }}>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? (
								<CloseIcon w={3} h={3} />
							) : (
								<HamburgerIcon w={5} h={5} />
							)
						}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</Flex>
				<Flex
					flex={{ base: 1 }}
					justify={{ base: "center", md: "start" }}>
					<Text
						textAlign={useBreakpointValue({
							base: "center",
							md: "left",
						})}
						fontFamily={"heading"}
						color={useColorModeValue("gray.800", "white")}>
						Kowen
					</Text>
					<Flex display={{ base: "none", md: "flex" }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>
				<Stack
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					direction={"row"}
					spacing={6}>
					<GroupModal />
					<IconButton
						size={"md"}
						fontSize={"lg"}
						variant={"ghost"}
						color={"current"}
						aria-label={"Notifications"}
						icon={<BellIcon />}
					/>
					<ThemeToggle />
					<Menu>
						<MenuButton
							as={Button}
							rounded={"full"}
							variant={"link"}
							cursor={"pointer"}>
							<Avatar
								size={"sm"}
								src={"https://bit.ly/broken-link"}
							/>
						</MenuButton>
						<MenuList alignItems={"center"}>
							<br />
							<Center>
								<Avatar
									size={"xl"}
									src={"https://bit.ly/broken-link"}
								/>
							</Center>
							<br />
							<Center>
								<Text>Username</Text>
							</Center>
							<br />
							<MenuDivider />
							<MenuItem>Your Groups</MenuItem>
							<MenuItem>Account Settings</MenuItem>
							<MenuItem>Sign Out</MenuItem>
						</MenuList>
					</Menu>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
}

export interface INavItem {
	label: string;
	subLabel?: string;
	children?: INavItem[];
	href?: string;
}

export const NAV_ITEMS: INavItem[] = [
	{
		label: "Documents",
		children: [
			{
				label: "My Documents",
				subLabel: "View your documents",
				href: "/documents",
			},
			{
				label: "Create Document",
				subLabel: "Create a new document",
				href: "/documents/create",
			},
		],
	},
	{
		label: "Groups",
		children: [
			{
				label: "My Groups",
				subLabel: "View your groups",
				href: "/groups",
			},
			{
				label: "Create Group",
				subLabel: "Create a new group",
				href: "/groups/create",
			},
		],
	},
	{
		label: "Your Folders",
		children: [
			{
				label: "My Folders",
				subLabel: "View your folders",
				href: "/folders",
			},
			{
				label: "Create Folder",
				subLabel: "Create a new folder",
				href: "/folders/create",
			},
		],
	},
];
