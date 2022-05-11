"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("@controllers/orders");
const auth_1 = __importDefault(require("@middlewares/auth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
// @desc Get all orders
// @route GET /orders
router.get("/", auth_1.default, orders_1.getOrders);
// @desc Add order
// @route POST /orders
router.post("/", auth_1.default, orders_1.addOrder);
exports.default = router;
