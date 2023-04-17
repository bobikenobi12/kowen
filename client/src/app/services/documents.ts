import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { type getRolesInGroupResponse, type Ids } from "./groups";

export interface getDocuments {
	file: File;
	groupId: number;
	folderId: number;
	roleIds: number[];
}

export interface downloadDocument {
	groupId: number;
	folderId: number;
	documentId: number;
	version: number;
}

export interface saveNewDocumentVersion {
	file: File;
	groupId: number;
	documentId: number;
}

export interface DocumentVersion {
	id: number;
	version: number;
	documentContent: Blob;
	document: Document;
}
export interface Document {
	id: number;
	name: string;
	documentExtension: string;
	versions: DocumentVersion[];
	roles: getRolesInGroupResponse[];
}

export const api = createApi({
	reducerPath: "documentsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["Documents"],
	endpoints: builder => ({
		getDocumentsInGroup: builder.query<Document[], Ids>({
			query: ({ groupId, folderId }) => ({
				url: `group/getDocumentsInGroup/${groupId}/${folderId}`,
				method: "GET",
			}),
			providesTags: ["Documents"],
		}),
		saveDocument: builder.mutation<void, FormData>({
			query: formData => ({
				url: "document/save",
				method: "POST",
				body: formData,
			}),
			invalidatesTags: ["Documents"],
		}),
		downloadDocument: builder.mutation<any, downloadDocument>({
			query: ({ groupId, folderId, documentId, version }) => ({
				url: `document/download/${groupId}/${folderId}/${documentId}/${version}`,
				method: "GET",
			}),
		}),

		saveNewDocumentVersion: builder.mutation<void, FormData>({
			query: formData => ({
				url: "document/saveNewVersion",
				method: "POST",
				body: formData,
			}),
			invalidatesTags: ["Documents"],
		}),
	}),
});

export const {
	useGetDocumentsInGroupQuery,
	useSaveDocumentMutation,
	useDownloadDocumentMutation,
	useSaveNewDocumentVersionMutation,
} = api;
