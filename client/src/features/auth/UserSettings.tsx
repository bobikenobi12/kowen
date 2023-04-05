// user settings page that has the following features:
// 1. User can change their username
// 2. User can change their password
// 3. User can change their email
// 4. User can change their first name
// 5. User can change their last name
// 6. User can change their profile picture
// 7. User can change their bio
// Also show preview of what the user's profile will look like after the changes are made
// also account can be deleted

import {
	Box,
	Button,
	Editable,
	EditableInput,
	EditablePreview,
	EditableTextarea,
	Textarea,
	Text,
	useToast,
	useColorModeValue,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	FormHelperText,
	Avatar,
	Icon,
	IconButton,
	Heading,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	Flex,
	ButtonGroup,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, FormikProps } from "formik";
import { useNavigate, Link } from "react-router-dom";
import {
	useSetProfilePictureMutation,
	useDownloadProfilePictureQuery,
	useChangeUsernameMutation,
	useChangeFirstNameMutation,
	useChangeLastNameMutation,
	useChangeEmailMutation,
} from "../../app/services/auth";
import { useTypedSelector } from "../../hooks/store";
import { selectCurrentUser } from "../auth/authSlice";

import {
	CopyIcon,
	DownloadIcon,
	EditIcon,
	DeleteIcon,
	AddIcon,
	CloseIcon,
	CheckIcon,
} from "@chakra-ui/icons";

import * as React from "react";

import UploadProfilePicture from "./UploadProfilePicture";
import ViewOnlyUserDetails from "./ViewOnlyUserDetails";
import EditUserDetails from "./EditUserDetails";

export default function UserSettings() {
	const navigate = useNavigate();
	const toast = useToast();
	const user = useTypedSelector(selectCurrentUser);
	const [mode, SetMode] = React.useState("view");

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
					// src={user?.profilePicture}
				>
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
				<Table variant="simple">
					<TableCaption placement="top" px={2}>
						<Flex
							direction="row"
							w="full"
							justifyContent={"space-between"}
							alignItems={"center"}
							mx="auto">
							<Heading size="md">User Settings</Heading>
							{mode === "view" ? (
								<IconButton
									aria-label="Edit User Settings"
									icon={<EditIcon />}
									variant="unstyled"
									rounded={"full"}
									color={"gray.800"}
									bg={"white"}
									_hover={{
										bg: "gray.100",
										transform: "scale(1.1)",
										borderRadius: "30%",
									}}
									onClick={() => {
										SetMode("edit");
									}}
								/>
							) : (
								<ButtonGroup
									justifyContent={"center"}
									size="sm">
									<IconButton
										aria-label="Save Changes"
										icon={<CheckIcon />}
										variant="unstyled"
										rounded={"full"}
										color={"gray.800"}
										bg={"white"}
										_hover={{
											bg: "gray.100",
											transform: "scale(1.1)",
											borderRadius: "30%",
										}}
										onClick={() => {
											SetMode("view");
										}}
									/>
									<IconButton
										aria-label="Cancel Changes"
										icon={<CloseIcon />}
										variant="unstyled"
										rounded={"full"}
										color={"gray.800"}
										bg={"white"}
										_hover={{
											bg: "gray.100",
											transform: "scale(1.1)",
											borderRadius: "30%",
										}}
										onClick={() => {
											SetMode("view");
										}}
									/>
								</ButtonGroup>
							)}
						</Flex>
					</TableCaption>
					{mode === "view" ? (
						<ViewOnlyUserDetails />
					) : (
						<EditUserDetails />
					)}
				</Table>
			</TableContainer>
		</Flex>
	);
}
