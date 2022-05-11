import { validate } from "@models/cart";
import { Product } from "@models/product";
import { User } from "@models/user";
import { Request, Response } from "express";

export const getCart = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.user._id).populate("cart.product");
		res.status(200).json(user.cart);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};

export const getSingleItem = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.user._id);

		const inCart = user.cart.find(
			(item: { product: string }) => item.product.toString() === req.params.id
		);
		if (!inCart) {
			return res.status(200).json({ message: "Not found" });
		} else {
			return res.status(200).json({ message: "Found" });
		}
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};

export const addToCart = async (req: Request, res: Response) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: { message: error.details[0].message } });

		// Check if product exists
		const item = await Product.findOne({ _id: req.body._id });
		if (!item)
			return res.status(404).json({ error: { message: "Item not found" } });

		const user = await User.findOne({ _id: req.user._id });
		const itemExistInCart = user.cart.find(
			(item: { product: string }) => item.product.toString() === req.body._id
		);
		if (itemExistInCart) {
			return res
				.status(400)
				.json({ error: { message: "Product already in cart" } });
		}

		user.cart.push({
			product: req.body._id,
			quantity: req.body.quantity,
		});
		await user.save();
		res.status(201).json(user.cart);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
	try {
		const productExists = await Product.findOne({ _id: req.params.id });
		if (!productExists)
			return res.status(404).json({ error: { message: "Item not found" } });

		const user = await User.findById(req.user._id);
		const inCart = user.cart.find(
			(item: { product: string }) => item.product.toString() === req.params.id
		);

		if (!inCart)
			return res
				.status(404)
				.json({ error: { message: "Product not in cart" } });

		user.cart.id(inCart._id.toString()).remove();
		const saved = await user.save();
		res.status(200).json(saved);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};
