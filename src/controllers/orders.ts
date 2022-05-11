import { Order, validate } from "@models/orders";
import { User } from "@models/user";
import { Request, Response } from "express";

export const getOrders = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.user._id).populate(
			"orders.products.product"
		);

		res.status(200).json(user.orders);
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

		const user = await User.findById(req.user._id);
		user.orders.push(
			new Order({
				paymentMethod: req.body.paymentMethod,
				products: req.body.products,
			})
		);

		await user.save();
		res.status(201).json(user);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};
