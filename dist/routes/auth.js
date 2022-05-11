"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("@controllers/auth");
const auth_2 = __importDefault(require("@middlewares/auth"));
const router = (0, express_1.Router)();
// @desc Get all users
// @route GET /auth/users
router.get("/users", auth_1.getUsers);
// @desc Get logged in user information
// @route GET /auth/me
router.get("/me", auth_2.default, auth_1.getUserInfo);
// @desc Register user
// @route POST /auth/register
router.post("/register", auth_1.registerUser);
// @desc Log user in
// @route POST /auth/login
router.post("/login", auth_1.loginUser);
exports.default = router;
