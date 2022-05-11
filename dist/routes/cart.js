"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_1 = require("@controllers/cart");
const auth_1 = __importDefault(require("@middlewares/auth"));
const router = (0, express_1.Router)();
// @desc Get all items in users cart
// @route GET /cart
router.get("/", auth_1.default, cart_1.getCart);
// @desc Check if an item exists in cart
// @route GET /cart/:id
router.get("/:id", auth_1.default, cart_1.getSingleItem);
// @desc Add an item to users cart
// @route POST /cart
router.post("/", auth_1.default, cart_1.addToCart);
// @desc Delete an item from cart
// @route DELETE /cart/:id
router.delete("/:id", auth_1.default, cart_1.deleteItemFromCart);
exports.default = router;
