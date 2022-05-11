import { Router } from "express";
import {
	registerUser,
	getUsers,
	loginUser,
	getUserInfo,
} from "@controllers/auth";
import auth from "@middlewares/auth";

const router = Router();

// @desc Get all users
// @route GET /auth/users
router.get("/users", getUsers);

// @desc Get logged in user information
// @route GET /auth/me
router.get("/me", auth, getUserInfo);

// @desc Register user
// @route POST /auth/register
router.post("/register", registerUser);

// @desc Log user in
// @route POST /auth/login
router.post("/login", loginUser);

export default router;
