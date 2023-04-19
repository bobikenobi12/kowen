import * as React from "react";

import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	IconButton,
	useDisclosure,
} from "@chakra-ui/react";

import { BsFillTrashFill } from "react-icons/bs";

import { useDeleteChatMessageMutation } from "../../app/services/chat";

export default function DeleteMessageAlertDialog({
	groupId,
	messageId,
}: {
	groupId: number;
	messageId: number;
}) {
	const [deleteChatMessage, { isLoading: isDeletingChatMessage }] =
		useDeleteChatMessageMutation();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<IconButton
				aria-label="Delete message"
				icon={<BsFillTrashFill />}
				onClick={onOpen}
				variant="outline"
				colorScheme="red"
			/>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={React.useRef(null)}
				onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Message
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={React.useRef(null)} onClick={onClose}>
								Cancel
							</Button>
							<Button
								colorScheme="red"
								onClick={async () => {
									await deleteChatMessage({
										groupId,
										messageId,
									});
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
