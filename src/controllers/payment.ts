import { Request, Response } from "express";
import Joi from "joi";
import Stripe from "stripe";

const stripe = new Stripe(
	"sk_test_51Kx0zsGyK2R9R1TNoAzx8kCCEUEFm77AutEvUG8WPWe1FsdX7St7b3J9hNxjW6CdO8mY937g3gzMPHkSdrVlGtOn003o942m1W",
	{
		apiVersion: "2020-08-27",
	}
);

export const initiatePayment = async (req: Request, res: Response) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: { message: error.details[0].message } });

		const session = await stripe.checkout.sessions.create({
			line_items: req.body.line_items,
			mode: "payment",
			payment_method_types: ["card", "alipay", "bancontact", "giropay"],
			success_url: `${process.env.CLIENT_URL}/success`,
			cancel_url: `${process.env.CLIENT_URL}/cart`,
		});

		res.status(200).json({ id: session.id });
	} catch (err: any) {
		console.log(err.message);
		res.status(400).json({ message: err.message });
	}
};

function validate(data: any) {
	const schema = Joi.object({
		line_items: Joi.array()
			.items({
				quantity: Joi.number().min(0).required(),
				price_data: Joi.object({
					currency: Joi.string().min(3).max(3).required(),
					product_data: {
						name: Joi.string().min(3).required(),
					},
					unit_amount: Joi.number().min(0).required(),
				}).required(),
			})
			.required(),
	});

	return schema.validate(data);
}
