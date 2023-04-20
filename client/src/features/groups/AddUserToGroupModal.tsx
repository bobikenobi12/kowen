import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	useToast,
	useDisclosure,
	Input,
	FormLabel,
	FormControl,
	FormErrorMessage,
	Text,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import { Formik, Form, FormikProps } from "formik";
import { IoMdPersonAdd } from "react-icons/io";
import {
	type Group,
	useAddUserToGroupMutation,
} from "../../app/services/groups";
import { useTypedSelector } from "../../hooks/store";
import { selectGroupById } from "../groups/groupsSlice";

import { AddUserToGroup } from "../../utils/ValidationSchemas";

export default function AddUserToGroupModal() {
	const { groupId } = useParams();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [addUserToGroup] = useAddUserToGroupMutation();
	const group = useTypedSelector(state =>
		selectGroupById(state, Number(groupId))
	) as Group;

	return (
		<>
			<Button
				w={"100%"}
				colorScheme={"teal"}
				aria-label="Add user to group"
				onClick={onOpen}
				alignItems={"center"}
				justifyContent={"space-between"}
				borderRadius={"md"}
				cursor={"pointer"}
				transition={"all .3s ease"}>
				<Text ml={2}>Add User</Text>
				<IoMdPersonAdd />
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add user to group</ModalHeader>
					<ModalCloseButton />
					<Formik
						initialValues={{
							username: "",
						}}
						validationSchema={AddUserToGroup}
						onSubmit={async (values, { setSubmitting }) => {
							try {
								await addUserToGroup({
									groupId: group.id,
									username: values.username,
								}).unwrap();
								toast({
									title: "User added to group.",
									status: "success",
									duration: 9000,
									isClosable: true,
								});
								onClose();
							} catch (err: any) {
								toast({
									title: "Error adding user to group.",
									description: JSON.stringify(err.data),
									status: "error",
									duration: 9000,
									isClosable: true,
								});
							}
						}}>
						{(props: FormikProps<{ username: string }>) => (
							<ModalBody>
								<Form>
									<FormControl
										isInvalid={
											!!props.errors.username &&
											props.touched.username
										}>
										<FormLabel htmlFor="username">
											Username
										</FormLabel>
										<Input
											id="username"
											placeholder="Username"
											{...props.getFieldProps("username")}
										/>
										<FormErrorMessage>
											{props.errors.username}
										</FormErrorMessage>
									</FormControl>
									<Button
										mt={4}
										colorScheme="teal"
										isLoading={props.isSubmitting}
										type="submit">
										Add
									</Button>
								</Form>
							</ModalBody>
						)}
					</Formik>
				</ModalContent>
			</Modal>
		</>
	);
}
