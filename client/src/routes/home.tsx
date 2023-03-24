import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "../app/hooks";

export default function Home() {
	const { email, _token } = useAppSelector(state => state.auth);

	return (
		<Box>
			<Heading>Home</Heading>
			<Text>{email}</Text>
			<Text>{_token}</Text>
		</Box>
	);
}
