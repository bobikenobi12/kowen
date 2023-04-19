import { Flex, Avatar, Tooltip, useColorModeValue } from "@chakra-ui/react";

import { useShowGroupsQuery } from "../../app/services/groups";
import { Outlet, Link, useNavigate } from "react-router-dom";

import GroupModal from "./CreateGroup";

import { useTypedSelector, useAppDispatch } from "../../hooks/store";
import { selectGroups } from "./groupsSlice";
import { type Group } from "../../app/services/groups";

export default function Groups() {
	const navigate = useNavigate();
	const groups = useTypedSelector(selectGroups);
	useShowGroupsQuery();

	return (
		<Flex w="full" h={"100vh"}>
			<Flex
				w={{ base: "80px", md: "110px" }}
				direction={"column"}
				alignItems={"center"}
				h={"100vh"}
				gap={3}
				pt={5}
				overflowY={"scroll"}
				overflowX={"hidden"}
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
