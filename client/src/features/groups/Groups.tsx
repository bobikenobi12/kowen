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
import { ArrowRightIcon } from "@chakra-ui/icons";

import { useAppDispatch } from "../../hooks/store";

import { Link } from "react-router-dom";

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
						/>
					</Tooltip>
				</>
			))}
		</VStack>
	);
}
