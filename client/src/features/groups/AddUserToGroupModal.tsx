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
import { Formik, Form, FormikProps } from "formik";
import { IoMdPersonAdd } from "react-icons/io";
import {
	type Group,
	useAddUserToGroupMutation,
} from "../../app/services/groups";
import { useTypedSelector } from "../../hooks/store";
import { selectCurrentGroup } from "./groupsSlice";

import { AddUserToGroup } from "../../utils/ValidationSchemas";

export default function AddUserToGroupModal() {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [addUserToGroup] = useAddUserToGroupMutation();
	const group = useTypedSelector(selectCurrentGroup) as Group;

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
							if (group) {
								await addUserToGroup({
									groupId: group.id,
									username: values.username,
								});
								toast({
									title: "User added to group.",
									status: "success",
									duration: 9000,
									isClosable: true,
								});
								onClose();
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
