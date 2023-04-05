import { Tbody, Td, Th, Tr } from "@chakra-ui/react";
import { selectCurrentUser } from "./authSlice";
import { useTypedSelector, useAppDispatch } from "../../hooks/store";
import { FormatDate } from "../../utils/FormatDate";

export default function ViewOnlyUserDetails() {
	const user = useTypedSelector(selectCurrentUser);

	return (
		<Tbody>
			<Tr>
				<Th>Full Name</Th>
				<Td>
					{user?.firstName} {user?.lastName}
				</Td>
			</Tr>
			<Tr>
				<Th>Email</Th>
				<Td>{user?.email}</Td>
			</Tr>
			<Tr>
				<Th>Username</Th>
				<Td>{user?.username}</Td>
			</Tr>
			<Tr>
				<Th>Date Joined</Th>
				<Td>{FormatDate(user?.dateJoined as Date)}</Td>
			</Tr>
		</Tbody>
	);
}
