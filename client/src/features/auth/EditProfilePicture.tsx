import { useCallback } from "react";
import fs from "fs";

import {
	Text,
	Avatar,
	IconButton,
	Icon,
	useToast,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	FormErrorIcon,
	FormErrorMessage,
	FormControl,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

import { useTypedSelector } from "../../hooks/store";
import {
	useDownloadProfilePictureQuery,
	useSetProfilePictureMutation,
} from "../../app/services/auth";
import { selectCurrentUser } from "./authSlice";

import { Formik, FormikProps, Form, Field } from "formik";

import { UploadFileSchema } from "../../utils/ValidationSchemas";

export default function EditProfilePicture() {
	const [setProfilePicture, { isLoading }] = useSetProfilePictureMutation();

	const user = useTypedSelector(selectCurrentUser);
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { data: profilePicture } = useDownloadProfilePictureQuery();

	return (
		<>
			<Avatar
				size="2xl"
				name={user?.username}
				position={"relative"}
				// src={user?.profilePicture}
				onClick={onOpen}>
				<IconButton
					aria-label="Edit Profile Picture"
					icon={<AddIcon fontSize={"xl"} />}
					position={"absolute"}
					top={"0"}
					right={"0"}
					variant="unstyled"
					rounded={"full"}
					color={"gray.800"}
					bg={"white"}
					_hover={{
						bg: "gray.100",
						transform: "scale(1.1)",
						borderRadius: "30%",
					}}
				/>
			</Avatar>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Profile Picture</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Formik
							initialValues={{ file: "" }}
							validationSchema={UploadFileSchema}
							onSubmit={async (values, { setErrors }) => {
								const formData = new FormData();
								formData.append("picture", values.file);
								try {
									await setProfilePicture({
										picture: formData.get(
											"picture"
										) as FormDataEntryValue,
									});
									toast({
										title: "Profile Picture Updated",
										status: "success",
										duration: 3000,
										isClosable: true,
									});
									onClose();
								} catch (err: any) {
									toast({
										title: "Error",
										description: err.message,
										status: "error",
										duration: 3000,
										isClosable: true,
									});
								}
							}}>
							{(props: FormikProps<any>) => (
								<Form encType="multipart/form-data">
									<Field
										name="file"
										type="file"
										as={Input}
										multiple={false}
										placeholder="Profile Picture"
										onKeyUp={(event: any) => {
											props.setFieldValue(
												"file",
												event.currentTarget.files[0]
											);
										}}
									/>
									<Button
										mt={4}
										colorScheme="teal"
										isLoading={props.isSubmitting}
										type="submit">
										Submit
									</Button>
								</Form>
							)}
						</Formik>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

{
	/* function DropzoneField({
	field,
	form,
	...props
}: {
	field: any;
	form: any;
	props: any;
}) {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		multiple: false,
		onDrop: (acceptedFiles: File[]) => {
			form.setFieldValue(field.name, acceptedFiles);
		},
	});

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} {...field} {...props} />
			<p>Drag 'n' drop some files here, or click to select files</p>
		</div>
	);
} */
}
