import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Icon,
	IconButton,
	useDisclosure,
	useColorModeValue,
} from "@chakra-ui/react";

import { useTypedSelector } from "../../hooks/store";
import { selectCurrentGroup } from "../groups/groupsSlice";
