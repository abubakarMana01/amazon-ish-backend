import mongoose from "mongoose";
import Joi from "joi";

const schema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
	},
	price: {
		type: Number,
		min: 1,
		required: true,
	},
	description: {
		type: String,
		required: true,
		minlength: 5,
	},
	category: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 255,
		lowercase: true,
	},
	image: {
		type: String,
		required: true,
		min: 5,
	},
	rating: {
		rate: {
			type: Number,
			min: 0,
			max: 5,
			default: 0,
		},
		count: {
			type: Number,
			min: 0,
			default: 0,
		},
	},
});

const Product = mongoose.model("Product", schema);

const validate = (product: unknown) => {
	const schema = Joi.object({
		id: Joi.string().required(),
		title: Joi.string().min(5).max(255).required(),
		price: Joi.number().min(1).required(),
		description: Joi.string().min(5).required(),
		category: Joi.string().min(3).max(255).required(),
		image: Joi.string().min(5).required(),
		rating: Joi.object().keys({
			rate: Joi.number().min(0).max(5).default(0),
			count: Joi.number().min(0).default(0),
		}),
	});

	return schema.validate(product);
};

export { Product, validate, schema as productSchema };
