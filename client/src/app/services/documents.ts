import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface getDocuments {
	file: File;
	groupId: number;
	folderId: number;
	roleIds: number[];
}

export interface downloadDocument {
	folderId: number;
	documentId: number;
	version: number;
}

export interface saveNewDocumentVersion {
	file: File;
	groupId: number;
	documentId: number;
}

export const api = createApi({
	reducerPath: "documentsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/document/",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: builder => ({
		saveDocument: builder.mutation<void, getDocuments>({
			query: ({ file, groupId, folderId, roleIds }) => ({
				url: "save",
				method: "POST",
				params: {
					file,
					groupId,
					folderId,
					roleIds,
				},
			}),
		}),
		downloadDocument: builder.mutation<void, downloadDocument>({
			query: ({ folderId, documentId, version }) => ({
				url: `download/${folderId}/${documentId}/${version}`,
				method: "GET",
			}),
		}),
		saveNewDocumentVersion: builder.mutation<void, saveNewDocumentVersion>({
			query: ({ file, groupId, documentId }) => ({
				url: "saveNewVersion",
				method: "POST",
				params: {
					file,
					groupId,
					documentId,
				},
			}),
		}),
	}),
});

export const {
	useSaveDocumentMutation,
	useDownloadDocumentMutation,
	useSaveNewDocumentVersionMutation,
} = api;
