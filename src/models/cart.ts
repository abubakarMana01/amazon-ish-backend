import Joi from "joi";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
	product: {
		ref: "Product",
		type: mongoose.Schema.Types.ObjectId,
	},
	quantity: {
		type: Number,
		default: 1,
	},
});

const CartItem = mongoose.model("CartItem", schema);

const validate = (item: unknown) => {
	const schema = Joi.object({
		_id: Joi.string().required(),
		quantity: Joi.number().min(1).max(255),
	});

	return schema.validate(item);
};

export { CartItem, validate, schema as cartSchema };
