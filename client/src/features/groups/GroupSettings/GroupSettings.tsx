import * as React from "react";
import {
	Flex,
	Button,
	IconButton,
	Text,
	Divider,
	useColorModeValue,
	VStack,
	Icon,
} from "@chakra-ui/react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useTypedSelector, useAppDispatch } from "../../../hooks/store";
import { selectSelectedSection } from "../groupsSlice";

import { type Group, useShowGroupQuery } from "../../../app/services/groups";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import GroupOverview from "./Overview";
import GroupRoles from "./Roles";
import GroupMembers from "./Members";

export default function GroupSettings() {
	const dispatch = useAppDispatch();
	const selectedSection = useTypedSelector(selectSelectedSection);
	const { groupId } = useParams<{ groupId: string }>();
	const navigate = useNavigate();
	const { data: group, error } = useShowGroupQuery(
		parseInt(groupId as string)
	);
	if (error) {
		navigate("/404");
	}

	const bg = useColorModeValue("white", "gray.800");

	return (
		<Flex direction="row" width="100%" height="100vh" overflow="hidden">
			<Flex direction="column" bg={bg} p={4} width="30%" height="100vh">
				<Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
					{group?.name}
				</Text>
				<Button
					variant="ghost"
					colorScheme="blue"
					width="100%"
					mb={4}
					onClick={() => {
						dispatch({
							type: "groups/setSelectedSection",
							payload: "overview",
						});
					}}>
					Overview
				</Button>
				<Button
					variant="ghost"
					colorScheme="blue"
					width="100%"
					mb={4}
					onClick={() => {
						dispatch({
							type: "groups/setSelectedSection",
							payload: "roles",
						});
					}}>
					Roles
				</Button>
				<Divider />
				<Text
					fontSize="xl"
					fontWeight="bold"
					mb={4}
					mt={4}
					textAlign="center">
					User Management
				</Text>
				<Button
					variant="ghost"
					colorScheme="blue"
					width="100%"
					mb={4}
					onClick={() => {
						dispatch({
							type: "groups/setSelectedSection",
							payload: "members",
						});
					}}>
					Members
				</Button>
				<Button variant="ghost" colorScheme="blue" width="100%" mb={4}>
					Invites
				</Button>
			</Flex>
			<Flex direction="column" bg={bg} p={4} width="60%" height="100vh">
				{group && selectedSection === "overview" && (
					<GroupOverview group={group} />
				)}
				{group && selectedSection === "roles" && (
					<GroupRoles group={group} />
				)}
				{group && selectedSection === "members" && (
					<GroupMembers group={group} />
				)}
			</Flex>
			<Flex
				direction="row"
				bg={bg}
				p={4}
				width="10%"
				height="100vh"
				justifyContent={"flex-start"}>
				<VStack>
					<Icon
						cursor={"pointer"}
						as={IoIosCloseCircleOutline}
						fontSize="4xl"
						color={useColorModeValue("gray.500", "white")}
						_hover={{
							color: useColorModeValue("gray.700", "gray.300"),
							transform: "scale(1.1)",
						}}
						onClick={() => {
							dispatch({
								type: "groups/setCurrentGroup",
								payload: group as Group,
							});
							dispatch({
								type: "groups/setSelectedSection",
								payload: "overview",
							});

							navigate("/dashboard");
						}}
					/>

					<Text
						fontSize="xl"
						fontWeight="bold"
						mb={4}
						textAlign="center">
						Esc
					</Text>
				</VStack>
			</Flex>
		</Flex>
	);
}
