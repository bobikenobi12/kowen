import {
	Box,
	Flex,
	Link,
	Stack,
	Text,
	useColorModeValue,
	Icon,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { Link as RouterLink } from "react-router-dom";

import { INavItem } from "./Navbar";

export default function DesktopSubNav({ label, href, subLabel }: INavItem) {
	return (
		<Link
			as={RouterLink}
			to={href as unknown as string}
			state={{ from: "navbar" }}
			role={"group"}
			display={"block"}
			p={2}
			rounded={"md"}
			_hover={{ bg: useColorModeValue("cyan.50", "gray.900") }}>
			<Stack direction={"row"} align={"center"}>
				<Box>
					<Text
						transition={"all .3s ease"}
						_groupHover={{ color: "cyan.400" }}
						fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={"sm"}>{subLabel}</Text>
				</Box>
				<Flex
					transition={"all .3s ease"}
					transform={"translateX(-10px)"}
					opacity={0}
					_groupHover={{
						opacity: "100%",
						transform: "translateX(0)",
					}}
					justify={"flex-end"}
					align={"center"}
					flex={1}>
					<Icon
						color={"cyan.400"}
						w={5}
						h={5}
						as={ChevronRightIcon}
					/>
				</Flex>
			</Stack>
		</Link>
	);
}
