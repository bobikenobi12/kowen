import * as React from "react";
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Stack,
	useToast,
	Select,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";

import { type Group } from "../../app/services/groups";
import { type Folder } from "../../app/services/folders";
import { useTypedSelector } from "../../hooks/store";

import { selectCurrentGroup } from "../groups/groupsSlice";
import { selectCurrentFolder } from "../folders/foldersSlice";

import { useSaveDocumentMutation } from "../../app/services/documents";
import { useGetRolesInGroupQuery } from "../../app/services/groups";

import { UploadDocumentSchema } from "../../utils/ValidationSchemas";

import DocumentDropzone from "./DocumentDropzone";

export default function UploadDocumentForm() {
	const currentGroup = useTypedSelector(selectCurrentGroup) as Group;
	const { data: roles } = useGetRolesInGroupQuery(currentGroup.id);
	const currentFolder = useTypedSelector(selectCurrentFolder) as Folder;
	const [saveDocument, { isLoading }] = useSaveDocumentMutation();

	const toast = useToast();
	return (
		<Formik
			initialValues={{
				file: "",
				roleIds: [] as number[],
			}}
			validationSchema={UploadDocumentSchema}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				console.log(values);
				const formData = new FormData();
				formData.append("file", values.file);
				formData.append("folderId", currentFolder.id.toString());
				formData.append("groupId", currentGroup.id.toString());
				values.roleIds.forEach((roleId: number) => {
					formData.append("roleIds", roleId.toString());
				});
				try {
					await saveDocument(formData).unwrap();
					toast({
						title: "Document uploaded.",
						description: "Your document has been uploaded.",
						status: "success",
						duration: 9000,
						isClosable: true,
					});
				} catch (err) {
					toast({
						title: "An error occurred.",
						description: "Unable to upload document.",
						status: "error",
						duration: 9000,
						isClosable: true,
					});
				} finally {
					setSubmitting(false);
					resetForm();
				}
			}}>
			{({ isSubmitting, values, setFieldValue }) => (
				<Form encType="multipart/form-data">
					<Stack spacing={4}>
						<Field name="file">
							{({ field, form }: FieldProps) => (
								<DocumentDropzone field={field} form={form} />
							)}
						</Field>
						<Field name="roleIds">
							{({ field, form }: FieldProps) => (
								<FormControl
									isInvalid={Boolean(
										form.errors[field.name] &&
											form.touched[field.name]
									)}>
									<FormLabel htmlFor={field.name}>
										Roles
									</FormLabel>
									{/* <Select
										{...field}
										multiple
										size="md"
										placeholder="Select roles"
										value={values.roleIds}>
										{roles &&
											roles.map(role => (
												<option
													key={role.id}
													value={role.roleUser.id}>
													{role.roleUser.name}
												</option>
											))}
									</Select> */}
									<Select
										multiple
										{...field}
										placeholder="Select roles"
										value={values.roleIds.toString()}>
										{roles &&
											roles.map(role => (
												<option
													key={role.id}
													value={role.roleUser.id}>
													{role.roleUser.name}
												</option>
											))}
									</Select>
									{form.errors[field.name] &&
										form.touched[field.name] && (
											<FormErrorMessage>
												{
													form.errors[
														field.name
													] as string
												}
											</FormErrorMessage>
										)}
								</FormControl>
							)}
						</Field>
						<Button
							type="submit"
							colorScheme="blue"
							isLoading={isSubmitting || isLoading}>
							Upload
						</Button>
					</Stack>
				</Form>
			)}
		</Formik>
	);
}
