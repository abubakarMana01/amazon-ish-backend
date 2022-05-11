import { addOrder, getOrders } from "@controllers/orders";
import auth from "@middlewares/auth";
import { Router } from "express";
const router = Router();

// @desc Get all orders
// @route GET /orders
router.get("/", auth, getOrders);

// @desc Add order
// @route POST /orders
router.post("/", auth, addOrder);

export default router;
