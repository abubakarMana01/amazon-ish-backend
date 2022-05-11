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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemFromCart = exports.addToCart = exports.getSingleItem = exports.getCart = void 0;
const cart_1 = require("@models/cart");
const product_1 = require("@models/product");
const user_1 = require("@models/user");
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findById(req.user._id).populate("cart.product");
        res.status(200).json(user.cart);
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.getCart = getCart;
const getSingleItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findById(req.user._id);
        const inCart = user.cart.find((item) => item.product.toString() === req.params.id);
        if (!inCart) {
            return res.status(200).json({ message: "Not found" });
        }
        else {
            return res.status(200).json({ message: "Found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.getSingleItem = getSingleItem;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, cart_1.validate)(req.body);
        if (error)
            return res
                .status(400)
                .json({ error: { message: error.details[0].message } });
        // Check if product exists
        const item = yield product_1.Product.findOne({ _id: req.body._id });
        if (!item)
            return res.status(404).json({ error: { message: "Item not found" } });
        const user = yield user_1.User.findOne({ _id: req.user._id });
        const itemExistInCart = user.cart.find((item) => item.product.toString() === req.body._id);
        if (itemExistInCart) {
            return res
                .status(400)
                .json({ error: { message: "Product already in cart" } });
        }
        user.cart.push({
            product: req.body._id,
            quantity: req.body.quantity,
        });
        yield user.save();
        res.status(201).json(user.cart);
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.addToCart = addToCart;
const deleteItemFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productExists = yield product_1.Product.findOne({ _id: req.params.id });
        if (!productExists)
            return res.status(404).json({ error: { message: "Item not found" } });
        const user = yield user_1.User.findById(req.user._id);
        const inCart = user.cart.find((item) => item.product.toString() === req.params.id);
        if (!inCart)
            return res
                .status(404)
                .json({ error: { message: "Product not in cart" } });
        user.cart.id(inCart._id.toString()).remove();
        const saved = yield user.save();
        res.status(200).json(saved);
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.deleteItemFromCart = deleteItemFromCart;
