import { Express } from "express";
import authRoute from "@routes/auth";
import productsRoute from "@routes/products";
import cartRoutes from "@routes/cart";
import ordersRoutes from "@routes/orders";
import bookmarksRoutes from "@routes/bookmarks";
import paymentRoutes from "@routes/payment";
import webhookRoute from "@routes/webhook";

export default function (app: Express) {
	app.use("/auth", authRoute);
	app.use("/products", productsRoute);
	app.use("/cart", cartRoutes);
	app.use("/bookmarks", bookmarksRoutes);
	app.use("/orders", ordersRoutes);
	app.use("/pay", paymentRoutes);
	app.use("/webhook", webhookRoute);
}
