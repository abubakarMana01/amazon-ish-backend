import Joi, { string } from "joi";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
	orderId: {
		type: String,
		required: true,
		min: 10,
	},
	paymentMethod: {
		type: String,
		enum: ["card", "alipay"],
		lowercase: true,
	},
	products: [],
	total_amount: {
		type: String,
		required: true,
		min: 0,
	},
	images: [
		{
			type: String,
			required: true,
		},
	],
});

const Order = mongoose.model("Order", schema);

const validate = (order: unknown) => {
	const schema = Joi.object({
		paymentMethod: Joi.string().required(),
		products: Joi.array().required(),
		total_amount: Joi.string().min(0).required(),
		orderId: Joi.string().min(10).required(),
		images: Joi.array().required(),
	});

	return schema.validate(order);
};

export { Order, validate, schema as ordersSchema };
