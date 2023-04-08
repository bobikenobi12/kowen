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
} from "@chakra-ui/react";
import { Formik, FormikProps, Form, Field } from "formik";
import { CreateGroupRoleSchema } from "../../../utils/ValidationSchemas";

import {
	type Group,
	type Role,
	useSaveGroupRoleMutation,
	GroupRolePermissions,
} from "../../../app/services/groups";

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
							permissions: [GroupRolePermissions.can_view],
						}}
						validationSchema={CreateGroupRoleSchema}
						onSubmit={async values => {
							console.log(values);
							await saveGroupRole({
								groupId: group.id,
								role: {
									name: values.name,
									permissions: values.permissions,
								},
							});
							onClose();
							toast({
								title: "Role Created",
								description: `You have created the role ${values.name} for the group ${group.name}`,
								status: "info",
								duration: 5000,
								isClosable: true,
							});
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
										<FormControl>
											<FormLabel htmlFor="permissions">
												Permissions
											</FormLabel>
											<FormLabel>
												<Field
													type="checkbox"
													name="permissions"
													value={
														GroupRolePermissions.can_view
													}
												/>
												can_view
											</FormLabel>
											<FormLabel>
												<Field
													type="checkbox"
													name="permissions"
													value={
														GroupRolePermissions.can_edit
													}
												/>
												can_edit
											</FormLabel>
											<FormLabel>
												<Field
													type="checkbox"
													name="permissions"
													value={
														GroupRolePermissions.can_delete
													}
												/>
												can_delete
											</FormLabel>
											<FormLabel>
												<Field
													type="checkbox"
													name="permissions"
													value={
														GroupRolePermissions.can_add
													}
												/>
												can_add
											</FormLabel>
											<FormErrorMessage>
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
