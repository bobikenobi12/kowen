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
	IconButton,
} from "@chakra-ui/react";
import { MdEditDocument } from "react-icons/md";

import SaveNewDocomentVersionForm from "./SaveNewDocumentVersionForm";

export default function SaveNewDocumentVersion({
	documentId,
}: {
	documentId: number;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	return (
		<>
			<IconButton
				aria-label="Save New Document Version"
				icon={<MdEditDocument />}
				colorScheme="orange"
				variant={"outline"}
				onClick={onOpen}
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Upload Document</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<SaveNewDocomentVersionForm documentId={documentId} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
