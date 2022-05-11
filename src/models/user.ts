import Joi from "joi";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { cartSchema } from "./cart";
import { ordersSchema } from "./orders";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 255,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 255,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			maxlength: 1024,
		},
		cart: {
			type: [cartSchema],
			default: [],
		},
		orders: {
			type: [ordersSchema],
			default: [],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, `${process.env.jwtSecret}`);
	return token;
};

const User = mongoose.model("User", userSchema);

const validateUser = (user: unknown) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(255).trim().required(),
		email: Joi.string().min(3).max(255).trim().email().required(),
		password: Joi.string().min(6).max(255).required(),
		isAdmin: Joi.boolean(),
	});

	return schema.validate(user);
};

const validateLogin = (user: unknown) => {
	const schema = Joi.object({
		email: Joi.string().min(3).max(255).trim().email().required(),
		password: Joi.string().min(6).max(255).required(),
	});

	return schema.validate(user);
};

export { User, validateUser, validateLogin };
