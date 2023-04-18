import fileDownload from "js-file-download";

import {
	Flex,
	Heading,
	HStack,
	Icon,
	IconButton,
	useColorModeValue,
	Text,
	Tooltip,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import { BsCloudDownload } from "react-icons/bs";
import { useTypedSelector } from "../../hooks/store";
import { selectCurrentGroup, selectIsCreator } from "../groups/groupsSlice";
import { useGetFolderInGroupQuery } from "../../app/services/folders";
import { type Folder } from "../../app/services/folders";
import {
	type Group,
	useGetUserPermissionsForGroupQuery,
	Permission,
} from "../../app/services/groups";
import {
	type Document,
	useGetDocumentsInGroupQuery,
	useLazyDownloadDocumentQuery,
	useRemoveDocumentMutation,
} from "../../app/services/documents";

import UploadDocument from "../documents/UploadDocument";
import SaveNewDocumentVersion from "../documents/SaveNewDocumentVersion";
import DeleteDocumentDialog from "../documents/DeleteDocumentDialog";

export default function Folder() {
	const group = useTypedSelector(selectCurrentGroup) as Group;
	const isCreator = useTypedSelector(selectIsCreator);

	const {
		data: folder,
		isLoading: folderLoading,
		error: folderError,
	} = useGetFolderInGroupQuery({
		folderId: Number(
			useParams<{ groupId: string; folderId: string }>().folderId
		),
		groupId: Number(
			useParams<{ groupId: string; folderId: string }>().groupId
		),
	});

	const {
		data: permissions,
		isLoading: permissionsLoading,
		error: permissionsError,
	} = useGetUserPermissionsForGroupQuery(group.id);

	const {
		data: documents,
		isLoading: documentsLoading,
		error: documentsError,
	} = useGetDocumentsInGroupQuery({
		groupId: group.id,
		folderId: parseInt(
			useParams<{ folderId: string }>().folderId as string
		),
	});
	const [trigger, result, lastPromiseInfo] = useLazyDownloadDocumentQuery();

	if (folderLoading || documentsLoading || permissionsLoading) {
		return <Text>Loading...</Text>;
	}

	if (folderError || documentsError || permissionsError) {
		return <Text>An error occurred.</Text>;
	}

	return (
		<Flex
			direction="column"
			w="full"
			h="full"
			bg={useColorModeValue("gray.100", "inherit")}>
			<Flex
				direction="row"
				w="full"
				p={2}
				gap={10}
				alignItems={"center"}
				justifyContent={"space-between"}
				bg={useColorModeValue("gray.100", "gray.700")}
				shadow="md"
				style={{
					position: "sticky",
					top: 0,
					zIndex: 1,
				}}>
				<Heading ml={4} size="md">
					{folder && folder.name}
				</Heading>
				<HStack mr={4}>
					{permissions &&
						(permissions.includes(Permission.add_document) ||
							isCreator) && <UploadDocument />}
				</HStack>
			</Flex>
			<Flex
				direction="column"
				w="full"
				h="full"
				bg={useColorModeValue("gray.100", "inherit")}>
				{documents &&
					documents.map(document => {
						return (
							<HStack
								key={document.id}
								w="full"
								p={2}
								alignItems={"center"}
								justifyContent={"space-between"}
								bg={useColorModeValue("gray.100", "gray.700")}
								cursor="pointer"
								_hover={{
									bg: useColorModeValue(
										"gray.200",
										"gray.600"
									),
								}}>
								<Text ml={4} size="md">
									{document.name}
								</Text>
								<HStack mr={4}>
									{permissions &&
										(permissions.includes(
											Permission.download_document
										) ||
											isCreator) && (
											<>
												<Tooltip
													label={`Download ${document.name}`}
													aria-label={`Download ${document.name}`}
													hasArrow>
													<IconButton
														aria-label="Download Document"
														colorScheme={"blue"}
														variant={"outline"}
														icon={
															<Icon
																as={
																	BsCloudDownload
																}
															/>
														}
														onClick={async () => {
															try {
																await trigger({
																	groupId:
																		group.id,
																	folderId:
																		folder!
																			.id,
																	documentId:
																		document.id,
																	version:
																		document
																			.versions[
																			document
																				.versions
																				.length -
																				1
																		]
																			.version,
																});
																console.log(
																	document.documentExtension
																);
																fileDownload(
																	result.data as Blob,
																	document.name
																);
															} catch (error) {
																console.log(
																	error
																);
															}
														}}
													/>
												</Tooltip>
											</>
										)}
									{permissions &&
										(permissions.includes(
											Permission.save_new_document_version
										) ||
											isCreator) && (
											<SaveNewDocumentVersion
												documentId={document.id}
											/>
										)}

									{permissions &&
										(permissions.includes(
											Permission.remove_document
										) ||
											isCreator) && (
											<DeleteDocumentDialog
												group={group}
												folder={folder!}
												document={document}
											/>
										)}
								</HStack>
							</HStack>
						);
					})}
			</Flex>
		</Flex>
	);
}
