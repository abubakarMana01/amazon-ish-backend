"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.Order = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
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
                    type: mongoose_1.default.Schema.Types.ObjectId,
                },
                quantity: { type: Number, required: true },
            },
        ],
    },
});
const Order = mongoose_1.default.model("Order", schema);
exports.Order = Order;
const validate = (order) => {
    const schema = joi_1.default.object({
        paymentMethod: joi_1.default.string().required(),
        products: joi_1.default.array().required(),
    });
    return schema.validate(order);
};
exports.validate = validate;
