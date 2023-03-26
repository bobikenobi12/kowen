// simple register page that takes username, email, first name, last name, password and confirm password
// and sends a post request to the backend to create a new user.

import * as React from "react";
import {
	Input,
	InputGroup,
	InputRightElement,
	VStack,
	Button,
	Divider,
	Center,
	Box,
	useToast,
} from "@chakra-ui/react";
import { Formik, FormikProps } from "formik";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ProtectedComponent } from "./ProtectedComponent";
import { useRegisterMutation } from "../../app/services/auth";
import type { RegisterRequest } from "../../app/services/auth";

// import validateField from "../../utils/validateField";

export default function Register() {
	const navigate = useNavigate();
	const toast = useToast();
	const [register, { isLoading }] = useRegisterMutation();

	return (
		<Box p={24}>
			<Formik
				initialValues={{
					username: "",
					email: "",
					firstName: "",
					lastName: "",
					password: "",
					confirmPassword: "",
				}}
				onSubmit={async (values, { setErrors }) => {
					const { confirmPassword, ...rest } = values;
					try {
						const response = await register(rest).unwrap();
						toast({
							title: "Account created.",
							description: "We've created your account for you.",
							status: "success",
							duration: 9000,
							isClosable: true,
						});
						navigate("/login");
					} catch (err) {
						console.log(err);
						toast({
							title: "An error occurred.",
							description: "Unable to create account.",
							status: "error",
							duration: 9000,
							isClosable: true,
						});
					}
				}}>
				{(
					props: FormikProps<
						RegisterRequest & { confirmPassword: string }
					>
				) => (
					<form onSubmit={props.handleSubmit}>
						<VStack spacing={4}>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									type="text"
									placeholder="Enter username"
									name="username"
									onChange={props.handleChange}
								/>
							</InputGroup>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									type="email"
									placeholder="Enter email"
									name="email"
									onChange={props.handleChange}
								/>
							</InputGroup>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									type="text"
									placeholder="Enter first name"
									name="firstName"
									onChange={props.handleChange}
								/>
							</InputGroup>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									type="text"
									placeholder="Enter last name"
									name="lastName"
									onChange={props.handleChange}
								/>
							</InputGroup>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									type="password"
									placeholder="Enter password"
									name="password"
									onChange={props.handleChange}
								/>
							</InputGroup>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									type="password"
									placeholder="Confirm password"
									name="confirmPassword"
									onChange={props.handleChange}
								/>
							</InputGroup>
							<Button
								isLoading={isLoading}
								loadingText="Submitting"
								colorScheme="teal"
								variant="outline"
								type="submit">
								Sign
							</Button>
						</VStack>
					</form>
				)}
			</Formik>
		</Box>
	);
}
