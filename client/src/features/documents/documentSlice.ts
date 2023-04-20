import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../app/services/documents";
import { RootState } from "../../app/store";
import { Document } from "../../app/services/documents";

interface DocumentsState {
	documents: Document[];
	filteredDocuments: Document[];
}

const initialState: DocumentsState = {
	documents: [],
	filteredDocuments: [],
};

export const documentsSlice = createSlice({
	name: "documents",
	initialState,
	reducers: {
		filterDocuments: (state, action: PayloadAction<string>) => {
			state.filteredDocuments = state.documents.filter(document =>
				document.name
					.toLowerCase()
					.includes(action.payload.toLowerCase())
			);
		},
	},
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

export const { filterDocuments } = documentsSlice.actions;

export const selectDocuments = (state: RootState) => state.documents.documents;
export const selectFilteredDocuments = (state: RootState) =>
	state.documents.filteredDocuments;
