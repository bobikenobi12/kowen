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

import { FormatDate } from "../../utils/FormatDate";

import {
	useGetMessagesQuery,
	useSendMessageMutation,
	useClearChatMutation,
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
import DeleteMessageAlertDialog from "./DeleteMessageAlertDialog";

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
								p={4}
								onMouseEnter={() => {
									setHoveredMessage(message);
								}}
								onMouseLeave={() => {
									setHoveredMessage(null);
								}}
								justifyContent="space-between"
								bg={useColorModeValue("gray.200", "gray.600")}
								borderRadius="md"
								mb="2">
								<VStack align="flex-start">
									<HStack>
										<Text fontWeight="bold">
											{message.sender.username}
										</Text>
										<Text fontSize="xs">
											{FormatDate(message.postedAt)}
										</Text>
									</HStack>
									<Text>{message.content}</Text>
								</VStack>
								{hoveredMessage &&
									hoveredMessage.id === message.id && (
										<HStack>
											{(currentUser.id ===
												message.sender.id ||
												isCreator ||
												userPermissions?.includes(
													Permission.edit_messages
												)) && (
												<EditMessageModal
													content={message.content}
													messageId={message.id}
													groupId={Number(groupId)}
												/>
											)}
											{(currentUser.id ===
												message.sender.id ||
												isCreator ||
												userPermissions?.includes(
													Permission.delete_messages
												)) && (
												<DeleteMessageAlertDialog
													groupId={Number(groupId)}
													messageId={message.id}
												/>
											)}
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
								isDisabled={
									!isCreator &&
									!userPermissions?.some(
										permission =>
											permission ===
											Permission.send_message
									)
								}
								_disabled={{
									bg: "gray.400",
									cursor: "not-allowed",
								}}
								onClick={async () => {
									await handleSendMessage();
								}}
								isLoading={isSendingMessage}
							/>
						</InputRightElement>
					</InputGroup>
					{(isCreator ||
						userPermissions?.includes(Permission.clear_chat)) && (
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
					)}
				</HStack>
			</Flex>
		</Box>
	);
}
