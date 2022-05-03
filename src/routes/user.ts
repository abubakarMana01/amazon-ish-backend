import { Request, Response, Router } from "express";
const app = Router();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

export default app;
