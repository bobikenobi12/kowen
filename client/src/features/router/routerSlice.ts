import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface RouteState {
	route: string;
	path: string;
	params: { [key: string]: string };
}

const initialState: RouteState = {
	route: "",
	path: "",
	params: {},
};

export const slice = createSlice({
	name: "router",
	initialState,
	reducers: {
		setRoute: (state, action: PayloadAction<RouteState>) => {
			state.route = action.payload.route;
			state.path = action.payload.path;
			state.params = action.payload.params;
		},
	},
});

export const { setRoute } = slice.actions;

export default slice.reducer;
