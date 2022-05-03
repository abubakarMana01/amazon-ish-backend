import { Order, validate } from "@models/orders";
import { Request, Response } from "express";

export const getOrders = async (req: Request, res: Response) => {
	try {
		const orders = await Order.find()
			.populate("products.product")
			.select("-products._id");
		res.status(200).json(orders);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};

export const addOrder = async (req: Request, res: Response) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: { message: error.details[0].message } });

		const order = new Order({
			paymentMethod: req.body.paymentMethod,
			products: req.body.products,
		});

		await order.save();
		res.status(201).json(order);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};
