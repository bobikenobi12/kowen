import * as React from "react";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
	useToast,
	useDisclosure,
	IconButton,
	CloseButton,
	Tooltip,
} from "@chakra-ui/react";

import {
	type Document,
	useRemoveDocumentMutation,
} from "../../app/services/documents";

import type { Group } from "../../app/services/groups";
import type { Folder } from "../../app/services/folders";

import { DeleteIcon } from "@chakra-ui/icons";

export default function DeleteDocumentDialog({
	group,
	folder,
	document,
}: {
	group: Group;
	folder: Folder;
	document: Document;
}) {
	const toast = useToast();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null);

	const [deleteDocumentFromGroup] = useRemoveDocumentMutation();

	return (
		<>
			<Tooltip
				label={`Delete ${document?.name}`}
				aria-label={`Delete ${document?.name}`}
				hasArrow>
				<IconButton
					variant="outline"
					aria-label="Delete document"
					colorScheme="red"
					icon={<DeleteIcon />}
					onClick={onOpen}
				/>
			</Tooltip>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Document `{document?.name}`
						</AlertDialogHeader>
						<CloseButton
							position="absolute"
							right="8px"
							top="8px"
							onClick={onClose}
						/>
						<AlertDialogBody>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button
								colorScheme="red"
								onClick={async () => {
									try {
										await deleteDocumentFromGroup({
											groupId: group.id,
											folderId: folder.id,
											documentId: document.id,
										});
										toast({
											title: "Document deleted from group",
											description: `The document ${document.name} and all its versions have been deleted from the group ${group.name}`,
											status: "success",
											duration: 5000,
											isClosable: true,
										});
									} catch (error) {
										toast({
											title: "Error deleting document from group",
											description:
												"There was an error deleting the document from the group",
											status: "error",
											duration: 5000,
											isClosable: true,
										});
									}
									onClose();
								}}
								ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
