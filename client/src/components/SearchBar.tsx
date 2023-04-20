import { useState, useEffect } from "react";
import {
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Text,
	VStack,
} from "@chakra-ui/react";

import { BsSearch } from "react-icons/bs";

import { filterDocuments } from "../features/documents/documentSlice";
import { useAppDispatch } from "../hooks/store";

export default function SearchBar() {
	const [searchTerm, setSearchTerm] = useState("");

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (searchTerm === "") {
			dispatch(filterDocuments(""));
		}

		dispatch(filterDocuments(searchTerm));
	}, [searchTerm, dispatch]);

	return (
		<VStack>
			<InputGroup>
				<InputLeftElement
					pointerEvents="none"
					children={<BsSearch color="gray.300" />}
				/>
				<Input
					type="text"
					placeholder="Search"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
				<InputRightElement
					children={<Text color="gray.300">{searchTerm.length}</Text>}
				/>
			</InputGroup>
		</VStack>
	);
}
