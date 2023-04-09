import * as React from "react";
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Select,
	Stack,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";

import { type Group } from "../../app/services/groups";
import { useTypedSelector } from "../../hooks/store";

import { selectCurrentGroup } from "../groups/groupsSlice";

import { useSaveNewDocumentVersionMutation } from "../../app/services/documents";

import DocumentDropzone from "./DocumentDropzone";

export default function SaveNewDocomentVersionForm({
	documentId,
}: {
	documentId: number;
}) {
	const currentGroup = useTypedSelector(selectCurrentGroup) as Group;

	const [saveNewDocumentVersion, { isLoading }] =
		useSaveNewDocumentVersionMutation();

	return (
		<Formik
			initialValues={{
				file: "",
			}}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				console.log(values);
				const formData = new FormData();
				formData.append("file", values.file);
				formData.append("groupId", currentGroup.id.toString());
				formData.append("documentId", documentId.toString());
				try {
					await saveNewDocumentVersion(formData).unwrap();
				} catch (err) {
					console.log(err);
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
