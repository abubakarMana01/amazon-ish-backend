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
const joi_1 = __importDefault(require("joi"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default("sk_test_51Kx0zsGyK2R9R1TNoAzx8kCCEUEFm77AutEvUG8WPWe1FsdX7St7b3J9hNxjW6CdO8mY937g3gzMPHkSdrVlGtOn003o942m1W", {
    apiVersion: "2020-08-27",
});
const initiatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validate(req.body);
        if (error)
            return res
                .status(400)
                .json({ error: { message: error.details[0].message } });
        const session = yield stripe.checkout.sessions.create({
            line_items: req.body.line_items,
            mode: "payment",
            payment_method_types: ["card", "alipay", "bancontact", "giropay"],
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        });
        res.status(200).json({ id: session.id });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
});
exports.initiatePayment = initiatePayment;
function validate(data) {
    const schema = joi_1.default.object({
        line_items: joi_1.default.array()
            .items({
            quantity: joi_1.default.number().min(0).required(),
            price_data: joi_1.default.object({
                currency: joi_1.default.string().min(3).max(3).required(),
                product_data: {
                    name: joi_1.default.string().min(3).required(),
                },
                unit_amount: joi_1.default.number().min(0).required(),
            }).required(),
        })
            .required(),
    });
    return schema.validate(data);
}
