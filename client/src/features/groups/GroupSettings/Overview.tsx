import {
	HStack,
	Avatar,
	Text,
	VStack,
	Box,
	Button,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector, useAppDispatch } from "../../../hooks/store";
import { type Group } from "../../../app/services/groups";

export default function GroupOverview({ group }: { group: Group }) {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();
	const toast = useToast();
	const bg = useColorModeValue("white", "gray.800");

	return (
		<Box
			bg={bg}
			p={4}
			w="full"
			h="full"
			borderRadius="lg"
			boxShadow="lg"
			overflow="hidden"
			justifyContent="flex-start"
			alignItems="center"
			display="flex"
			flexDirection="column">
			<HStack spacing={4}>
				<Avatar size="xl" name={group.name} />
				<VStack align="start" spacing={1}>
					<Text fontSize="2xl" fontWeight="bold">
						{group.name}
					</Text>
					<Text fontSize="sm" color="gray.500">
						{group.description}
					</Text>
				</VStack>
			</HStack>
		</Box>
	);
}
