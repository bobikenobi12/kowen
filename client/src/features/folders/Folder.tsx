import fileDownload from "js-file-download";
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Icon,
	IconButton,
	useDisclosure,
	useColorModeValue,
	Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { BsCloudDownload } from "react-icons/bs";
import { AddIcon } from "@chakra-ui/icons";
import { useTypedSelector } from "../../hooks/store";
import { selectCurrentFolder, selectCurrentGroup } from "../groups/groupsSlice";
import { selectCurrentUser } from "../auth/authSlice";
import { type Folder } from "../../app/services/folders";
import { type Group } from "../../app/services/groups";
import {
	type Document,
	useGetDocumentsInGroupQuery,
	useDownloadDocumentMutation,
} from "../../app/services/documents";

import UploadDocument from "../documents/UploadDocument";

export default function Folder() {
	const folder = useTypedSelector(selectCurrentFolder) as Folder;
	const group = useTypedSelector(selectCurrentGroup) as Group;
	const { data: documents } = useGetDocumentsInGroupQuery({
		groupId: group.id,
		folderId: folder.id,
	}) as { data: Document[] };
	const [downloadDocument] = useDownloadDocumentMutation();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex
			direction="column"
			w="full"
			h="full"
			bg={useColorModeValue("gray.50", "inherit")}>
			<Flex
				direction="row"
				w="full"
				alignItems={"center"}
				justifyContent={"space-between"}
				bg={useColorModeValue("gray.100", "gray.700")}>
				<Heading ml={4} size="md">
					{folder.name}
				</Heading>
				<HStack mr={4}>
					<UploadDocument />
					<IconButton
						aria-label="Create Document"
						icon={<Icon as={BsCloudDownload} />}
						onClick={onOpen}
					/>
				</HStack>
			</Flex>
			<Flex
				direction="column"
				w="full"
				h="full"
				bg={useColorModeValue("gray.50", "inherit")}>
				{documents &&
					documents.map(document => {
						return (
							<HStack
								key={document.id}
								w="full"
								alignItems={"center"}
								justifyContent={"space-between"}
								bg={useColorModeValue("gray.100", "gray.700")}>
								<Text ml={4} size="md">
									{document.name}
								</Text>
								<HStack mr={4}>
									<IconButton
										aria-label="Download Document"
										colorScheme={"blue"}
										variant={"outline"}
										icon={<Icon as={BsCloudDownload} />}
										onClick={async () => {
											try {
												const { data } =
													(await downloadDocument({
														folderId: folder.id,
														documentId: document.id,
														version: 1,
													})) as { data: Blob };
												fileDownload(
													data,
													document.name
												);
											} catch (error) {
												console.log(error);
											}
										}}
									/>
									<IconButton
										aria-label="Delete Document"
										icon={<Icon as={BsCloudDownload} />}
										onClick={onOpen}
									/>
								</HStack>
							</HStack>
						);
					})}
			</Flex>
		</Flex>
	);
}
