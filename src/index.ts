import "module-alias/register";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "@routes/user";
import productsRoute from "@routes/products";
import cartRoutes from "@routes/cart";
import bookmarksRoutes from "@routes/bookmarks";
import ordersRoutes from "@routes/orders";
import { config } from "dotenv";
const app = express();
config();

mongoose
	.connect(`${process.env.MONGODB_URI}`)
	.then(() => {
		console.log("Connected to MongoDB...");
	})
	.catch((err) => console.log("Could not connect to MongoDB...", err));

app.use(express.json());
app.use(cors());

// Routes
app.use("/user", userRoute);
app.use("/products", productsRoute);
app.use("/cart", cartRoutes);
app.use("/bookmarks", bookmarksRoutes);
app.use("/orders", ordersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
