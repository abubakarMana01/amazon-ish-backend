import { Router } from "express";
import {
	addToCart,
	deleteItemFromCart,
	getCart,
	getSingleItem,
} from "@controllers/cart";
import auth from "@middlewares/auth";
const router = Router();

// @desc Get all items in users cart
// @route GET /cart
router.get("/", auth, getCart);

// @desc Check if an item exists in cart
// @route GET /cart/:id
router.get("/:id", auth, getSingleItem);

// @desc Add an item to users cart
// @route POST /cart
router.post("/", auth, addToCart);

// @desc Delete an item from cart
// @route DELETE /cart/:id
router.delete("/:id", auth, deleteItemFromCart);

export default router;
