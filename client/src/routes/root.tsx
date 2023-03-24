// navigation for app which will be responsive for mobile and desktop
// on desktop its a navbar on mobile its a drawer
// there is a theme toggle which is a separate component and is used in both the navbar and drawer
// user button with avatar and dropdown menu

import { ReactNode } from "react";
import {
	Box,
	Flex,
	Avatar,
	HStack,
	Link,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	useToast,
} from "@chakra-ui/react";

import { HamburgerIcon, CloseIcon, Search2Icon } from "@chakra-ui/icons";

import { Link as RouterLink } from "react-router-dom";

import ThemeToggle from "../components/theme-toggle";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
} from "../features/auth/auth-api-slice";

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const user = useAppSelector(state => state.auth);
	// const [login, { isLoading: loginLoading }] = useLoginMutation();
	// const [register, { isLoading: registerLoading }] = useRegisterMutation();
	const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

	const handleLogout = async () => {
		await logout();
		toast({
			title: "Logged out",
			description: "You have been logged out",
			status: "success",
			duration: 5000,
			isClosable: true,
		});
	};

	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
				<Flex
					h={16}
					alignItems={"center"}
					justifyContent={"space-between"}>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={"center"}>
						<Box>Logo</Box>
						<HStack
							as={"nav"}
							spacing={4}
							display={{ base: "none", md: "flex" }}>
							<Link
								as={RouterLink}
								to="/"
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									bg: useColorModeValue(
										"gray.200",
										"gray.700"
									),
								}}>
								Home
							</Link>

							<Link
								as={RouterLink}
								to="/about"
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									bg: useColorModeValue(
										"gray.200",
										"gray.700"
									),
								}}>
								About
							</Link>
						</HStack>
					</HStack>
					<Flex alignItems={"center"}>
						<IconButton
							size={"md"}
							icon={<Search2Icon />}
							aria-label={"Search"}
							display={{ base: "none", md: "flex" }}
							onClick={() => console.log("search")}
						/>
						<ThemeToggle />
						<Menu>
							<MenuButton
								as={Button}
								rounded={"full"}
								variant={"link"}
								cursor={"pointer"}
								minW={0}>
								<Avatar
									size={"sm"}
									src={
										!user.avatar
											? "https://bit.ly/broken-link"
											: user.avatar
									}
								/>
							</MenuButton>
							<MenuList>
								<MenuItem as={RouterLink} to="/profile">
									Profile
								</MenuItem>
								<MenuItem as={RouterLink} to="/settings">
									Settings
								</MenuItem>
								<MenuDivider />
								<MenuItem onClick={handleLogout}>
									Logout
								</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							<Link
								as={RouterLink}
								to="/"
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									bg: useColorModeValue(
										"gray.200",
										"gray.700"
									),
								}}>
								Home
							</Link>

							<Link
								as={RouterLink}
								to="/about"
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",

									bg: useColorModeValue(
										"gray.200",
										"gray.700"
									),
								}}>
								About
							</Link>
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
}
