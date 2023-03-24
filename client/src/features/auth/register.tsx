import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
	Text,
	useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { useAppDispatch } from "../../app/hooks";
import { useRegisterMutation } from "./auth-api-slice";
import { setCredentials } from "./auth-slice";

export default function Register() {
	const dispatch = useAppDispatch();
	const toast = useToast();
	const [register] = useRegisterMutation();

	return (
		<Box>
			<Heading>Register</Heading>
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					username: "",
					email: "",
					password: "",
					confirmPassword: "",
				}}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						// values without confirmPassword
						const { confirmPassword, ...rest } = values;
						const result = await register(rest).unwrap();
						console.log(result);
						toast({
							title: "Account created.",
							description: "We've created your account for you.",
							status: "success",
							duration: 9000,
							isClosable: true,
						});

						dispatch(setCredentials(result));
					} catch (err) {
						toast({
							title: "An error occurred.",
							description: "Unable to create your account.",
							status: "error",
							duration: 9000,
							isClosable: true,
						});
						console.log(err);
					}
					setSubmitting(false);
				}}>
				{({ isSubmitting }) => (
					<Form>
						<FormControl id="firstName">
							<FormLabel>First Name</FormLabel>
							<Input
								name="firstName"
								type="text"
								placeholder="John"
							/>
						</FormControl>
						<FormControl id="lastName">
							<FormLabel>Last Name</FormLabel>
							<Input
								name="lastName"
								type="text"
								placeholder="Doe"
							/>
						</FormControl>
						<FormControl id="username">
							<FormLabel>Username</FormLabel>
							<Input
								name="username"
								type="text"
								placeholder="johndoe"
							/>
						</FormControl>
						<FormControl id="email">
							<FormLabel>Email</FormLabel>
							<Input
								name="email"
								type="email"
								placeholder="john123@gmail.com"
							/>
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input
								name="password"
								type="password"
								placeholder="********"
							/>
						</FormControl>
						<FormControl id="confirmPassword">
							<FormLabel>Confirm Password</FormLabel>
							<Input
								name="confirmPassword"
								type="password"
								placeholder="********"
							/>
						</FormControl>
						<Button
							mt={4}
							colorScheme="teal"
							isLoading={isSubmitting}
							type="submit">
							Register
						</Button>
					</Form>
				)}
			</Formik>
			<Text mt={4}>
				Already have an account?{" "}
				<Link color="teal.500" href="#">
					Login
				</Link>
			</Text>
		</Box>
	);
}
