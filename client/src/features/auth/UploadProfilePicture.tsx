import { useDropzone } from "react-dropzone";

import { useAppDispatch, useTypedSelector } from "../../hooks/store";
import { selectCurrentUser } from "../auth/authSlice";

import { useSetProfilePictureMutation } from "../../app/services/auth";

import {
	Box,
	Flex,
	Text,
	Avatar,
	Button,
	useToast,
	Input,
	IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function UploadProfilePicture() {
	const dispatch = useAppDispatch();
	const user = useTypedSelector(selectCurrentUser);
	const toast = useToast();

	const [setProfilePicture] = useSetProfilePictureMutation();

	const onDrop = async (acceptedFiles: File[]) => {
		const file = acceptedFiles[0];

		// i need to send the file in a form data object
		// its going to be set as a request param with key picture value file
		const formData = new FormData();
		formData.append("picture", file);

		try {
			await setProfilePicture(formData).unwrap();
			toast({
				title: "Profile picture updated",
				description: "Your profile picture has been updated",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} catch (err: any) {
			toast({
				title: "An error occurred.",
				description:
					"Sorry, we've encountered an error. Please try again later.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
	});

	return (
		<Box {...getRootProps()}>
			<input {...getInputProps()} />
			<IconButton
				aria-label="Edit Profile Picture"
				icon={<AddIcon fontSize={"xl"} />}
				position={"absolute"}
				top={"0"}
				right={"0"}
				variant="unstyled"
				rounded={"full"}
				color={"gray.800"}
				bg={"white"}
				_hover={{
					bg: "gray.100",
					transform: "scale(1.1)",
					borderRadius: "30%",
				}}
			/>
		</Box>
	);
}
