import * as React from "react";
import { Routes, Route } from "react-router-dom";
import {
	Flex,
	Avatar,
	List,
	ListItem,
	Text,
	Box,
	useColorModeValue,
} from "@chakra-ui/react";

import { useAppDispatch, useTypedSelector } from "../../hooks/store";

import Navbar from "../Navigation/Navbar";

import Groups from "../../features/groups/Groups";

export default function Dashboard() {
	const dispatch = useAppDispatch();

	// Navbar shows and below it is a page consistion of 3 panes:
	// left pane: list of groups (with avatars)
	// middle pane: list of folders (with avatars)
	// right pane: list of files (with avatars)
	// make page not scrollable
	// make left pane scrollable
	// make middle pane scrollable
	// make right pane scrollable
	// make left pane fixed width
	// make middle pane fixed width
	// make right pane fixed width

	return (
		<Flex
			direction="column"
			w="full"
			h="full"
			bg={useColorModeValue("gray.50", "inherit")}>
			<Navbar />
			<Flex
				direction="row"
				w="full"
				h="full"
				bg={useColorModeValue("gray.50", "inherit")}
				wrap="wrap">
				<Flex
					direction="column"
					w="15%"
					h="full"
					bg={useColorModeValue("gray.50", "inherit")}
					wrap="wrap">
					<Groups />
				</Flex>
			</Flex>
		</Flex>
	);
}
