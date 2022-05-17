import { initiatePayment } from "@controllers/payment";
import auth from "@middlewares/auth";
import { Router } from "express";
const router = Router();

// @desc - Initiate payment
// @route - POST /pay/create-checkout-session
router.post("/create-checkout-session", auth, initiatePayment);

export default router;
