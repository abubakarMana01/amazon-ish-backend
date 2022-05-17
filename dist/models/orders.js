"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersSchema = exports.validate = exports.Order = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    orderId: {
        type: String,
        required: true,
        min: 10,
    },
    paymentMethod: {
        type: String,
        enum: ["card", "alipay"],
        lowercase: true,
    },
    products: [],
    total_amount: {
        type: String,
        required: true,
        min: 0,
    },
    images: [
        {
            type: String,
            required: true,
        },
    ],
});
exports.ordersSchema = schema;
const Order = mongoose_1.default.model("Order", schema);
exports.Order = Order;
const validate = (order) => {
    const schema = joi_1.default.object({
        paymentMethod: joi_1.default.string().required(),
        products: joi_1.default.array().required(),
        total_amount: joi_1.default.string().min(0).required(),
        orderId: joi_1.default.string().min(10).required(),
        images: joi_1.default.array().required(),
    });
    return schema.validate(order);
};
exports.validate = validate;
