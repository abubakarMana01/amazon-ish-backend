import mongoose from "mongoose";

export default function () {
	mongoose
		.connect(`${process.env.MONGODB_URI}`)
		.then(() => {
			console.log("Connected to MongoDB...");
		})
		.catch((err: any) => console.log("Could not connect to MongoDB...", err));
}
