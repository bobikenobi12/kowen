// drawer of group icons
// each group icon is a button that opens the group's page

import {
	VStack,
	Avatar,
	Tooltip,
	Text,
	useToast,
	useColorModeValue,
	Flex,
} from "@chakra-ui/react";

import { useShowGroupsQuery } from "../../app/services/groups";
import GroupModal from "./GroupActions";

import { useAppDispatch } from "../../hooks/store";

import { Link } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";

export default function Groups() {
	const toast = useToast();
	const { data } = useShowGroupsQuery();
	const dispatch = useAppDispatch();

	return (
		<VStack
			overflowY="scroll"
			w="full"
			h="full"
			bg={useColorModeValue("gray.50", "inherit")}>
			{data?.map(group => (
				<>
					<Text>{group.groupPicture}</Text>
					<Tooltip
						key={group.id}
						label={group.name}
						placement="right"
						hasArrow
						aria-label="A tooltip">
						<Avatar
							size={{ base: "md", md: "lg", lg: "xl" }}
							name={group.name}
							cursor="pointer"
							// make avatar transition pop out
							_hover={{
								transform: "scale(1.1)",
								// make them from rounded to less rounded
								borderRadius: "30%",
							}}
						/>
					</Tooltip>
				</>
			))}
			<GroupModal />
		</VStack>
	);
}
