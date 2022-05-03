import {
	addProduct,
	getProducts,
	getSingleProduct,
} from "@controllers/products";
import { Router } from "express";
const router = Router();

router.get("/", getProducts);

router.get("/:_id", getSingleProduct);

router.post("/", addProduct);

export default router;
