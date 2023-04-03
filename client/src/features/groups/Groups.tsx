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
		<VStack w="full" h="full" bg={useColorModeValue("gray.50", "inherit")}>
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
							size={{ base: "md", md: "lg" }}
							name={group.name}
							cursor="pointer"
							_hover={{
								transform: "scale(1.1)",
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
