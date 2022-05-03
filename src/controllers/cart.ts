import { CartItem, validate } from "@models/cart";
import { Product } from "@models/product";
import { Request, Response } from "express";

export const getCart = async (req: Request, res: Response) => {
	try {
		const cart = await CartItem.find().populate("product");
		res.status(200).json(cart);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};

export const getSingleItem = async (req: Request, res: Response) => {
	try {
		const productInCart = await CartItem.findOne({
			product: { _id: req.params.id },
		}).populate("product");
		if (!productInCart) {
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

		// Check if item already in cart
		const itemAlreadyInCart = await CartItem.findOne({
			product: { _id: req.body._id },
		});
		if (itemAlreadyInCart) {
			itemAlreadyInCart.quantity += 1;
			await itemAlreadyInCart.save();
			return res.status(200).json(itemAlreadyInCart);
		}

		// Create new item
		const cartItem = new CartItem({
			product: req.body._id,
			quantity: req.body.quantity,
		});
		await cartItem.save();
		res.status(201).json(cartItem);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
	try {
		const productExists = await Product.findOne({ _id: req.params._id });
		if (!productExists)
			return res.status(404).json({ error: { message: "Item not found" } });

		const item = await CartItem.deleteOne({ product: { _id: req.params._id } });

		res.status(200).json(item);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};
