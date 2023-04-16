import { useTypedSelector } from "../hooks/store";
import {
	useGetUserPermissionsForGroupQuery,
	Permission,
	type Group,
} from "../app/services/groups";
import type { User } from "../app/services/auth";
import { selectCurrentUser } from "../features/auth/authSlice";
import { selectGroupById } from "../features/groups/groupsSlice";
import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useParams, Link as RouterLink } from "react-router-dom";

import GroupSettings from "../features/groups/GroupSettings/GroupSettings";

export function SettingsOutlet(): JSX.Element {
	const { groupId } = useParams();
	const currentUser = useTypedSelector(selectCurrentUser) as User;
	const currentGroup = useTypedSelector(state =>
		selectGroupById(state, Number(groupId))
	) as Group;

	const {
		data: permissions,
		error,
		isLoading,
	} = useGetUserPermissionsForGroupQuery(Number(groupId));

	if (isLoading) return <div>Checking for permissions...</div>;

	if (error) return <div>Error: {error.toString()}</div>;

	let canAccessGroupSettings = false;

	if (currentUser.id === currentGroup.creator.id) {
		canAccessGroupSettings = true;
	} else if (permissions) {
		canAccessGroupSettings = permissions.some((permission: Permission) => {
			return (
				permission === Permission.add_role ||
				permission === Permission.apply_role ||
				permission === Permission.edit_role ||
				permission === Permission.remove_role ||
				permission === Permission.edit_group ||
				permission === Permission.remove_user
			);
		});
	}

	return canAccessGroupSettings ? (
		<GroupSettings />
	) : (
		<Flex
			align="center"
			justify="center"
			direction="column"
			height="100%"
			width="100%">
			<Heading size="lg" mb={2}>
				You don't have permission to access this page.
			</Heading>
			<Text mb={4}>
				You can request access to this group's settings by contacting
				the group's owner.
			</Text>
			<Link as={RouterLink} to={`/groups/${groupId}`}>
				Go back to group
			</Link>
		</Flex>
	);
}
