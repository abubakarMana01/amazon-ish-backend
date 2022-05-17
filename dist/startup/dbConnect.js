"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function default_1() {
    mongoose_1.default
        .connect(`${process.env.MONGODB_URI}`)
        .then(() => {
        console.log("Connected to MongoDB...");
    })
        .catch((err) => console.log("Could not connect to MongoDB...", err));
}
exports.default = default_1;
