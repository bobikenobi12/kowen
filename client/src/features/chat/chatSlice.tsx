import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/services/chat";
import type { RootState } from "../../app/store";
import { type Message } from "../../app/services/chat";

interface ChatState {
	message: Message | null;
	messages: Message[];
}

const initialState: ChatState = {
	message: null,
	messages: [],
};

const slice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		setChatMessage: (state, { payload }) => {
			state.message = payload;
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			api.endpoints.sendMessage.matchFulfilled,
			(state, { payload }) => {
				state.messages = payload;
			}
		);
		builder.addMatcher(
			api.endpoints.getMessages.matchFulfilled,
			(state, { payload }) => {
				state.messages = payload;
			}
		);
		builder.addMatcher(
			api.endpoints.clearChat.matchFulfilled,
			(state, { payload }) => {
				state.messages = [];
			}
		);
		builder.addMatcher(
			api.endpoints.editChatMessage.matchFulfilled,
			(state, { payload }) => {
				state.messages = payload;
			}
		);
		builder.addMatcher(
			api.endpoints.deleteChatMessage.matchFulfilled,
			(state, { payload }) => {
				state.messages = payload;
			}
		);
	},
});

export default slice.reducer;

export const { setChatMessage } = slice.actions;

export const selectChatMessage = (state: RootState) => state.chat.message;
