import { Badge, Text, FormControl, Input, FormLabel } from "@chakra-ui/react";

import { Field } from "formik";

export function CheckBoxInput({
	permission,
	...props
}: {
	permission: string;
}) {
	return (
		<FormLabel {...props}>
			<Badge
				colorScheme="green"
				alignItems={"center"}
				p={2}
				gap={2}
				display={"flex"}
				transition={"all .3s ease"}
				_hover={{
					bg: "green.500",
				}}>
				<Field type="checkbox" name="permissions" value={permission} />
				<Text>{permission}</Text>
			</Badge>
		</FormLabel>
	);
}
