import { Flex, Avatar, Tooltip, useColorModeValue } from "@chakra-ui/react";

import { useShowGroupsQuery } from "../../app/services/groups";
import { Outlet, Link } from "react-router-dom";

import GroupModal from "./CreateGroup";

import { useTypedSelector, useAppDispatch } from "../../hooks/store";
import { selectGroups } from "./groupsSlice";
import { type Group } from "../../app/services/groups";

export default function Groups() {
	const dispatch = useAppDispatch();
	const groups = useTypedSelector(selectGroups);
	useShowGroupsQuery();

	return (
		<Flex w="full" h={"100vh"} alignItems={"center"}>
			<Flex
				w="fit-content"
				direction={"column"}
				alignItems={"center"}
				p={4}
				h={"100vh"}
				gap={3}
				overflowY={"scroll"}
				bg={useColorModeValue("gray.100", "inherit")}>
				{groups.map((group: Group) => (
					<Tooltip
						key={group.id}
						label={group.name}
						placement="right"
						hasArrow
						aria-label="A tooltip">
						<Link to={`/groups/${group.id}`}>
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
						</Link>
					</Tooltip>
				))}
				<GroupModal />
			</Flex>
			<Outlet />
		</Flex>
	);
}
