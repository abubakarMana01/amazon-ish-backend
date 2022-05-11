import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function (req: Request, res: Response, next: NextFunction) {
	const token = req.header("x-auth-token");
	if (!token)
		return res
			.status(401)
			.json({ error: { message: "Access denied. No token provided." } });

	try {
		const decoded = jwt.verify(token, `${process.env.jwtSecret}`);
		req.user = decoded;
		next();
	} catch (err: any) {
		console.log(err.message);
		return res
			.status(400)
			.json({ error: { message: "Access denied. Invalid token." } });
	}
}
