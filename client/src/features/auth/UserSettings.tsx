import {
	Box,
	useColorModeValue,
	Avatar,
	Heading,
	TableContainer,
	Flex,
	Divider,
	VStack,
	Button,
} from "@chakra-ui/react";

import { useTypedSelector } from "../../hooks/store";
import { selectCurrentUser } from "../auth/authSlice";
import { selectUserProfileMode } from "../auth/authSlice";

import { useLogoutMutation } from "../../app/services/auth";

import UploadProfilePicture from "./UploadProfilePicture";
import ViewOnlyUserDetails from "./ViewOnlyUserDetails";
import EditUserDetails from "./EditUserDetails";
import ChangePasswordModal from "./ChangePasswordModal";
import Logout from "./Logout";

import { DataToSrc } from "../../utils/Uint8ArrayToSrc";

export default function UserSettings() {
	const user = useTypedSelector(selectCurrentUser);
	const userProfileMode = useTypedSelector(selectUserProfileMode);
	const [logout] = useLogoutMutation();

	return (
		<Flex
			direction="row"
			w="full"
			h={"100vh"}
			justifyContent={"center"}
			alignItems={"center"}
			maxW="5xl"
			bg={useColorModeValue("gray.50", "inherit")}
			mx="auto"
			px={6}
			py={12}
			gap={12}>
			<Flex>
				<Box
					w={"fit-content"}
					maxW={"30%"}
					bg={useColorModeValue("white", "gray.900")}
					boxShadow={"2xl"}
					rounded={"lg"}
					p={12}
					textAlign={"center"}>
					<Avatar
						size="2xl"
						name={user?.username}
						position={"relative"}
						src={
							user?.profilePicture
								? DataToSrc(user.profilePicture)
								: ""
						}>
						<UploadProfilePicture />
					</Avatar>
					<Heading>{user?.username}</Heading>
				</Box>
				<TableContainer
					w={"full"}
					bg={useColorModeValue("white", "gray.900")}
					rounded={"lg"}
					boxShadow={"2xl"}
					p={8}
					textAlign={"center"}>
					{userProfileMode === "view" ? (
						<ViewOnlyUserDetails />
					) : (
						<EditUserDetails />
					)}
				</TableContainer>
			</Flex>
			<Divider orientation="horizontal" />
			<Flex
				w={"full"}
				bg={useColorModeValue("white", "gray.900")}
				rounded={"lg"}
				boxShadow={"2xl"}
				p={8}
				textAlign={"center"}>
				<VStack
					w={"full"}
					bg={useColorModeValue("white", "gray.900")}
					p={8}
					textAlign={"center"}>
					<Heading>Password and Security</Heading>
					<ChangePasswordModal />
					<Logout />
				</VStack>
			</Flex>
		</Flex>
	);
}
