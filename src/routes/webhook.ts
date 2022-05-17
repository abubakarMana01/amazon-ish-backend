/* eslint-disable indent */
import { User } from "@models/user";
import { Router } from "express";
import Stripe from "stripe";
const router = Router();

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
	apiVersion: "2020-08-27",
});

const endpointSecret = `${process.env.STRIPE_WEBHOOK_SECRET_KEY}`;

router.post("/", async (request, response) => {
	const payload = request.rawBody;
	const sig: any = request.headers["stripe-signature"];

	let event;

	try {
		event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
	} catch (err: any) {
		console.log(`❌ Webhook Error: ${err.message}`);
		return response.status(400).send(`Webhook Error: ${err.message}`);
	}

	switch (event.type) {
		case "checkout.session.completed": {
			const session: any = event.data.object;
			// Save an order in your database, marked as 'paid payment'
			await fulfillOrder(session);
			break;
		}
	}

	response.status(200);
});

export default router;

async function fulfillOrder(session: any) {
	try {
		const user = await User.findById(session.client_reference_id);

		const line_items = await stripe.checkout.sessions.listLineItems(
			session.id,
			{
				limit: 100,
			}
		);

		// Retrieve image and save to DB
		user.orders.push({
			paymentMethod: "card",
			total_amount: session.amount_total,
			products: line_items.data,
			images: JSON.parse(session.metadata.images),
			orderId: session.id,
		});

		user.cart = [];
		return await user.save();
	} catch (err: any) {
		console.log(err.message);
	}
}

// router.post(
// 	"/",
// 	bodyParser.raw({ type: "application/json" }),
// 	async (req: Request, res: Response) => {
// 		const event = req.body;

// 		// Handle the event
// 		if (event.type === "checkout.session.completed") {
// 			const session = event.data.object;
// 			// console.log("Checkout completed", session);

// 			// Add order to DB
// 			await fulfillOrder(session);
// 		}
// 		// Return a 200 response to acknowledge receipt of the event
// 		res.json({ received: true });
// 	}
// );

// switch (event.type) {
// 	case "checkout.session.completed": {
// 		const session: any = event.data.object;
// 		// Save an order in your database, marked as 'awaiting payment'

// 		// Check if the order is paid (for example, from a card payment)
// 		//
// 		// A delayed notification payment will have an `unpaid` status, as
// 		// you're still waiting for funds to be transferred from the customer's
// 		// account.
// 		if (session.payment_status === "paid") {
// 			fulfillOrder(session);
// 			console.log("Fulfilled");
// 		}

// 		break;
// }
