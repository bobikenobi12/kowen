import { Stack, useColorModeValue } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { Link as RouterLink } from "react-router-dom";
import { NAV_ITEMS } from "./Navbar";

import MobileNavItem from "./MobileNavItem";

export default function MobileNav() {
	return (
		<Stack
			bg={useColorModeValue("white", "gray.800")}
			p={4}
			display={{ md: "none" }}>
			{NAV_ITEMS.map(navItem => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
}
