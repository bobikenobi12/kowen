export const asyncFunctionMiddleware =
	(store: any) => (next: any) => (action: any) => {
		if (typeof action === "function") {
			return action(store.dispatch, store.getState);
		}

		return next(action);
	};
