import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../app/services/folders";
import { RootState } from "../../app/store";
import { type Folder } from "../../app/services/folders";

export interface FolderState {
	folders: {
		folders: Folder[];
	};
}

const initialState: FolderState = {
	folders: {
		folders: [],
	},
};

export const folderSlice = createSlice({
	name: "folders",
	initialState,
	reducers: {},
	// extraReducers: builder => {
	// builder.addMatcher(
	// 	api.endpoints.getFoldersInGroup.matchFulfilled,
	// 	(state, action) => {
	// 		state.folders.folders = action.payload as Folder[];
	// 	}
	// );
	// builder.addMatcher(
	// 	api.endpoints.saveFolderToGroup.matchFulfilled,
	// 	(state, action) => {
	// 		state.folders.folders.push(action.payload as Folder);
	// 	}
	// );
	// builder.addMatcher(
	// 	api.endpoints.changeFolderName.matchFulfilled,
	// 	(state, action) => {
	// 		const folder = action.payload as Folder;
	// 		const index = state.folders.folders.findIndex(
	// 			f => f.id === folder.id
	// 		);
	// 		state.folders.folders[index] = folder;
	// 	}
	// );
	// builder.addMatcher(
	// 	api.endpoints.deleteFolderFromGroup.matchFulfilled,
	// 	(state, action) => {
	// 		console.log("before delete", state.folders.folders);
	// 		const folder = action.payload as Folder;
	// 		const index = state.folders.folders.findIndex(
	// 			f => f.id === folder.id
	// 		);
	// 		state.folders.folders.splice(index, 1);
	// 		console.log("fater delete", state.folders.folders);
	// 	}
	// );
	// },
});

export const selectFolders = (state: RootState) => state.folders.folders;
export const selectFolderById = (state: RootState, folderId: number) =>
	state.folders.folders.folders.find(folder => folder.id === folderId);

export default folderSlice.reducer;
