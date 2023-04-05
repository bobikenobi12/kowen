// like view mode, but with edditable fields
// on submit, ask user for password
// if password is correct, update user details

// if password is incorrect, show error message

import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Text,
	VStack,
	Editable,
	EditableInput,
	EditablePreview,
	useEditableControls,
	useEditable,
	useColorModeValue,
	useToast,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	IconButton,
	FormErrorMessage,
	Tbody,
	Tr,
	Td,
	Th,
} from "@chakra-ui/react";

import { Formik, Form, Field, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";

import { useTypedSelector, useAppDispatch } from "../../hooks/store";
import { selectCurrentUser } from "./authSlice";

import {
	useChangeUsernameMutation,
	useChangeEmailMutation,
	useChangeFirstNameMutation,
	useChangeLastNameMutation,
} from "../../app/services/auth";

export default function EditUserDetails() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useTypedSelector(selectCurrentUser);

	const [changeUsername] = useChangeUsernameMutation();
	const [changeEmail] = useChangeEmailMutation();
	const [changeFirstName] = useChangeFirstNameMutation();
	const [changeLastName] = useChangeLastNameMutation();

	const toast = useToast();

	const { isOpen, onOpen, onClose } = useDisclosure();

	// const handleSave = async (values: any) => {
	// 	try {
	// 		const { data } = await changeUsername({
	// 			username: values.username,
	// 		});
	// 		toast({
	// 			title: "Username changed",
	// 			description: `Your username has been changed to ${data.changeUsername.username}`,
	// 			status: "success",
	// 			duration: 5000,
	// 			isClosable: true,
	// 		});
	// 		onClose();
	// 		navigate("/user-settings");
	// 	} catch (error) {
	// 		toast({
	// 			title: "Error",
	// 			description: error.message,
	// 			status: "error",
	// 			duration: 5000,
	// 			isClosable: true,
	// 		});
	// 	}
	// };

	return (
		<Formik
			initialValues={{
				username: user?.username,
				email: user?.email,
				firstName: user?.firstName,
				lastName: user?.lastName,
			}}
			onSubmit={async (values, { setErrors }) => {
				// try {
				//     const { data } = await changeUsername({
				//         username: values.username,
				//     });
			}}>
			{(props: FormikProps<any>) => (
				<Tbody>
					<Tr>
						<Th>Full Name</Th>
						<Td>
							<Editable
								defaultValue={
									user?.firstName + " " + user?.lastName
								}>
								<EditablePreview />
								<EditableInput />
							</Editable>
						</Td>
					</Tr>
					<Tr>
						<Th>Email</Th>
						<Td>
							<Editable defaultValue={user?.email}>
								<EditablePreview />
								<EditableInput />
							</Editable>
						</Td>
					</Tr>
					<Tr>
						<Th>Username</Th>
						<Td>
							<Editable defaultValue={user?.username}>
								<EditablePreview />
								<EditableInput />
							</Editable>
						</Td>
					</Tr>
				</Tbody>
			)}
		</Formik>
	);
}
