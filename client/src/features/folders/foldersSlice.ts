import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../app/services/folders";
import { RootState } from "../../app/store";
import { type Folder } from "../../app/services/folders";

export interface FolderState {
	folders: Folder[];
	currentFolder: Folder | null;
}

const initialState: FolderState = {
	folders: [],
	currentFolder: null,
};

export const folderSlice = createSlice({
	name: "folders",
	initialState,
	reducers: {
		setCurrentFolder(state, action: PayloadAction<Folder>) {
			state.currentFolder = action.payload;
			localStorage.setItem(
				"currentFolder",
				JSON.stringify(action.payload)
			);
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			api.endpoints.getFoldersInGroup.matchFulfilled,
			(state, action) => {
				state.folders = action.payload as Folder[];
			}
		);
		builder.addMatcher(
			api.endpoints.getFolderInGroup.matchFulfilled,
			(state, action) => {
				state.currentFolder = action.payload as Folder;
				localStorage.setItem(
					"currentFolder",
					JSON.stringify(action.payload)
				);
			}
		);
	},
});

export const selectFolders = (state: RootState) => state.folders;
export const selectCurrentFolder = (state: RootState) =>
	state.folders.currentFolder;
export const selectFolderById = (state: RootState, folderId: number) =>
	state.folders.folders.find(folder => folder.id === folderId);

export default folderSlice.reducer;
