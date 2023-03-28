import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
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
import {
	HamburgerIcon,
	CloseIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	AddIcon,
	BellIcon,
} from "@chakra-ui/icons";

import { Link as RouterLink } from "react-router-dom";

import ThemeToggle from "./common/ThemeToggle";

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
					<IconButton
						size={"md"}
						fontSize={"lg"}
						variant={"ghost"}
						color={"current"}
						aria-label={"Create Group"}
						icon={<AddIcon />}
					/>
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

function DesktopNav() {
	const linkColor = useColorModeValue("gray.600", "gray.200");
	const linkHoverColor = useColorModeValue("gray.800", "white");
	const popoverContentBgColor = useColorModeValue("white", "gray.800");

	return (
		<Stack direction={"row"} spacing={4}>
			{NAV_ITEMS.map(navItem => (
				<Box key={navItem.label}>
					<Popover trigger={"hover"} placement={"bottom-start"}>
						<PopoverTrigger>
							<Link
								p={2}
								href={navItem.href ?? "#"}
								fontSize={"sm"}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: "none",
									color: linkHoverColor,
								}}>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={"xl"}
								bg={popoverContentBgColor}
								p={4}
								rounded={"xl"}
								minW={"sm"}>
								<Stack>
									{navItem.children.map(child => (
										<DesktopSubNav
											key={child.label}
											{...child}
										/>
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
}

function DesktopSubNav({ label, href, subLabel }: INavItem) {
	return (
		<Link
			as={RouterLink}
			to={href as unknown as string}
			state={{ from: "navbar" }}
			role={"group"}
			display={"block"}
			p={2}
			rounded={"md"}
			_hover={{ bg: useColorModeValue("cyan.50", "gray.900") }}>
			<Stack direction={"row"} align={"center"}>
				<Box>
					<Text
						transition={"all .3s ease"}
						_groupHover={{ color: "cyan.400" }}
						fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={"sm"}>{subLabel}</Text>
				</Box>
				<Flex
					transition={"all .3s ease"}
					transform={"translateX(-10px)"}
					opacity={0}
					_groupHover={{
						opacity: "100%",
						transform: "translateX(0)",
					}}
					justify={"flex-end"}
					align={"center"}
					flex={1}>
					<Icon
						color={"cyan.400"}
						w={5}
						h={5}
						as={ChevronRightIcon}
					/>
				</Flex>
			</Stack>
		</Link>
	);
}

function MobileNav() {
	return (
		<Stack
			bg={useColorModeValue("white", "gray.800")}
			p={4}
			display={{ md: "none" }}>
			{NAV_ITEMS.map(navItem => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
}

function MobileNavItem({ label, children, href }: INavItem) {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={RouterLink}
				to={href as unknown as string}
				justify={"space-between"}
				align={"center"}
				_hover={{
					textDecoration: "none",
				}}>
				<Text
					fontWeight={600}
					color={useColorModeValue("gray.600", "gray.200")}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={"all .25s ease-in-out"}
						transform={isOpen ? "rotate(180deg)" : ""}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse
				in={isOpen}
				animateOpacity
				style={{ marginTop: "0!important" }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={"solid"}
					borderColor={useColorModeValue("gray.200", "gray.700")}
					align={"start"}>
					{children &&
						children.map(child => (
							<Link
								key={child.label}
								py={2}
								as={RouterLink}
								to={child.href as unknown as string}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
}

interface INavItem {
	label: string;
	subLabel?: string;
	children?: INavItem[];
	href?: string;
}

const NAV_ITEMS: INavItem[] = [
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
