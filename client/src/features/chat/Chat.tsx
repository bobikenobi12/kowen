import * as React from "react";

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
	VStack,
} from "@chakra-ui/react";

import { IoSend } from "react-icons/io5";
import { BsFillTrashFill } from "react-icons/bs";

import { useParams } from "react-router-dom";
import { BiMessageRoundedMinus } from "react-icons/bi";

import {
	useGetMessagesQuery,
	useSendMessageMutation,
	useClearChatMutation,
	useEditChatMessageMutation,
	useDeleteChatMessageMutation,
} from "../../app/services/chat";

import { selectGroupById, selectIsCreator } from "../groups/groupsSlice";

import { setChatMessage, selectChatMessage } from "./chatSlice";

import { useTypedSelector, useAppDispatch } from "../../hooks/store";

import type { Message } from "../../app/services/chat";

import {
	useGetUserPermissionsForGroupQuery,
	Permission,
} from "../../app/services/groups";

import { selectCurrentUser } from "../auth/authSlice";

import type { Group } from "../../app/services/groups";
import type { User } from "../../app/services/auth";

import EditMessageModal from "./EditMessageModal";

export default function Chat() {
	const { groupId } = useParams<{ groupId: string }>();

	const [hoveredMessage, setHoveredMessage] = React.useState<Message | null>(
		null
	);

	const dispatch = useAppDispatch();

	const currentGroup = useTypedSelector(state =>
		selectGroupById(state, Number(groupId))
	) as Group;

	const isCreator = useTypedSelector(state =>
		selectIsCreator(state, Number(groupId))
	);

	const currentUser = useTypedSelector(selectCurrentUser) as User;

	const currentChatMessage = useTypedSelector(selectChatMessage);

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
		if (currentChatMessage) {
			try {
				await sendMessage({
					groupId: Number(groupId),
					content: currentChatMessage,
				}).unwrap();
				dispatch(setChatMessage(""));
			} catch (error) {
				console.error(error);
			}
		}
	}

	async function handleClearChat() {
		await clearChat(Number(groupId)).unwrap();
	}

	async function handleEditMessage(message: Message) {
		await editChatMessage({
			groupId: Number(groupId),
			messageId: message.id,
			content: message.content,
		}).unwrap();
	}

	async function handleDeleteMessage(message: Message) {
		await deleteChatMessage({
			groupId: Number(groupId),
			messageId: message.id,
		}).unwrap();
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
					{messages &&
						messages.map(message => (
							<Flex
								key={message.id}
								w="100%"
								h="50px"
								onMouseEnter={() => {
									setHoveredMessage(message);
								}}
								onMouseLeave={() => {
									setHoveredMessage(null);
								}}
								justifyContent="space-between"
								alignItems="center"
								p="2"
								bg={useColorModeValue("gray.200", "gray.600")}
								borderRadius="md"
								mb="2">
								<VStack>
									<Text fontWeight="bold">
										{/* {message.sender.username} */}
									</Text>
									<Text>{message.content}</Text>
								</VStack>
								{hoveredMessage &&
									hoveredMessage.id === message.id && (
										<HStack>
											{isCreator && (
												<EditMessageModal
													content={message.content}
													messageId={message.id}
													groupId={Number(groupId)}
												/>
											)}

											<IconButton
												aria-label="Delete message"
												variant="outline"
												colorScheme="red"
												icon={<BsFillTrashFill />}
												onClick={async () => {
													await handleDeleteMessage(
														message
													);
												}}
											/>
										</HStack>
									)}
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
							value={currentChatMessage}
							onChange={e => {
								dispatch(setChatMessage(e.target.value));
							}}
						/>
						<InputRightElement>
							<IconButton
								aria-label="Send message"
								icon={<IoSend />}
								onClick={async () => {
									await handleSendMessage();
								}}
								isLoading={isSendingMessage}
							/>
						</InputRightElement>
					</InputGroup>
					<IconButton
						aria-label="Purge chat"
						variant={isClearingChat ? "solid" : "outline"}
						colorScheme="red"
						icon={<BsFillTrashFill />}
						onClick={async () => {
							await handleClearChat();
						}}
						isLoading={isClearingChat}
					/>
				</HStack>
			</Flex>
		</Box>
	);
}