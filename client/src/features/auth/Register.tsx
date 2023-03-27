import * as React from "react";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	VStack,
	Button,
	Box,
	useToast,
	Flex,
	useColorModeValue,
	Stack,
	Heading,
	Text,
	Link,
	HStack,
	InputGroup,
	InputRightElement,
	useBoolean,
} from "@chakra-ui/react";
import ThemeToggle from "../../components/common/ThemeToggle";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, FormikProps } from "formik";

import { useNavigate, Link as ReactRouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useRegisterMutation } from "../../app/services/auth";
import type { RegisterRequest } from "../../app/services/auth";

// import validateField from "../../utils/validateField";
import { RegisterSchema } from "../../utils/ValidationSchemas";

export default function Register() {
	const [showPassword, setShowPassword] = React.useState(false);
	const navigate = useNavigate();
	const toast = useToast();
	const [register, { isLoading }] = useRegisterMutation();

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
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}>
					<Stack spacing={4}>
						<Formik
							initialValues={{
								username: "",
								email: "",
								firstName: "",
								lastName: "",
								password: "",
								confirmPassword: "",
							}}
							validationSchema={RegisterSchema}
							onSubmit={async (values, { setErrors }) => {
								const { confirmPassword, ...rest } = values;
								try {
									await register(rest).unwrap();
									toast({
										title: "Account created.",
										description:
											"We've created your account for you.",
										status: "success",
										duration: 9000,
										isClosable: true,
									});
									navigate("/login");
								} catch (err) {
									console.log(err);
									toast({
										title: "An error occurred.",
										description:
											"Unable to create account.",
										status: "error",
										duration: 9000,
										isClosable: true,
									});
								}
							}}>
							{(
								props: FormikProps<
									RegisterRequest & {
										confirmPassword: string;
									}
								>
							) => (
								<form onSubmit={props.handleSubmit}>
									<VStack spacing={4}>
										<FormControl
											isInvalid={
												Boolean(
													props.errors.username
												) && props.touched.username
											}>
											<FormLabel htmlFor="username">
												Username
											</FormLabel>
											<Input
												id="username"
												placeholder="Username"
												name="username"
												onChange={props.handleChange}
												onBlur={props.handleBlur}
												value={props.values.username}
											/>
											<FormHelperText
												textAlign="left"
												color="gray.500">
												{props.values.username.length}
												/50
											</FormHelperText>
											<FormErrorMessage>
												{props.errors.username}
											</FormErrorMessage>
										</FormControl>
										<HStack>
											<FormControl
												isInvalid={
													Boolean(
														props.errors.firstName
													) && props.touched.firstName
												}>
												<FormLabel htmlFor="firstName">
													First Name
												</FormLabel>
												<Input
													id="firstName"
													placeholder="First Name"
													name="firstName"
													onChange={
														props.handleChange
													}
													onBlur={props.handleBlur}
													value={
														props.values.firstName
													}
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
												<FormLabel htmlFor="lastName">
													Last Name
												</FormLabel>
												<Input
													id="lastName"
													placeholder="Last Name"
													name="lastName"
													onChange={
														props.handleChange
													}
													onBlur={props.handleBlur}
													value={
														props.values.lastName
													}
												/>
												<FormErrorMessage>
													{props.errors.lastName}
												</FormErrorMessage>
											</FormControl>
										</HStack>
										<FormControl
											isInvalid={
												Boolean(props.errors.email) &&
												props.touched.email
											}>
											<FormLabel htmlFor="email">
												Email
											</FormLabel>
											<Input
												id="email"
												placeholder="Email"
												name="email"
												onChange={props.handleChange}
												onBlur={props.handleBlur}
												value={props.values.email}
											/>
											<FormHelperText
												textAlign="left"
												color="gray.500">
												We'll never share your email.
											</FormHelperText>
											<FormErrorMessage>
												{props.errors.email}
											</FormErrorMessage>
										</FormControl>
										<FormControl
											isInvalid={
												Boolean(
													props.errors.password
												) && props.touched.password
											}>
											<FormLabel htmlFor="password">
												Password
											</FormLabel>
											<InputGroup>
												<Input
													id="password"
													placeholder="Password"
													name="password"
													type={
														showPassword
															? "text"
															: "password"
													}
													onChange={
														props.handleChange
													}
													onBlur={props.handleBlur}
													value={
														props.values.password
													}
												/>
												<InputRightElement h="full">
													<Button
														variant="ghost"
														onClick={() => {
															setShowPassword(
																showPassword =>
																	!showPassword
															);
														}}>
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
										<FormControl
											isInvalid={
												Boolean(
													props.errors.confirmPassword
												) &&
												props.touched.confirmPassword
											}>
											<FormLabel htmlFor="confirmPassword">
												Confirm Password
											</FormLabel>
											<Input
												id="confirmPassword"
												placeholder="Confirm Password"
												name="confirmPassword"
												type="password"
												onChange={props.handleChange}
												onBlur={props.handleBlur}
												value={
													props.values.confirmPassword
												}
											/>
											<FormErrorMessage>
												{props.errors.confirmPassword}
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
											Sign Up
										</Button>
									</VStack>
								</form>
							)}
						</Formik>
						<Stack pt={6} align={"center"}>
							<Text>
								Already have an account?{" "}
								<Link
									as={ReactRouterLink}
									to="/login"
									state={{ from: location }}
									color={"twitter.400"}>
									Sign In
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
