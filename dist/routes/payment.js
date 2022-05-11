"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payment_1 = require("@controllers/payment");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", payment_1.initiatePayment);
exports.default = router;
