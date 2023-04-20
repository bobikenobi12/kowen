import {
	IconButton,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	useToast,
	useDisclosure,
	Button,
	FormHelperText,
	Tooltip,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";
import { useChangeFolderNameMutation } from "../../app/services/folders";
import { useTypedSelector } from "../../hooks/store";
import { selectFolderById } from "./foldersSlice";
import { Formik, FormikProps, Form, Field } from "formik";
import { EditFolderSchema } from "../../utils/ValidationSchemas";
import { useNavigate } from "react-router-dom";

export default function EditFolder({
	groupId,
	folderId,
}: {
	groupId: number;
	folderId: number;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [changeFolderName, { isLoading }] = useChangeFolderNameMutation();

	const toast = useToast();

	const folder = useTypedSelector(state => selectFolderById(state, folderId));

	const navigate = useNavigate();

	return (
		<>
			<Tooltip
				label={`Edit ${folder?.name} folder`}
				aria-label={`Edit ${folder?.name} folder`}
				hasArrow>
				<IconButton
					aria-label="Edit folder"
					icon={<EditIcon />}
					onClick={onOpen}
					variant="solid"
					colorScheme="blue"
				/>
			</Tooltip>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit folder</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Formik
							initialValues={{ name: folder?.name }}
							validationSchema={EditFolderSchema}
							onSubmit={async (values, { setErrors }) => {
								try {
									await changeFolderName({
										groupId,
										folderId,
										name: values.name as string,
									}).unwrap();
									toast({
										title: "Folder name changed",
										status: "success",
										duration: 3000,
										isClosable: true,
									});
									onClose();
								} catch (err: any) {
									toast({
										title: "An error occurred.",
										description:
											"Sorry, we've encountered an error. Please try again later.",
										status: "error",
										duration: 5000,
										isClosable: true,
									});
								}
							}}>
							{(props: FormikProps<any>) => (
								<Form>
									<Field name="name">
										{({ field, form }: any) => (
											<FormControl
												isInvalid={
													form.errors.name &&
													form.touched.name
												}>
												<FormLabel htmlFor="name">
													Folder name
												</FormLabel>
												<Input
													{...field}
													id="name"
													placeholder="Folder name"
												/>
												<FormErrorMessage>
													{form.errors.name}
												</FormErrorMessage>
												<FormHelperText
													textAlign="left"
													fontSize="sm">
													Old name: {folder?.name}
												</FormHelperText>
											</FormControl>
										)}
									</Field>
									<Button
										isDisabled={!props.isValid}
										isLoading={isLoading}
										loadingText="Submitting"
										colorScheme="twitter"
										variant="outline"
										type="submit"
										mt={4}
										size="lg">
										Edit Folder
									</Button>
								</Form>
							)}
						</Formik>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
