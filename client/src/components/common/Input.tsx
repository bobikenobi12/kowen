import { FieldHookConfig, useField } from "formik";
import { Input as ChakraInput, InputProps } from "@chakra-ui/react";

export type InputFieldProps = InputProps & FieldHookConfig<"input">;

export function InputField({ name, ...props }: InputFieldProps) {
	const [field, meta] = useField(name);
	// return <ChakraInput {...field} {...props} />;
	return (
		// <ChakraInput
		//     {...field}
		//     {...props}
		//     isInvalid={!!meta.error && !!meta.touched}
		// />
		<> </>
	);
}
