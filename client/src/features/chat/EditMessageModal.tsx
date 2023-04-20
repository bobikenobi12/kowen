import * as React from "react";

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Input,
	useDisclosure,
	IconButton,
	useToast,
} from "@chakra-ui/react";

import { MdEdit } from "react-icons/md";

import { useEditChatMessageMutation } from "../../app/services/chat";

export default function EditMessageModal({
	groupId,
	messageId,
	content,
}: {
	groupId: number;
	messageId: number;
	content: string;
}) {
	const [editChatMessage, { isLoading: isEditingChatMessage }] =
		useEditChatMessageMutation();
	const [message, setMessage] = React.useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();

	const toast = useToast();

	return (
		<>
			<IconButton
				aria-label="Edit message"
				icon={<MdEdit />}
				onClick={onOpen}
				variant="solid"
				colorScheme="blue"
			/>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Message {content}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input
							value={message}
							onChange={e => setMessage(e.target.value)}
						/>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={async () => {
								try {
									await editChatMessage({
										groupId,
										messageId,
										content: message,
									}).unwrap;
									onClose();
								} catch (error: any) {
									toast({
										title: "Error",
										description: JSON.stringify(error.data),
										status: "error",
										duration: 9000,
										isClosable: true,
									});
								}
							}}
							isLoading={isEditingChatMessage}>
							Save
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
