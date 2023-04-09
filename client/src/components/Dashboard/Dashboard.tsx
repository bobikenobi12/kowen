import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Flex, useColorModeValue } from "@chakra-ui/react";

import { useAppDispatch, useTypedSelector } from "../../hooks/store";
import {
	selectCurrentGroup,
	selectCurrentFolder,
} from "../../features/groups/groupsSlice";

import Groups from "../../features/groups/Groups";
import Group from "../../features/groups/Group";
import Folder from "../../features/folders/Folder";
export default function Dashboard() {
	const dispatch = useAppDispatch();
	const currentGroup = useTypedSelector(selectCurrentGroup);
	const currentFolder = useTypedSelector(selectCurrentFolder);

	return (
		<Flex
			direction="row"
			w="full"
			h="100vh"
			bg={useColorModeValue("gray.50", "inherit")}
			wrap="wrap">
			<Flex
				direction="column"
				w="fit-content"
				h="full"
				bg={useColorModeValue("gray.100", "gray.900")}
				wrap="wrap"
				overflowY="scroll"
				overflowX="hidden"
				shadow="md"
				p={3}>
				<Groups />
			</Flex>
			{currentGroup && (
				<Flex
					direction="column"
					w="fit-content"
					h="full"
					bg={useColorModeValue("gray.100", "gray.700")}
					wrap="wrap"
					overflowY="scroll"
					overflowX="hidden">
					<Group />
				</Flex>
			)}
			{currentFolder && (
				<Flex
					direction="column"
					w="fit-content"
					h="full"
					bg={useColorModeValue("gray.100", "gray.700")}
					wrap="wrap"
					overflowY="scroll"
					overflowX="hidden">
					<Folder />
				</Flex>
			)}

			{/* <Flex
				direction="column"
				w="full"
				h="full"
				bg={useColorModeValue("gray.100", "gray.700")}
				wrap="wrap"
				overflowY="scroll"
				overflowX="hidden"
			> */}
		</Flex>
	);
}
