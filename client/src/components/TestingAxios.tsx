import { Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";
import axios from "axios";

export default function TestingAxios() {
	const token = useSelector(selectToken);
	const config = {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	};

	axios
		.post(
			"http://localhost:8080/group/create",
			{
				name: "test",
				description: "test",
			},
			config
		)
		.then(res => console.log(res))
		.catch(err => console.log(err));

	return <Text>Testing Axios</Text>;
}
