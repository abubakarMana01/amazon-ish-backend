import { Router } from "express";
import {
	addToCart,
	deleteItemFromCart,
	getCart,
	getSingleItem,
} from "@controllers/cart";
const router = Router();

router.get("/", getCart);

router.get("/:id", getSingleItem);

router.post("/", addToCart);

router.delete("/:_id", deleteItemFromCart);

export default router;
