import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../app/services/documents";
import { RootState } from "../../app/store";
import { Document } from "../../app/services/documents";

interface DocumentsState {
	documents: Document[];
}

const initialState: DocumentsState = {
	documents: [],
};

export const documentsSlice = createSlice({
	name: "documents",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addMatcher(
			api.endpoints.getDocumentsInGroup.matchFulfilled,
			(state, action) => {
				console.log(action.payload);
				state.documents = action.payload;
			}
		);
	},
});

export default documentsSlice.reducer;

export const selectDocuments = (state: RootState) => state.documents.documents;
