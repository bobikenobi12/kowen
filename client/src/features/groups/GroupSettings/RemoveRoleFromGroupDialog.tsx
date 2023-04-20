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
	type Role,
	useRemoveRoleFromGroupMutation,
} from "../../../app/services/groups";
import { User } from "../../../app/services/auth";
import { CiCircleRemove } from "react-icons/ci";

export default function RemoveRoleFromGroupDialog({
	group,
	role,
}: {
	group: Group;
	role: Role;
}) {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null);
	const [removeRoleFromGroup] = useRemoveRoleFromGroupMutation();

	return (
		<>
			<IconButton
				variant="ghost"
				aria-label="Remove user from group"
				colorScheme="red"
				icon={<CiCircleRemove fontSize={"2em"} />}
				onClick={onOpen}
			/>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Remove {role.name} from {group.name}
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
										await removeRoleFromGroup({
											roleId: role.id,
											groupId: group.id,
										}).unwrap();
										toast({
											title: "Role removed from group",
											description: `The role ${role.name} has been removed from ${group.name}`,
											status: "success",
											duration: 5000,
											isClosable: true,
										});
									} catch (error) {
										toast({
											title: "Error removing role from group",
											description:
												"There was an error removing the role from the group",
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
