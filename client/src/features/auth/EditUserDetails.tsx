import * as React from "react";

import {
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	Heading,
	ButtonGroup,
	Icon,
	useDisclosure,
	IconButton,
	Button,
	Table,
	TableCaption,
	Tbody,
	Tr,
	Td,
	Th,
} from "@chakra-ui/react";

import { Formik, Form, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";

import { useTypedSelector, useAppDispatch } from "../../hooks/store";
import { selectCurrentUser } from "./authSlice";

import { FormatDate } from "../../utils/FormatDate";
import { ValidateNewCredentialsSchema } from "../../utils/ValidationSchemas";

export interface userProfile {
	username: string;
	email: string;
	firstName: string;
	lastName: string;
}

import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import ConfirmPasswordModal from "./ConfirmPasswordModal";

export default function EditUserDetails() {
	const dispatch = useAppDispatch();
	const user = useTypedSelector(selectCurrentUser);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [updatedValues, setUpdatedValues] = React.useState({
		username: user?.username as string,
		email: user?.email as string,
		firstName: user?.firstName as string,
		lastName: user?.lastName as string,
	});

	return (
		<>
			<Formik
				initialValues={{
					username: user?.username as string,
					email: user?.email as string,
					firstName: user?.firstName as string,
					lastName: user?.lastName as string,
				}}
				validationSchema={ValidateNewCredentialsSchema}
				onSubmit={async (values, { setErrors }) => {
					setUpdatedValues(values);
					onOpen();
				}}>
				{(props: FormikProps<userProfile>) => (
					<Form onSubmit={props.handleSubmit}>
						<Table variant="simple">
							<TableCaption placement="top" px={2}>
								<Flex
									direction="row"
									w="full"
									justifyContent={"space-between"}
									alignItems={"center"}
									mx="auto">
									<Heading size="md">User Settings</Heading>
									<ButtonGroup
										justifyContent={"center"}
										size="sm">
										<Button
											type="submit"
											rounded={"full"}
											px={0}
											colorScheme="unstyled"
											bg={"white"}
											_hover={{
												transform: "scale(1.1)",
												borderRadius: "30%",
											}}
											onClick={onOpen}>
											<Icon as={CheckIcon} />
										</Button>
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
												dispatch({
													type: "auth/setUserProfileMode",
													payload: "view",
												});
											}}
										/>
									</ButtonGroup>
								</Flex>
							</TableCaption>
							<Tbody>
								<Tr>
									<Th>Full Name</Th>
									<Td>
										<Flex
											direction="row"
											justify="space-between"
											alignItems={[
												"flex-start",
												"center",
											]}
											w="100%">
											<FormControl
												isInvalid={
													Boolean(
														props.errors.firstName
													) && props.touched.firstName
												}>
												<Input
													onChange={
														props.handleChange
													}
													onBlur={props.handleBlur}
													value={
														props.values.firstName
													}
													name="firstName"
												/>
												<FormErrorMessage>
													{props.errors.firstName}
												</FormErrorMessage>
											</FormControl>
											<FormControl
												isInvalid={
													Boolean(
														props.errors.lastName
													) && props.touched.lastName
												}>
												<Input
													onChange={
														props.handleChange
													}
													onBlur={props.handleBlur}
													value={
														props.values.lastName
													}
													name="lastName"
												/>
												<FormErrorMessage>
													{props.errors.lastName}
												</FormErrorMessage>
											</FormControl>
										</Flex>
									</Td>
								</Tr>
								<Tr>
									<Th>Email</Th>
									<Td>
										<FormControl
											isInvalid={
												Boolean(props.errors.email) &&
												props.touched.email
											}>
											<Input
												onChange={props.handleChange}
												onBlur={props.handleBlur}
												value={props.values.email}
												name="email"
											/>
											<FormErrorMessage>
												{props.errors.email}
											</FormErrorMessage>
										</FormControl>
									</Td>
								</Tr>
								<Tr>
									<Th>Username</Th>
									<Td>
										<FormControl
											isInvalid={
												Boolean(
													props.errors.username
												) && props.touched.username
											}>
											<Input
												onChange={props.handleChange}
												onBlur={props.handleBlur}
												value={props.values.username}
												name="username"
											/>
											<FormErrorMessage>
												{props.errors.username}
											</FormErrorMessage>
										</FormControl>
									</Td>
								</Tr>
								<Tr>
									<Th>Date Joined</Th>
									<Td>
										{FormatDate(user?.dateJoined as Date)}
									</Td>
								</Tr>
							</Tbody>
						</Table>
					</Form>
				)}
			</Formik>
			<ConfirmPasswordModal
				isOpen={isOpen}
				onClose={onClose}
				email={updatedValues.email}
				username={updatedValues.username}
				firstName={updatedValues.firstName}
				lastName={updatedValues.lastName}
			/>
		</>
	);
}
