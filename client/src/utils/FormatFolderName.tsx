export const FormatFolderName = (folderName: string) => {
	if (folderName.length > 18) {
		return folderName.slice(0, 16) + "...";
	}
	return folderName;
};
