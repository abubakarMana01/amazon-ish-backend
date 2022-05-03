import Joi from "joi";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
	paymentMethod: {
		type: String,
		enum: ["card"],
		lowercase: true,
	},
	products: {
		type: [
			{
				product: {
					ref: "Product",
					type: mongoose.Schema.Types.ObjectId,
				},
				quantity: { type: Number, required: true },
			},
		],
	},
});

const Order = mongoose.model("Order", schema);

const validate = (order: unknown) => {
	const schema = Joi.object({
		paymentMethod: Joi.string().required(),
		products: Joi.array().required(),
	});

	return schema.validate(order);
};

export { Order, validate };
