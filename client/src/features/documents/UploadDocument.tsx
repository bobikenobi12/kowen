import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	useToast,
	Text,
	Stack,
} from "@chakra-ui/react";

import { Formik, Form, Field, FieldProps } from "formik";

import { UploadDocumentSchema } from "../../utils/ValidationSchemas";

import { useTypedSelector } from "../../hooks/store";
import { selectGroupById } from "../groups/groupsSlice";
import { selectFolderById } from "../folders/foldersSlice";

import { useGetRolesInGroupQuery } from "../../app/services/groups";
import { useSaveDocumentMutation } from "../../app/services/documents";

import { useParams } from "react-router-dom";
import DocumentDropzone from "./DocumentDropzone";

export default function UploadDocument() {
	const { groupId, folderId } = useParams();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	const group = useTypedSelector(state =>
		selectGroupById(state, Number(groupId))
	);
	const folder = useTypedSelector(state =>
		selectFolderById(state, Number(folderId))
	);

	const {
		data: roles,
		isLoading: rolesLoading,
		error: rolesError,
	} = useGetRolesInGroupQuery(Number(groupId));
	const [saveDocument, { isLoading }] = useSaveDocumentMutation();

	if (rolesLoading) {
		return <Text>Loading...</Text>;
	}

	if (rolesError) {
		return <Text>An error occurred.</Text>;
	}

	return (
		<>
			<Button onClick={onOpen}>Upload Document</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Upload Document</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Formik
							initialValues={{
								file: "",
							}}
							validationSchema={UploadDocumentSchema}
							onSubmit={async (
								values,
								{ setSubmitting, resetForm }
							) => {
								const formData = new FormData();
								formData.append("file", values.file);
								formData.append(
									"folderId",
									folder!.id.toString()
								);
								formData.append(
									"groupId",
									group!.id.toString()
								);
								try {
									await saveDocument(formData).unwrap();
									toast({
										title: "Document uploaded.",
										description:
											"Your document has been uploaded.",
										status: "success",
										duration: 9000,
										isClosable: true,
									});
								} catch (err) {
									toast({
										title: "An error occurred.",
										description:
											"Unable to upload document.",
										status: "error",
										duration: 9000,
										isClosable: true,
									});
								} finally {
									setSubmitting(false);
									resetForm();
									onClose();
								}
							}}>
							{({ isSubmitting, values, errors, touched }) => (
								<Form encType="multipart/form-data">
									<Stack spacing={4}>
										<Field name="file">
											{({ field, form }: FieldProps) => (
												<DocumentDropzone
													field={field}
													form={form}
												/>
											)}
										</Field>

										<Button
											type="submit"
											colorScheme="blue"
											isLoading={
												isSubmitting || isLoading
											}>
											Upload
										</Button>
									</Stack>
								</Form>
							)}
						</Formik>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
