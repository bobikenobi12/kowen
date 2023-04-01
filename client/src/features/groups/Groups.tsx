import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	HStack,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spacer,
	Stack,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";

import { useShowGroupsQuery } from "../../app/services/groups";
import groupsSlice from "./groupsSlice";

export default function Groups() {
	const { data } = useShowGroupsQuery();

	return (
		<Box>
			<Flex
				bg={useColorModeValue("white", "gray.800")}
				color={useColorModeValue("gray.600", "white")}
				minH={"500px"}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.900")}
				align={"center"}
				gap={10}>
				{data?.map((group, idx) => (
					<Stack key={idx} spacing={0} align={"center"}>
						<Text>{group.id}</Text>
						<Text fontWeight={600}>{group.name}</Text>
						<Text color={"gray.500"}>{group.description}</Text>
						<Text color={"gray.500"}>{group.groupPicture}</Text>
						<Text color={"gray.500"}>{group.waitingUsersId}</Text>
					</Stack>
				))}
			</Flex>
		</Box>
	);
}
