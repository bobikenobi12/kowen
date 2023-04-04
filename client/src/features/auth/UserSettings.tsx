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
import { useTypedSelector, useAppDispatch } from "../../hooks/store";
import { selectCurrentUser } from "../auth/authSlice";

import {
	CopyIcon,
	DownloadIcon,
	EditIcon,
	DeleteIcon,
	AddIcon,
} from "@chakra-ui/icons";

import { FormatDate } from "../../utils/FormatDate";

import * as React from "react";

import EditProfilePicture from "./EditProfilePicture";

export default function UserSettings() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const toast = useToast();
	const user = useTypedSelector(selectCurrentUser);
	// const [setProfilePicture] = useSetProfilePictureMutation();
	// const [changeUsername] = useChangeUsernameMutation();
	// const [changeFirstName] = useChangeFirstNameMutation();
	// const [changeLastName] = useChangeLastNameMutation();
	// const [changeEmail] = useChangeEmailMutation();

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
				<EditProfilePicture />
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
					<TableCaption placement="top">User Settings</TableCaption>
					<Tbody>
						<Tr>
							<Th>Full Name</Th>
							<Td>
								{user?.firstName} {user?.lastName}
							</Td>
						</Tr>
						<Tr>
							<Th>Email</Th>
							<Td>{user?.email}</Td>
						</Tr>
						<Tr>
							<Th>Date Joined</Th>
							<Td>{FormatDate(user?.dateJoined as Date)}</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</Flex>
	);
}
