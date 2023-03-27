import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: true,
};

const colors = {
	cyan: {
		50: "#E6F7FF",
		100: "#BAE7FF",
		200: "#91D5FF",
		300: "#69C0FF",
		400: "#00688B",
		500: "#005A70",
		600: "#004D55",
	},
	teal: {
		50: "#E6FFFB",
		100: "#B5F5EC",
		200: "#87E8DE",
		300: "#5CDBD0",
		400: "#03A89E",
		500: "#028C82",
		600: "#027066",
	},
	red: {
		50: "#FFF7E6",
		100: "#FFE7BA",
		200: "#FFD591",
		300: "#FFC069",
		400: "$CD3700",
		500: "#CD3700",
		600: "#A52A00",
	},
	darkOrange: {
		50: "#FFF7E6",
		100: "#FFE7BA",
		200: "#FFD591",
		300: "#FFC069",
		400: "#FF6103",
		500: "#FF6103",
		600: "#A52A00",
	},
};

const theme = extendTheme({ config, colors });
export default theme;
