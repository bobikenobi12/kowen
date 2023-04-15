import { useAppDispatch } from "./store";
import { api } from "../app/services/groups";

export interface PrefetchOptions {
	forceRefetch?: boolean;
	ifOlderThan?: number;
	ifStale?: boolean;
	ifUninitialized?: boolean;
	skip?: boolean;
	subscribe?: boolean;
}
import { useEffect } from "react";

type EndpointNames = keyof typeof api.endpoints;

export function usePrefetchImmediately<T extends EndpointNames>(
	endpoint: T,
	arg: Parameters<(typeof api.endpoints)[T]["initiate"]>[0],
	options: PrefetchOptions = {
		forceRefetch: false,
		ifOlderThan: 0,
		ifStale: false,
		ifUninitialized: false,
		skip: false,
		subscribe: false,
	}
) {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(api.util.prefetch(endpoint as any, arg as any, options));
	}, []);
}
