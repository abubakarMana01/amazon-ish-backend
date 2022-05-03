"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = exports.validate = exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const schema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    price: {
        type: Number,
        min: 1,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        lowercase: true,
    },
    image: {
        type: String,
        required: true,
        min: 5,
    },
    rating: {
        rate: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        count: {
            type: Number,
            min: 0,
            default: 0,
        },
    },
});
exports.productSchema = schema;
const Product = mongoose_1.default.model("Product", schema);
exports.Product = Product;
const validate = (product) => {
    const schema = joi_1.default.object({
        id: joi_1.default.string().required(),
        title: joi_1.default.string().min(5).max(255).required(),
        price: joi_1.default.number().min(1).required(),
        description: joi_1.default.string().min(5).required(),
        category: joi_1.default.string().min(3).max(255).required(),
        image: joi_1.default.string().min(5).required(),
        rating: joi_1.default.object().keys({
            rate: joi_1.default.number().min(0).max(5).default(0),
            count: joi_1.default.number().min(0).default(0),
        }),
    });
    return schema.validate(product);
};
exports.validate = validate;
