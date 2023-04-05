import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	ModalProps,
	Button,
	useToast,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
} from "@chakra-ui/react";

import { Formik, FormikProps, Form } from "formik";

import {
	useChangeUsernameMutation,
	useChangeEmailMutation,
	useChangeFirstNameMutation,
	useChangeLastNameMutation,
} from "../../app/services/auth";

import { useNavigate } from "react-router-dom";

import { ValidateConfirmPasswordSchema } from "../../utils/ValidationSchemas";

export default function EditProfile({
	isOpen,
	onClose,
	...props
}: {
	isOpen: boolean;
	onClose: () => void;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
}) {
	const [changeUsername] = useChangeUsernameMutation();
	const [changeEmail] = useChangeEmailMutation();
	const [changeFirstName] = useChangeFirstNameMutation();
	const [changeLastName] = useChangeLastNameMutation();

	const toast = useToast();

	const navigate = useNavigate();

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Confirm Profile Changes</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Formik
						initialValues={{
							password: "",
						}}
						validationSchema={ValidateConfirmPasswordSchema}
						onSubmit={async (values, { setErrors }) => {
							try {
								await changeUsername({
									username: props.username,
									password: values.password,
								});
								await changeEmail({
									email: props.email,
									password: values.password,
								});
								await changeFirstName({
									firstName: props.firstName,
									password: values.password,
								});
								await changeLastName({
									lastName: props.lastName,
									password: values.password,
								});
								toast({
									title: "Profile updated.",
									status: "success",
									duration: 3000,
									isClosable: true,
								});
								onClose();
								navigate(0);
							} catch (err: any) {
								toast({
									title: "An error occurred.",
									description:
										"Sorry, we've encountered an error. Please try again later.",
									status: "error",
									duration: 5000,
									isClosable: true,
								});
							}
						}}>
						{(props: FormikProps<{ password: string }>) => (
							<Form>
								<FormControl
									isInvalid={
										props.touched.password &&
										!!props.errors.password
									}>
									<FormLabel htmlFor="password">
										Password
									</FormLabel>
									<Input
										id="password"
										type="password"
										placeholder="Password"
										{...props.getFieldProps("password")}
									/>
									<FormErrorMessage>
										{props.errors.password}
									</FormErrorMessage>
								</FormControl>
								<ModalFooter>
									<Button
										type="submit"
										colorScheme="blue"
										mr={3}
										isLoading={props.isSubmitting}>
										Confirm
									</Button>
									<Button onClick={onClose}>Cancel</Button>
								</ModalFooter>
							</Form>
						)}
					</Formik>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
