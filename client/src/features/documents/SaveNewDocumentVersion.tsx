import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	Stack,
	useDisclosure,
	useToast,
	IconButton,
	Tooltip,
} from "@chakra-ui/react";

import { MdEditDocument } from "react-icons/md";

import { Field, FieldProps, Form, Formik } from "formik";

import type { Group } from "../../app/services/groups";

import { useTypedSelector } from "../../hooks/store";

import { selectCurrentGroup } from "../groups/groupsSlice";

import { useSaveNewDocumentVersionMutation } from "../../app/services/documents";

import DocumentDropzone from "./DocumentDropzone";

export default function SaveNewDocumentVersion({
	documentId,
}: {
	documentId: number;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	const currentGroup = useTypedSelector(selectCurrentGroup) as Group;

	const [saveNewDocumentVersion, { isLoading }] =
		useSaveNewDocumentVersionMutation();

	return (
		<>
			<Tooltip
				label="Save New Document Version"
				aria-label="Save New Document Version"
				hasArrow>
				<IconButton
					aria-label="Save New Document Version"
					icon={<MdEditDocument />}
					colorScheme="orange"
					variant={"outline"}
					onClick={onOpen}
				/>
			</Tooltip>
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
							onSubmit={async (
								values,
								{ setSubmitting, resetForm }
							) => {
								console.log(values);
								const formData = new FormData();
								formData.append("file", values.file);
								formData.append(
									"groupId",
									currentGroup.id.toString()
								);
								formData.append(
									"documentId",
									documentId.toString()
								);
								try {
									await saveNewDocumentVersion(
										formData
									).unwrap();
									toast({
										title: "New Version Uploaded",
										description: "Document uploaded",
										status: "success",
										duration: 3000,
										isClosable: true,
									});
								} catch (err) {
									console.log(err);
								} finally {
									setSubmitting(false);
									resetForm();
									onClose();
								}
							}}>
							{({ isSubmitting }) => (
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
