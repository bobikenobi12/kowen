import { FormLabel } from "@chakra-ui/react";
import { Field } from "formik";

export function CheckBoxInput({
	permission,
	...props
}: {
	permission: string;
}) {
	return (
		<FormLabel>
			<Field type="checkbox" name="permissions" value={permission} />
			{permission}
		</FormLabel>
	);
}
