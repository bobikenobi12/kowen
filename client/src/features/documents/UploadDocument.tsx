import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	useToast,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
} from "@chakra-ui/react";

import UploadDocumentForm from "./UploadDocumentForm";

export default function UploadDocument() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	return (
		<>
			<Button onClick={onOpen}>Upload Document</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Upload Document</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<UploadDocumentForm />
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
