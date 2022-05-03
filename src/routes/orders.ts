import { addOrder, getOrders } from "@controllers/orders";
import { Router } from "express";
const router = Router();

router.get("/", getOrders);

router.post("/", addOrder);

export default router;
