import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useToast,
	useDisclosure,
	IconButton,
	Input,
	FormLabel,
	FormControl,
	FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form, FormikProps } from "formik";
import { AddIcon } from "@chakra-ui/icons";
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
			<IconButton
				aria-label="Add user to group"
				icon={<AddIcon />}
				onClick={onOpen}
			/>
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
