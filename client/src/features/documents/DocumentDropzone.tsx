import { FormControl, FormLabel, Input, Box, Icon } from "@chakra-ui/react";

import { useDropzone } from "react-dropzone";
import { AiOutlineUpload } from "react-icons/ai";

export default function DocumentDropzone({ field, form, ...props }: any) {
	const { getRootProps, getInputProps } = useDropzone({
		multiple: false,
		onDrop: acceptedFiles => {
			form.setFieldValue(field.name, acceptedFiles[0]);
		},
	}) as any;

	return (
		<FormControl
			isInvalid={form.errors[field.name] && form.touched[field.name]}>
			<FormLabel htmlFor={field.name}>File</FormLabel>
			<Box {...getRootProps()}>
				<Input {...getInputProps()} />
				<Box mt={2} mb={4}>
					<Icon as={AiOutlineUpload} />
				</Box>
				{form.errors[field.name] && form.touched[field.name] && (
					<Box mt={2} mb={4} color="red.500" fontWeight="semibold">
						{form.errors[field.name]}
					</Box>
				)}
				{field.value && (
					<Box mt={2} mb={4} className="image-preview">
						<img
							src={URL.createObjectURL(field.value)}
							alt="Preview"
						/>
					</Box>
				)}
			</Box>
		</FormControl>
	);
}
