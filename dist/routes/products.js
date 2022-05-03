"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("@controllers/products");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", products_1.getProducts);
router.get("/:_id", products_1.getSingleProduct);
router.post("/", products_1.addProduct);
exports.default = router;
