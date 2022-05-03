"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("@routes/user"));
const products_1 = __importDefault(require("@routes/products"));
const cart_1 = __importDefault(require("@routes/cart"));
const bookmarks_1 = __importDefault(require("@routes/bookmarks"));
const orders_1 = __importDefault(require("@routes/orders"));
const dotenv_1 = require("dotenv");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
mongoose_1.default
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => {
    console.log("Connected to MongoDB...");
})
    .catch((err) => console.log("Could not connect to MongoDB...", err));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/user", user_1.default);
app.use("/products", products_1.default);
app.use("/cart", cart_1.default);
app.use("/bookmarks", bookmarks_1.default);
app.use("/orders", orders_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
