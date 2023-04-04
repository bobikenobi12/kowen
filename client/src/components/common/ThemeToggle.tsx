import {
	useColorMode,
	IconButton,
	useColorModeValue,
	Tooltip,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function ThemeToggle() {
	const { toggleColorMode } = useColorMode();
	const text = useColorModeValue("dark", "light");
	const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

	return (
		<Tooltip
			label={`Switch to ${text} mode`}
			aria-label={`Switch to ${text} mode`}
			hasArrow>
			<IconButton
				size="md"
				fontSize="lg"
				aria-label={`Switch to ${text} mode`}
				variant="ghost"
				marginLeft="2"
				onClick={toggleColorMode}
				icon={<SwitchIcon />}
			/>
		</Tooltip>
	);
}
