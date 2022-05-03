"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("@controllers/orders");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", orders_1.getOrders);
router.post("/", orders_1.addOrder);
exports.default = router;
