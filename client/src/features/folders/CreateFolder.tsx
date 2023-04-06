import {
	IconButton,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	useToast,
	useColorModeValue,
	Icon,
	Button,
} from "@chakra-ui/react";

import { useSaveFolderToGroupMutation } from "../../app/services/folders";
import { Form, Formik, FormikProps } from "formik";
import { type saveFolderToGroupRequest } from "../../app/services/folders";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/store";

import { SaveFolderToGroupSchema } from "../../utils/ValidationSchemas";

import { AddIcon } from "@chakra-ui/icons";

export default function SaveFolderToGroup({ groupId }: { groupId: number }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [saveFolderToGroup] = useSaveFolderToGroupMutation();
	const toast = useToast();
	const navigate = useNavigate();

	const folders = useTypedSelector(state => state.folders.folders);

	return (
		<>
			<IconButton
				aria-label={"Save Folder To Group"}
				rounded="full"
				_hover={{
					transform: "scale(1.1)",
					borderRadius: "30%",
				}}
				bg={"none"}
				mr={4}
				icon={<Icon as={AddIcon} fontSize={"xl"} />}
				color={useColorModeValue("gray.500", "gray.400")}
				onClick={onOpen}
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create New Folder</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Formik
							initialValues={{ name: "" }}
							validationSchema={SaveFolderToGroupSchema}
							onSubmit={async (values, { setErrors }) => {
								try {
									await saveFolderToGroup({
										groupId,
										name: values.name as string,
									});
									toast({
										title: "Folder saved to group",
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
							{(
								props: FormikProps<
									Partial<saveFolderToGroupRequest>
								>
							) => (
								<Form>
									<FormControl
										id="name"
										isInvalid={
											props.touched.name &&
											!!props.errors.name
										}>
										<FormLabel>Name</FormLabel>
										<Input
											id="name"
											placeholder="Name"
											value={props.values.name}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
										<FormErrorMessage>
											{props.errors.name}
										</FormErrorMessage>
									</FormControl>
									<Button
										mt={4}
										colorScheme="teal"
										isLoading={props.isSubmitting}
										type="submit">
										Save
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
