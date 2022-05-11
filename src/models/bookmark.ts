import mongoose from "mongoose";
import Joi from "joi";

const schema = new mongoose.Schema({
	bookmark: {
		ref: "Product",
		type: mongoose.Schema.Types.ObjectId,
	},
	userId: mongoose.Schema.Types.ObjectId,
});

const Bookmark = mongoose.model("Bookmark", schema);

const validate = (product: unknown) => {
	const schema = Joi.object({
		_id: Joi.string().required(),
	});

	return schema.validate(product);
};

export { Bookmark, validate };
