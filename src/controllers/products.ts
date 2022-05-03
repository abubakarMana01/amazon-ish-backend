import { Product, validate } from "@models/product";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};

export const addProduct = async (req: Request, res: Response) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: { message: error.details[0].message } });

		const productExists = await Product.findOne({ id: req.body.id });
		if (productExists)
			return res
				.status(400)
				.json({ error: { message: "Product already exists" } });

		const product = new Product({
			id: req.body.id,
			title: req.body.title,
			price: req.body.price,
			description: req.body.description,
			category: req.body.category,
			image: req.body.image,
		});
		await product.save();
		res.json(product);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};

export const getSingleProduct = async (req: Request, res: Response) => {
	try {
		const product = await Product.findById(req.params._id);
		res.status(200).json(product);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};
