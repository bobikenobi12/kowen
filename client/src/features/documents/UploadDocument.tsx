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
				</ModalContent>
			</Modal>
		</>
	);
}
