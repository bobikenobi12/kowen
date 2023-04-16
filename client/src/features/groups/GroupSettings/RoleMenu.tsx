import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Badge,
	useToast,
	IconButton,
} from "@chakra-ui/react";

import {
	type Group,
	useGetRolesInGroupQuery,
	useSetGroupRoleToUserMutation,
} from "../../../app/services/groups";
import { type User } from "../../../app/services/auth";

import { AddIcon } from "@chakra-ui/icons";

export default function RoleMenu({
	group,
	user,
}: {
	group: Group;
	user: User;
}) {
	const { data: roles } = useGetRolesInGroupQuery(group.id);
	const [setGroupRoleToUser] = useSetGroupRoleToUserMutation();
	const toast = useToast();

	return (
		<Menu>
			<MenuButton as={IconButton} icon={<AddIcon />} />
			<MenuList>
				{roles &&
					roles.map(role => (
						<MenuItem
							key={role.id}
							onClick={async () => {
								try {
									await setGroupRoleToUser({
										groupId: group.id,
										userId: parseInt(user.id),
										roleId: role.roleUser.id,
									});
									toast({
										title: "Role added to member",
										description:
											"The role was added to the member",
										status: "success",
										duration: 5000,
										isClosable: true,
									});
								} catch (error) {
									toast({
										title: "Error adding role to member",

										description:
											"There was an error adding the role to the member",
										status: "error",
										duration: 5000,
										isClosable: true,
									});
								}
							}}>
							<Badge colorScheme="green">
								{role.roleUser.name}
							</Badge>
						</MenuItem>
					))}
			</MenuList>
		</Menu>
	);
}
