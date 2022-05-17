import "module-alias/register";
import express, { Request } from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
const app = express();
config();

// Connect to mongoDb
import dbConnect from "@startup/dbConnect";
dbConnect();

// app.use(express.json());
app.use(
	express.json({
		verify: (req: Request, res, buf) => {
			req.rawBody = buf;
		},
	})
);
app.use(cors());
app.use(morgan("dev"));

// Routes
import routes from "@startup/routes";
routes(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
