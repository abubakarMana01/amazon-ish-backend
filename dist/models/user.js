"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateUser = exports.User = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const cart_1 = require("./cart");
const orders_1 = require("./orders");
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
    cart: {
        type: [cart_1.cartSchema],
        default: [],
    },
    orders: {
        type: [orders_1.ordersSchema],
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
userSchema.methods.generateAuthToken = function () {
    const token = jsonwebtoken_1.default.sign({ _id: this._id }, `${process.env.jwtSecret}`);
    return token;
};
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
const validateUser = (user) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).max(255).trim().required(),
        email: joi_1.default.string().min(3).max(255).trim().email().required(),
        password: joi_1.default.string().min(6).max(255).required(),
        isAdmin: joi_1.default.boolean(),
    });
    return schema.validate(user);
};
exports.validateUser = validateUser;
const validateLogin = (user) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(3).max(255).trim().email().required(),
        password: joi_1.default.string().min(6).max(255).required(),
    });
    return schema.validate(user);
};
exports.validateLogin = validateLogin;
