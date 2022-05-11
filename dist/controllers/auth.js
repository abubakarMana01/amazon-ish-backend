"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.getUserInfo = exports.getUsers = void 0;
const user_1 = require("@models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.getUsers = getUsers;
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findById(req.user._id).select("-_id -password");
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.getUserInfo = getUserInfo;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, user_1.validateUser)(req.body);
        if (error)
            return res
                .status(400)
                .json({ error: { message: error.details[0].message } });
        // Check if user already exists before registering
        const userExists = yield user_1.User.findOne({ email: req.body.email });
        if (userExists)
            return res
                .status(400)
                .json({ error: { message: "User already exists" } });
        // Hash password
        const salt = yield bcryptjs_1.default.genSalt();
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
        // Create new user
        const user = new user_1.User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin,
        });
        yield user.save();
        const token = user.generateAuthToken();
        res.header("x-auth-token", token).status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, user_1.validateLogin)(req.body);
        if (error)
            return res
                .status(400)
                .json({ error: { message: error.details[0].message } });
        const user = yield user_1.User.findOne({ email: req.body.email });
        if (!user)
            return res.status(404).json({ error: { message: "User not found" } });
        // Compare password with hashed
        const isValidPassword = yield bcryptjs_1.default.compare(req.body.password, user.password);
        if (!isValidPassword)
            return res.status(400).json({ error: { message: "Invalid password" } });
        const token = user.generateAuthToken();
        res
            .header("x-auth-token", token)
            .status(200)
            .json({ token, email: user.email });
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.loginUser = loginUser;
