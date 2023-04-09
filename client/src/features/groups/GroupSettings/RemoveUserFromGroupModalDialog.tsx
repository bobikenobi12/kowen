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
} from "@chakra-ui/react";
import {
	type Group,
	useRemoveUserFromGroupMutation,
} from "../../../app/services/groups";
import { User } from "../../../app/services/auth";
import { MdPersonRemove } from "react-icons/md";

export default function RemoveUserFromGroupModal({
	user,
	group,
}: {
	user: User;
	group: Group;
}) {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null);
	const [removeUserFromGroup] = useRemoveUserFromGroupMutation();

	return (
		<>
			<IconButton
				colorScheme={"red"}
				variant="outline"
				aria-label="Remove user from group"
				icon={<MdPersonRemove />}
				onClick={onOpen}
			/>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Remove {user.username} from group
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
										await removeUserFromGroup({
											userId: parseInt(user.id),
											groupId: group.id,
										});
										toast({
											title: "User removed from group",
											description:
												"The user was removed from the group",
											status: "success",
											duration: 5000,
											isClosable: true,
										});
									} catch (error) {
										toast({
											title: "Error removing user from group",
											description:
												"There was an error removing the user from the group",
											status: "error",
											duration: 5000,
											isClosable: true,
										});
									}
									onClose();
								}}
								ml={3}>
								Remove
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
