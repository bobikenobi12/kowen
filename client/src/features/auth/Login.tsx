import * as React from "react";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	useColorModeValue,
	Stack,
	Heading,
	Text,
	Link,
	InputGroup,
	InputRightElement,
	VStack,
	Input,
	Button,
	useToast,
	Flex,
} from "@chakra-ui/react";
import ThemeToggle from "../../components/common/ThemeToggle";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, FormikProps } from "formik";

import { useNavigate, Link as ReactRouterLink } from "react-router-dom";

import { useLoginMutation } from "../../app/services/auth";
import type { LoginRequest } from "../../app/services/auth";

import { LoginSchema } from "../../utils/ValidationSchemas";

export default function Login() {
	const [showPassword, setShowPassword] = React.useState(false);
	const navigate = useNavigate();
	const toast = useToast();
	const [login, { isLoading }] = useLoginMutation();

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}>
			<ThemeToggle />
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up for an account
					</Heading>
					<Text
						fontSize={"lg"}
						color={"gray.600"}
						textAlign={"center"}>
						to enjoy all of our cool{" "}
						<Link
							as={ReactRouterLink}
							to="/features"
							state={{ from: "register" }}
							color={"blue.400"}>
							features
						</Link>{" "}
						✌️
					</Text>
				</Stack>
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validationSchema={LoginSchema}
					onSubmit={async (values, { setErrors }) => {
						try {
							await login(values).unwrap();
							toast({
								title: "Success",
								description: "You have successfully logged in",
								status: "success",
								duration: 5000,
								isClosable: true,
							});
							navigate("/groups");
						} catch (error: any) {
							if (error.status === 400) {
								setErrors({
									email: "Email is not registered",
									password: "Password is incorrect",
								});
								toast({
									title: "Error",
									description:
										"Email or password is incorrect",
									status: "error",
									duration: 5000,
									isClosable: true,
								});
							} else if (error.status === 500) {
								toast({
									title: "Error",
									description: "Server error",
									status: "error",
									duration: 5000,
									isClosable: true,
								});
							} else {
								toast({
									title: "Error",
									description: "Something went wrong",
									status: "error",
									duration: 5000,
									isClosable: true,
								});
							}
						}
					}}>
					{(props: FormikProps<LoginRequest>) => (
						<form onSubmit={props.handleSubmit}>
							<VStack spacing={4}>
								<FormControl
									isInvalid={
										props.touched.email &&
										Boolean(props.errors.email)
									}>
									<FormLabel htmlFor="email">Email</FormLabel>
									<Input
										id="email"
										placeholder="Email"
										type="email"
										onChange={props.handleChange}
										onBlur={props.handleBlur}
										value={props.values.email}
									/>
									<FormErrorMessage>
										{props.errors.email}
									</FormErrorMessage>
								</FormControl>
								<FormControl
									isInvalid={
										props.touched.password &&
										Boolean(props.errors.password)
									}>
									<FormLabel htmlFor="password">
										Password
									</FormLabel>
									<InputGroup size="md">
										<Input
											id="password"
											placeholder="Password"
											type={
												showPassword
													? "text"
													: "password"
											}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.password}
										/>
										<InputRightElement h="full">
											<Button
												variant="ghost"
												onClick={() =>
													setShowPassword(
														showPassword =>
															!showPassword
													)
												}>
												{showPassword ? (
													<ViewIcon />
												) : (
													<ViewOffIcon />
												)}
											</Button>
										</InputRightElement>
									</InputGroup>
									<FormErrorMessage>
										{props.errors.password}
									</FormErrorMessage>
								</FormControl>
								<Button
									isLoading={isLoading}
									loadingText="Submitting"
									colorScheme="twitter"
									variant="outline"
									type="submit"
									size="lg"
									width="full">
									Sign In
								</Button>
							</VStack>
						</form>
					)}
				</Formik>
				<Stack align={"center"}>
					<Text>
						Don't have an account?{" "}
						<Link
							as={ReactRouterLink}
							to="/register"
							state={{ from: location }}
							color={"twitter.400"}>
							Sign Up
						</Link>
					</Text>
				</Stack>
			</Stack>
		</Flex>
	);
}
