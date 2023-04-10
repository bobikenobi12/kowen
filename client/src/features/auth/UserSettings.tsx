import * as React from "react";

import {
	Box,
	useToast,
	useColorModeValue,
	Avatar,
	IconButton,
	Heading,
	Table,
	TableCaption,
	TableContainer,
	Flex,
	ButtonGroup,
} from "@chakra-ui/react";

import { EditIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";

import { useNavigate, Link } from "react-router-dom";

import { useTypedSelector } from "../../hooks/store";
import { selectCurrentUser } from "../auth/authSlice";
import { selectUserProfileMode } from "../auth/authSlice";

import UploadProfilePicture from "./UploadProfilePicture";
import ViewOnlyUserDetails from "./ViewOnlyUserDetails";
import EditUserDetails from "./EditUserDetails";

export default function UserSettings() {
	const user = useTypedSelector(selectCurrentUser);
	console.log(user);
	const userProfileMode = useTypedSelector(selectUserProfileMode);

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
			<Box
				w={"fit-content"}
				bg={useColorModeValue("white", "gray.900")}
				boxShadow={"2xl"}
				rounded={"lg"}
				p={12}
				textAlign={"center"}>
				<Avatar
					size="2xl"
					name={user?.username}
					position={"relative"}
					src={user?.profilePicture}>
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
	);
}
