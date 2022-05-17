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
exports.initiatePayment = void 0;
const product_1 = require("@models/product");
const joi_1 = __importDefault(require("joi"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: "2020-08-27",
});
const initiatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validate(req.body);
        if (error)
            return res
                .status(400)
                .json({ error: { message: error.details[0].message } });
        const line_items = Promise.all(req.body.items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield product_1.Product.findById(item.productId);
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
        })));
        const images = Promise.all(req.body.items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield product_1.Product.findById(item.productId);
            return product.image;
        })));
        const session = yield stripe.checkout.sessions.create({
            line_items: yield line_items,
            mode: "payment",
            payment_method_types: ["card"],
            shipping_address_collection: {
                allowed_countries: ["GB", "US", "CA", "NG"],
            },
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
            client_reference_id: req.user._id,
            metadata: {
                images: JSON.stringify(yield images),
            },
        });
        res.status(200).json({ id: session.id, url: session.url });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: { message: err.message } });
    }
});
exports.initiatePayment = initiatePayment;
function validate(data) {
    const schema = joi_1.default.object({
        items: joi_1.default.array().items({
            productId: joi_1.default.string().min(10).max(255).required(),
            quantity: joi_1.default.number().min(0).required(),
        }),
    });
    return schema.validate(data);
}
