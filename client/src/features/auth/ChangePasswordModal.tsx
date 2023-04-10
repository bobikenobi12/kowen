import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
	useToast,
	useDisclosure,
	useColorModeValue,
	FormErrorMessage,
} from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { type User, useChangePasswordMutation } from "../../app/services/auth";

import { ChangePasswordSchema } from "../../utils/ValidationSchemas";

import { ChangePasswordRequest } from "../../app/services/auth";

export default function ChangePasswordModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const [changePassword] = useChangePasswordMutation();

	return (
		<>
			<Button
				onClick={onOpen}
				colorScheme="blue"
				variant="solid"
				size="sm"
				mt={4}>
				Change Password
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Change your Password</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Formik
							initialValues={{
								password: "",
								newPassword: "",
								confirmNewPassword: "",
							}}
							validationSchema={ChangePasswordSchema}
							onSubmit={async (
								values,
								{ setErrors, setFieldValue, setSubmitting }
							) => {
								try {
									await changePassword({
										password: values.password,
										newPassword: values.newPassword,
										confirmNewPassword:
											values.confirmNewPassword,
									}).unwrap();
									toast({
										title: "Password Changed",
										description:
											"Your password has been changed.",
										status: "success",
										duration: 5000,
										isClosable: true,
									});
									onClose();
								} catch (error: any) {
									if (error.data) {
										setErrors({
											password: error.data.message,
										});
									}
								}
								setSubmitting(false);
							}}>
							{(props: FormikProps<ChangePasswordRequest>) => (
								<Form>
									<FormControl
										mt={4}
										isInvalid={Boolean(
											props.touched.password &&
												props.errors.password
										)}>
										<FormLabel htmlFor="password">
											Current Password
										</FormLabel>
										<Input
											id="password"
											name="password"
											type="password"
											value={props.values.password}
											onChange={props.handleChange}
										/>
										<FormErrorMessage
											mt={1}
											fontSize="sm"
											color={useColorModeValue(
												"red.500",
												"red.100"
											)}>
											{props.errors.password}
										</FormErrorMessage>
									</FormControl>
									<FormControl
										mt={4}
										isInvalid={Boolean(
											props.touched.newPassword &&
												props.errors.newPassword
										)}>
										<FormLabel htmlFor="newPassword">
											New Password
										</FormLabel>
										<Input
											id="newPassword"
											name="newPassword"
											type="password"
											value={props.values.newPassword}
											onChange={props.handleChange}
										/>
										<FormErrorMessage
											mt={1}
											fontSize="sm"
											color={useColorModeValue(
												"red.500",
												"red.100"
											)}>
											{props.errors.newPassword}
										</FormErrorMessage>
									</FormControl>
									<FormControl
										mt={4}
										isInvalid={Boolean(
											props.touched.confirmNewPassword &&
												props.errors.confirmNewPassword
										)}>
										<FormLabel htmlFor="confirmNewPassword">
											Confirm New Password
										</FormLabel>
										<Input
											id="confirmNewPassword"
											name="confirmNewPassword"
											type="password"
											value={
												props.values.confirmNewPassword
											}
											onChange={props.handleChange}
										/>
										<FormErrorMessage
											mt={1}
											fontSize="sm"
											color={useColorModeValue(
												"red.500",
												"red.100"
											)}>
											{props.errors.confirmNewPassword}
										</FormErrorMessage>
									</FormControl>
									<ModalFooter>
										<Button
											type="submit"
											colorScheme="blue"
											mr={3}
											isLoading={props.isSubmitting}>
											Change Password
										</Button>
										<Button onClick={onClose}>
											Cancel
										</Button>
									</ModalFooter>
								</Form>
							)}
						</Formik>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
