import { rest } from "msw";
import { nanoid } from "@reduxjs/toolkit";

const token = nanoid();

export const handlers = [
	rest.get("/protected", (req, res, ctx) => {
		const headers = req.headers.all();
		if (headers.authorization !== `Bearer ${token}`) {
			return res(
				ctx.json({
					message: "You are not authorized to access this resource.",
				}),
				ctx.status(401)
			);
		}
		return res(
			ctx.json({
				message:
					"This is a protected resource. You are authorized to access it.",
			})
		);
	}),
	rest.post("/login", (req, res, ctx) => {
		return res(
			ctx.delay(400),
			ctx.json({
				user: {
					first_name: "Test",
					last_name: "User",
				},
				token,
			})
		);
	}),
];
