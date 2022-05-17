"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payment_1 = require("@controllers/payment");
const auth_1 = __importDefault(require("@middlewares/auth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
// @desc - Initiate payment
// @route - POST /pay/create-checkout-session
router.post("/create-checkout-session", auth_1.default, payment_1.initiatePayment);
exports.default = router;
