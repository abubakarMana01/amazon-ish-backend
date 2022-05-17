"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("@routes/auth"));
const products_1 = __importDefault(require("@routes/products"));
const cart_1 = __importDefault(require("@routes/cart"));
const orders_1 = __importDefault(require("@routes/orders"));
const bookmarks_1 = __importDefault(require("@routes/bookmarks"));
const payment_1 = __importDefault(require("@routes/payment"));
const webhook_1 = __importDefault(require("@routes/webhook"));
function default_1(app) {
    app.use("/auth", auth_1.default);
    app.use("/products", products_1.default);
    app.use("/cart", cart_1.default);
    app.use("/bookmarks", bookmarks_1.default);
    app.use("/orders", orders_1.default);
    app.use("/pay", payment_1.default);
    app.use("/webhook", webhook_1.default);
}
exports.default = default_1;
