"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token)
        return res
            .status(401)
            .json({ error: { message: "Access denied. No token provided." } });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, `${process.env.jwtSecret}`);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log(err.message);
        return res
            .status(400)
            .json({ error: { message: "Access denied. Invalid token." } });
    }
}
exports.default = default_1;
