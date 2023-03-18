import { Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ThemeToggle() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Button
			onClick={toggleColorMode}
			bg="transparent"
			border="none"
			_hover={{
				bg: "transparent",
			}}>
			{colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
		</Button>
	);
}
