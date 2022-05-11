import { initiatePayment } from "@controllers/payment";
import { Router } from "express";
const router = Router();

router.post("/", initiatePayment);

export default router;
