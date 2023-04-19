import {
	useGetMessagesQuery,
	useSendMessageMutation,
	useClearChatMutation,
	useEditChatMessageMutation,
	useDeleteChatMessageMutation,
} from "../../app/services/chat";

import { selectGroupById, selectIsCreator } from "../groups/groupsSlice";

import { setChatMessage, selectChatMessage } from "./chatSlice";

import { useTypedSelector } from "../../hooks/store";

import type { Message } from "../../app/services/chat";

import {
	useGetUserPermissionsForGroupQuery,
	Permission,
} from "../../app/services/groups";

import { selectCurrentUser } from "../auth/authSlice";

import type { Group } from "../../app/services/groups";
import type { User } from "../../app/services/auth";

import {
	Box,
	Flex,
	Heading,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

import { IoSend } from "react-icons/io5";
import { BsFillTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

import { useParams } from "react-router-dom";

export default function Chat() {
	const { groupId } = useParams<{ groupId: string }>();

	const currentGroup = useTypedSelector(state =>
		selectGroupById(state, Number(groupId))
	) as Group;

	const isCreator = useTypedSelector(state =>
		selectIsCreator(state, Number(groupId))
	);

	const currentUser = useTypedSelector(selectCurrentUser) as User;

	const message = useTypedSelector(selectChatMessage);

	const { data: userPermissions, isLoading: isGettingUserPermissions } =
		useGetUserPermissionsForGroupQuery(Number(groupId));

	const { data: messages, isLoading: isGettingMessages } =
		useGetMessagesQuery(Number(groupId));

	const [sendMessage, { isLoading: isSendingMessage }] =
		useSendMessageMutation();
	const [clearChat, { isLoading: isClearingChat }] = useClearChatMutation();
	const [editChatMessage, { isLoading: isEditingChatMessage }] =
		useEditChatMessageMutation();
	const [deleteChatMessage, { isLoading: isDeletingChatMessage }] =
		useDeleteChatMessageMutation();

	async function handleSendMessage() {
		if (message) {
			await sendMessage({
				groupId: Number(groupId),
				content: message.content,
			});
			setChatMessage(null);
		}
	}

	async function handleClearChat() {
		await clearChat(Number(groupId));
	}

	async function handleEditMessage(message: Message) {
		await editChatMessage({
			groupId: Number(groupId),
			messageId: message.id,
			content: message.content,
		});
	}

	async function handleDeleteMessage(message: Message) {
		await deleteChatMessage({
			groupId: Number(groupId),
			messageId: message.id,
		});
	}

	if (isGettingMessages || isGettingUserPermissions) {
		return <Text>Loading...</Text>;
	}

	if (!messages) {
		return <Text>No messages</Text>;
	}

	return (
		<Box flex={1}>
			<Flex
				direction="column"
				align="center"
				justify="center"
				w="100%"
				h="100%"
				p="4"
				bg={useColorModeValue("gray.100", "gray.600")}>
				<Heading as="h1" size="lg" mb="4">
					{currentGroup.name} Chat
				</Heading>
				<Box
					w="100%"
					h="100%"
					p="4"
					bg={useColorModeValue("gray.100", "gray.700")}
					borderRadius="md"
					overflowY="scroll"
					css={{
						"&::-webkit-scrollbar": {
							width: "0.5em",
						},
						"&::-webkit-scrollbar-track": {
							"-webkit-box-shadow":
								"inset 0 0 6px rgba(0,0,0,0.00)",
						},
						"&::-webkit-scrollbar-thumb": {
							backgroundColor: "rgba(0,0,0,.1)",
							outline: "1px solid slategrey",
						},
					}}>
					{messages?.map(message => (
						<Flex
							key={message.id}
							direction="column"
							align="flex-start"
							justify="center"
							w="100%"
							p="2"
							bg="gray.100"
							borderRadius="md"
							mb="2">
							<Text fontWeight="bold">
								{message.sender.username}
							</Text>
							<Text>{message.content}</Text>
							<HStack>
								{currentUser.id === message.sender.id ||
									(userPermissions &&
										(isCreator ||
											userPermissions?.includes(
												Permission.edit_messages
											)) && (
											<IconButton
												aria-label="Edit message"
												icon={<MdEdit />}
												onClick={() =>
													handleEditMessage(message)
												}
												isLoading={isEditingChatMessage}
											/>
										))}
								{currentUser.id === message.sender.id ||
									(userPermissions &&
										(isCreator ||
											userPermissions?.includes(
												Permission.delete_messages
											)) && (
											<IconButton
												aria-label="Delete message"
												icon={<BsFillTrashFill />}
												onClick={() =>
													handleDeleteMessage(message)
												}
												isLoading={
													isDeletingChatMessage
												}
											/>
										))}
							</HStack>
						</Flex>
					))}
				</Box>
				<HStack w="100%" mt="4">
					<InputGroup>
						<InputLeftElement
							pointerEvents="none"
							children={<IoSend />}
						/>
						<Input
							placeholder="Type a message..."
							value={message?.content}
							onChange={e =>
								setChatMessage({
									...message,
									content: e.target.value,
								})
							}
						/>
						<InputRightElement>
							<IconButton
								aria-label="Send message"
								icon={<IoSend />}
								onClick={handleSendMessage}
								isLoading={isSendingMessage}
							/>
						</InputRightElement>
					</InputGroup>
					<IconButton
						aria-label="Purge chat"
						variant={isClearingChat ? "solid" : "outline"}
						colorScheme="red"
						icon={<BsFillTrashFill />}
						onClick={handleClearChat}
						isLoading={isClearingChat}
					/>
				</HStack>
			</Flex>
		</Box>
	);
}
