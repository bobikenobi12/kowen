import { apiSlice } from "./apiSlice";
import type { User } from "./auth";
import type { Group } from "./groups";

export interface Message {
	id: number;
	chat: GroupChat;
	sender: User;
	content: string;
	postedAt: Date;
}

export interface GroupChat {
	id: number;
	group: Group;
	messages: Message[];
}

export const api = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getMessages: builder.query<Message[], number>({
			query: groupId => ({
				url: `getMessages/${groupId}`,
				method: "GET",
			}),
			providesTags: (result, error, groupId) => [
				{ type: "Chat", id: groupId },
			],
		}),
		sendMessage: builder.mutation<
			Message[],
			{ groupId: number; content: string }
		>({
			query: ({ groupId, content }) => ({
				url: `sendMessage/${groupId}`,
				method: "POST",
				params: { message: content },
			}),
			invalidatesTags: (result, error, { groupId }) => [
				{ type: "Chat", id: groupId },
			],
		}),
		clearChat: builder.mutation<void, number>({
			query: groupId => ({
				url: `clearChat/${groupId}`,
				method: "GET",
			}),
			invalidatesTags: (result, error, groupId) => [
				{ type: "Chat", id: groupId },
			],
		}),
		editChatMessage: builder.mutation<
			Message[],
			{ groupId: number; messageId: number; content: string }
		>({
			query: ({ groupId, messageId, content }) => ({
				url: `edit/message/${groupId}/${messageId}`,
				method: "POST",
				params: { newMessage: content },
			}),
			invalidatesTags: (result, error, { groupId }) => [
				{ type: "Chat", id: groupId },
			],
		}),
		deleteChatMessage: builder.mutation<
			Message[],
			{ groupId: number; messageId: number }
		>({
			query: ({ groupId, messageId }) => ({
				url: `delete/message/${groupId}/${messageId}`,
				method: "GET",
			}),
			invalidatesTags: (result, error, { groupId }) => [
				{ type: "Chat", id: groupId },
			],
		}),
	}),
});

export const {
	useGetMessagesQuery,
	useSendMessageMutation,
	useClearChatMutation,
	useEditChatMessageMutation,
	useDeleteChatMessageMutation,
} = api;
