import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Stack,
	useToast,
	Flex,
	Box,
	Text,
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

import { CheckBoxInput } from "../groups/GroupSettings/CheckBoxInput";

import DocumentDropzone from "./DocumentDropzone";

export default function UploadDocumentForm() {
	const toast = useToast();

	const currentGroup = useTypedSelector(selectCurrentGroup) as Group;
	const currentFolder = useTypedSelector(selectCurrentFolder) as Folder;

	const {
		data: roles,
		isLoading: rolesLoading,
		error: rolesError,
	} = useGetRolesInGroupQuery(currentGroup.id);
	const [saveDocument, { isLoading }] = useSaveDocumentMutation();

	if (rolesLoading) {
		return <Text>Loading...</Text>;
	}

	if (rolesError) {
		return <Text>An error occurred.</Text>;
	}

	return (
		<Formik
			initialValues={{
				file: "",
			}}
			validationSchema={UploadDocumentSchema}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				console.log(values);
				const formData = new FormData();
				formData.append("file", values.file);
				formData.append("folderId", currentFolder.id.toString());
				formData.append("groupId", currentGroup.id.toString());
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
			{({ isSubmitting, values, errors, touched }) => (
				<Form encType="multipart/form-data">
					<Stack spacing={4}>
						<Field name="file">
							{({ field, form }: FieldProps) => (
								<DocumentDropzone field={field} form={form} />
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
