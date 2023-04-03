// a popup similar to the discord join/create server popup
// this is the popup that appears when you click the "join/create" button

import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	IconButton,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { useCreateGroupMutation } from "../../app/services/groups";
import { Form, Formik, FormikProps } from "formik";
import { CreateGroupRequest } from "../../app/services/groups";

// import { useCreateGroupMutation } from "../../app/services/groups";
import { AddIcon } from "@chakra-ui/icons";

export default function GroupModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [createGroup] = useCreateGroupMutation();

	return (
		<>
			<IconButton
				h={{ base: "40px", md: "50px", lg: "60px" }}
				size={{ base: "md", md: "lg", lg: "xl" }}
				fontSize={"lg"}
				// make button a circle
				borderRadius={"full"}
				variant={"ghost"}
				aria-label={"Create Group"}
				bg={useColorModeValue("gray.200", "gray.500")}
				_hover={{
					bg: "green.500",
					borderRadius: "30%",
				}}
				icon={<AddIcon />}
				onClick={onOpen}
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Group</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Formik
							initialValues={{ name: "", description: "" }}
							onSubmit={async (values, { setErrors }) => {
								try {
									await createGroup(values).unwrap();
									onClose();
								} catch (err) {
									console.log(err);
								}
							}}>
							{(props: FormikProps<CreateGroupRequest>) => (
								<Form>
									<FormControl>
										<FormLabel htmlFor="name">
											Name
										</FormLabel>
										<Input
											id="name"
											placeholder="name"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.name}
										/>
									</FormControl>
									<FormControl>
										<FormLabel htmlFor="description">
											Description
										</FormLabel>
										<Input
											id="description"
											placeholder="description"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.description}
										/>
									</FormControl>
									<Button
										loadingText="Submitting"
										colorScheme="twitter"
										variant="outline"
										type="submit"
										size="lg"
										width="full">
										Create Group
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
