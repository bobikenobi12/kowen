import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../app/services/folders";
import { RootState } from "../../app/store";
import { type Folder } from "../../app/services/folders";

export interface FolderState {
	folders: Folder[];
}

const initialState: FolderState = {
	folders: [],
};

export const folderSlice = createSlice({
	name: "folders",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addMatcher(
			api.endpoints.getFoldersInGroup.matchFulfilled,
			(state, action) => {
				state.folders = action.payload as Folder[];
			}
		);
	},
});

export const selectFolders = (state: RootState) => state.folders;
export const selectFolderById = (state: RootState, folderId: number) =>
	state.folders.folders.find(folder => folder.id === folderId);

export default folderSlice.reducer;
