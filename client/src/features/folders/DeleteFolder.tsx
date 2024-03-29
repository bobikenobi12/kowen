import * as React from "react";
import {
	IconButton,
	useToast,
	useDisclosure,
	Button,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogCloseButton,
	Tooltip,
} from "@chakra-ui/react";

import { useTypedSelector } from "../../hooks/store";
import { selectFolderById } from "./foldersSlice";
import { useDeleteFolderFromGroupMutation } from "../../app/services/folders";

import { DeleteIcon } from "@chakra-ui/icons";

export default function DeleteFolder({
	groupId,
	folderId,
}: {
	groupId: number;
	folderId: number;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null);

	const [deleteFolder, { isLoading }] = useDeleteFolderFromGroupMutation();

	const toast = useToast();

	const folder = useTypedSelector(state => selectFolderById(state, folderId));

	return (
		<>
			<Tooltip
				label={`Delete ${folder?.name} folder`}
				aria-label={`Delete ${folder?.name} folder`}
				hasArrow>
				<IconButton
					aria-label="Delete folder"
					icon={<DeleteIcon />}
					onClick={onOpen}
					colorScheme="red"
					variant={"outline"}
				/>
			</Tooltip>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Folder `{folder?.name}`
						</AlertDialogHeader>
						<AlertDialogCloseButton />
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
										await deleteFolder({
											groupId,
											folderId,
										}).unwrap();
										toast({
											title: "Folder deleted",
											status: "info",
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
