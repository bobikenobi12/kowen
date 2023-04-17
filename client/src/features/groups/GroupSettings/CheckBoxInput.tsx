import { Badge, Text, FormLabel } from "@chakra-ui/react";

import { Field } from "formik";
export function CheckBoxInput({
	label,
	value,
	customValue,
	...props
}: {
	label: string;
	value: string | number;
	customValue?: string;
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
				<Field type="checkbox" name={label} value={value} />
				<Text>{customValue ?? value}</Text>
			</Badge>
		</FormLabel>
	);
}
