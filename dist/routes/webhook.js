"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable indent */
const user_1 = require("@models/user");
const express_1 = require("express");
const stripe_1 = __importDefault(require("stripe"));
const router = (0, express_1.Router)();
const stripe = new stripe_1.default(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: "2020-08-27",
});
const endpointSecret = `${process.env.STRIPE_WEBHOOK_SECRET_KEY}`;
router.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = request.rawBody;
    const sig = request.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    }
    catch (err) {
        console.log(`❌ Webhook Error: ${err.message}`);
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            // Save an order in your database, marked as 'paid payment'
            yield fulfillOrder(session);
            break;
        }
    }
    response.status(200);
}));
exports.default = router;
function fulfillOrder(session) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.User.findById(session.client_reference_id);
            const line_items = yield stripe.checkout.sessions.listLineItems(session.id, {
                limit: 100,
            });
            // Retrieve image and save to DB
            user.orders.push({
                paymentMethod: "card",
                total_amount: session.amount_total,
                products: line_items.data,
                images: JSON.parse(session.metadata.images),
                orderId: session.id,
            });
            user.cart = [];
            return yield user.save();
        }
        catch (err) {
            console.log(err.message);
        }
    });
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
