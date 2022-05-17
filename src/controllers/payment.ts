import { Product } from "@models/product";
import { Request, Response } from "express";
import Joi from "joi";
import Stripe from "stripe";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
	apiVersion: "2020-08-27",
});

export const initiatePayment = async (req: Request, res: Response) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: { message: error.details[0].message } });

		const line_items = Promise.all(
			req.body.items.map(async (item: any) => {
				const product = await Product.findById(item.productId);
				return {
					quantity: item.quantity,
					price_data: {
						unit_amount: product.price * 100,
						currency: "usd",
						product_data: {
							name: product.title,
							images: [product.image],
						},
					},
				};
			})
		);

		const images = Promise.all(
			req.body.items.map(async (item: any) => {
				const product = await Product.findById(item.productId);
				return product.image;
			})
		);

		const session = await stripe.checkout.sessions.create({
			line_items: await line_items,
			mode: "payment",
			payment_method_types: ["card"],
			shipping_address_collection: {
				allowed_countries: ["GB", "US", "CA", "NG"],
			},
			success_url: `${process.env.CLIENT_URL}/success`,
			cancel_url: `${process.env.CLIENT_URL}/cart`,
			client_reference_id: req.user._id,
			metadata: {
				images: JSON.stringify(await images),
			},
		});

		res.status(200).json({ id: session.id, url: session.url });
	} catch (err: any) {
		console.log(err.message);
		res.status(500).json({ error: { message: err.message } });
	}
};

function validate(data: unknown) {
	const schema = Joi.object({
		items: Joi.array().items({
			productId: Joi.string().min(10).max(255).required(),
			quantity: Joi.number().min(0).required(),
		}),
	});

	return schema.validate(data);
}
