import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Box,
	useToast,
	Flex,
} from "@chakra-ui/react";
import { Formik, FormikProps, Form, Field, ErrorMessage } from "formik";
import { CreateGroupRoleSchema } from "../../../utils/ValidationSchemas";

import {
	type Group,
	type Role,
	useSaveGroupRoleMutation,
	Permission,
} from "../../../app/services/groups";

import { CheckBoxInput } from "./CheckBoxInput";

export default function CreateGroupRole({ group }: { group: Group }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [saveGroupRole] = useSaveGroupRoleMutation();
	const toast = useToast();

	return (
		<>
			<Button onClick={onOpen}>Create Role</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Role For {group.name}</ModalHeader>
					<ModalCloseButton />
					<Formik
						initialValues={{
							name: "",
							permissions: [] as Permission[],
						}}
						validationSchema={CreateGroupRoleSchema}
						onSubmit={async values => {
							try {
								await saveGroupRole({
									groupId: group.id,
									role: {
										name: values.name,
										permissions: values.permissions,
									},
								}).unwrap();
								toast({
									title: "Role Created",
									description: `You have created the role ${values.name} for the group ${group.name}`,
									status: "info",
									duration: 5000,
									isClosable: true,
								});
								onClose();
							} catch (err: any) {
								toast({
									title: "Error",
									description: JSON.stringify(err),
									status: "error",
									duration: 5000,
									isClosable: true,
								});
							}
						}}>
						{(props: FormikProps<Partial<Role>>) => (
							<ModalBody>
								<Form>
									<Field name="name">
										{({ field, form }: any) => (
											<FormControl
												isInvalid={
													form.errors.name &&
													form.touched.name
												}>
												<FormLabel htmlFor="name">
													Role Name
												</FormLabel>
												<Input
													{...field}
													id="name"
													placeholder="Role Name"
												/>
												<FormErrorMessage>
													{form.errors.name}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Box mt={4} mb={4}>
										<FormControl
											isInvalid={Boolean(
												props.errors.permissions
											)}>
											<FormLabel htmlFor="permissions">
												Permissions
											</FormLabel>
											<Flex wrap="wrap">
												{Object.values(Permission).map(
													(
														permission,
														idx: number
													) => (
														<CheckBoxInput
															key={idx}
															label={
																"permissions"
															}
															value={permission}
															{...props}
														/>
													)
												)}
											</Flex>
											<FormErrorMessage mt={2}>
												{props.errors.permissions}
											</FormErrorMessage>
										</FormControl>
									</Box>
									<ModalFooter>
										<Button
											colorScheme="blue"
											mr={3}
											type="submit">
											Create Role
										</Button>
										<Button onClick={onClose}>
											Cancel
										</Button>
									</ModalFooter>
								</Form>
							</ModalBody>
						)}
					</Formik>
				</ModalContent>
			</Modal>
		</>
	);
}
