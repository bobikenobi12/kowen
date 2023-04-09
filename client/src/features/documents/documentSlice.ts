import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../app/services/documents";
import { RootState } from "../../app/store";
import { Document } from "../../app/services/documents";

interface DocumentsState {
	documents: Document[];
	selectedDocument: Document | null;
}

const initialState: DocumentsState = {
	documents: [],
	selectedDocument: null,
};

export const documentsSlice = createSlice({
	name: "documents",
	initialState,
	reducers: {
		setDocuments: (state, action: PayloadAction<Document[]>) => {
			state.documents = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			api.endpoints.getDocumentsInGroup.matchFulfilled,
			(state, action) => {
				console.log("action.payload", action.payload);
				state.documents = action.payload;
			}
		);
	},
});

export default documentsSlice.reducer;

export const { setDocuments } = documentsSlice.actions;

export const selectDocuments = (state: RootState) => state.documents.documents;
