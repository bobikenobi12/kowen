import {
	Badge,
	HStack,
	Text,
	Icon,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";

import { IoMdRemoveCircleOutline } from "react-icons/io";

import { useRemoveRoleFromUserMutation } from "../../../app/services/groups";

export default function RoleBadge({
	groupId,
	roleId,
	userId,
	roleName,
	username,
}: {
	groupId: number;
	roleId: number;
	userId: number;
	roleName: string;
	username: string;
}) {
	const [removeRoleFromUser] = useRemoveRoleFromUserMutation();
	const toast = useToast();
	return (
		<Badge colorScheme="green" key={roleId}>
			<HStack spacing={1}>
				<Text>{roleName}</Text>
				<Icon
					as={IoMdRemoveCircleOutline}
					cursor="pointer"
					size="sm"
					_hover={{
						transform: "scale(1.1)",
						transition: "all 0.2s ease-in-out",
						color: useColorModeValue("red.500", "red.100"),
					}}
					onClick={async () => {
						try {
							await removeRoleFromUser({
								groupId,
								roleId,
								userId,
							});
							toast({
								title: "Role removed",
								description: `You have removed the role ${roleName} from ${username}`,
								status: "success",
								duration: 5000,
								isClosable: true,
							});
						} catch (err) {
							console.log(err);
							toast({
								title: "Error",
								description:
									"There was an error removing the role",
								status: "error",
								duration: 5000,
								isClosable: true,
							});
						}
					}}
				/>
			</HStack>
		</Badge>
	);
}
