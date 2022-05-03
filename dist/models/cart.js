"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSchema = exports.validate = exports.CartItem = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    product: {
        ref: "Product",
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    quantity: {
        type: Number,
        default: 1,
    },
});
exports.cartSchema = schema;
const CartItem = mongoose_1.default.model("CartItem", schema);
exports.CartItem = CartItem;
const validate = (item) => {
    const schema = joi_1.default.object({
        _id: joi_1.default.string().required(),
        quantity: joi_1.default.number().min(1).max(255),
    });
    return schema.validate(item);
};
exports.validate = validate;
