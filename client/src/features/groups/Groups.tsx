import * as React from "react";
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
import { useGetFoldersInGroupQuery } from "../../app/services/folders";

import GroupModal from "./CreateGroup";

import { useTypedSelector, useAppDispatch } from "../../hooks/store";
import { selectGroups } from "./groupsSlice";
import { type Group } from "../../app/services/groups";

import { AddIcon } from "@chakra-ui/icons";

export default function Groups() {
	const toast = useToast();
	const dispatch = useAppDispatch();
	const groups = useTypedSelector(selectGroups);
	useShowGroupsQuery();

	return (
		<VStack w="full" h="full" bg={useColorModeValue("gray.50", "inherit")}>
			{groups.map((group: Group) => (
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
						onClick={() => {
							dispatch({
								type: "groups/setCurrentGroup",
								payload: group,
							});
						}}
					/>
				</Tooltip>
			))}
			<GroupModal />
		</VStack>
	);
}
