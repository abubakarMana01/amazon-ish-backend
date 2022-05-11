import { Bookmark, validate } from "@models/bookmark";
import { Product } from "@models/product";
import { Request, Response } from "express";

export const getBookmarks = async (req: Request, res: Response) => {
	try {
		const bookmarks = await Bookmark.find({ userId: req.user._id }).populate(
			"bookmark"
		);
		res.status(200).json(bookmarks);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};

export const addBookmark = async (req: Request, res: Response) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: { message: error.details[0].message } });

		// Check if product exists
		const product = await Product.findOne({ _id: req.body._id });
		if (!product)
			return res.status(404).json({ error: { message: "Product not found" } });

		// Check if bookmark already exists
		const bookmarkExists = await Bookmark.findOne({
			bookmark: { _id: req.body._id },
			userId: req.user._id,
		});
		if (bookmarkExists)
			return res
				.status(400)
				.json({ error: { message: "Item already in bookmarks" } });

		//Create new bookmark
		const bookmark = new Bookmark({
			bookmark: req.body._id,
			userId: req.user._id,
		});

		await bookmark.save();
		res.status(201).json(bookmark);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};

export const deleteItemFromBookmarks = async (req: Request, res: Response) => {
	try {
		const productExists = await Product.findOne({ _id: req.params._id });
		if (!productExists)
			return res.status(404).json({ error: { message: "Item not found" } });

		const item = await Bookmark.deleteOne({
			bookmark: { _id: req.params._id },
		});

		res.status(200).json(item);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};
