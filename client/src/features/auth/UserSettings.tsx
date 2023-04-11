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
	IconButton,
	HStack,
	Text,
} from "@chakra-ui/react";

import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../hooks/store";
import { selectCurrentUser } from "../auth/authSlice";
import { selectUserProfileMode } from "../auth/authSlice";

import UploadProfilePicture from "./UploadProfilePicture";
import ViewOnlyUserDetails from "./ViewOnlyUserDetails";
import EditUserDetails from "./EditUserDetails";
import ChangePasswordModal from "./ChangePasswordModal";
import Logout from "./Logout";

import { DataToSrc } from "../../utils/Uint8ArrayToSrc";

export default function UserSettings() {
	const user = useTypedSelector(selectCurrentUser);
	const userProfileMode = useTypedSelector(selectUserProfileMode);
	const navigate = useNavigate();

	return (
		<Flex
			direction="column"
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
			<Flex
				w={"full"}
				justifyContent={"center"}
				alignItems={"center"}
				gap={12}>
				<Flex
					direction="column"
					justifyContent={"space-between"}
					alignItems={"center"}
					gap={4}>
					<Button
						variant={"outline"}
						colorScheme={"gray"}
						leftIcon={<BiArrowBack />}
						onClick={() => navigate(-1 || "/groups")}>
						Back
					</Button>

					<Box
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
				</Flex>
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
				p={4}
				gap={4}>
				<VStack
					w={"full"}
					bg={useColorModeValue("white", "gray.900")}
					p={8}>
					<Heading>Password and Security</Heading>
					<ChangePasswordModal />
					<Logout />
				</VStack>
			</Flex>
		</Flex>
	);
}
