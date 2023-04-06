import {
	Flex,
	Button,
	Text,
	Divider,
	useColorModeValue,
} from "@chakra-ui/react";
import { useTypedSelector } from "../../hooks/store";
import { selectGroupById } from "./groupsSlice";
import { useParams } from "react-router-dom";
export default function GroupSettings() {
	const group = useTypedSelector(state =>
		selectGroupById(state, Number(useParams<{ groupId: string }>().groupId))
	);

	console.log(group);

	const bg = useColorModeValue("white", "gray.800");

	return (
		<Flex direction="row" width="100%" height="100vh">
			<Flex direction="column" bg={bg} p={4} width="40%" height="100vh">
				<Text fontSize="xl" fontWeight="bold" mb={4}>
					{group?.name}
				</Text>
				{/* 4 buttons: Overview, Members, Roles, Invites */}
				<Button variant="ghost" colorScheme="blue" width="100%" mb={4}>
					Overview
				</Button>
				<Button variant="ghost" colorScheme="blue" width="100%" mb={4}>
					Roles
				</Button>
				<Divider />
				<Text fontSize="xl" fontWeight="bold" mb={4}>
					User Management
				</Text>
				<Button variant="ghost" colorScheme="blue" width="100%" mb={4}>
					Members
				</Button>
				<Button variant="ghost" colorScheme="blue" width="100%" mb={4}>
					Invites
				</Button>
			</Flex>
		</Flex>
	);
}
