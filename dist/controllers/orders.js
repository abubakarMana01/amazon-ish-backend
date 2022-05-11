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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOrder = exports.getOrders = void 0;
const orders_1 = require("@models/orders");
const user_1 = require("@models/user");
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findById(req.user._id).populate("orders.products.product");
        res.status(200).json(user.orders);
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.getOrders = getOrders;
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, orders_1.validate)(req.body);
        if (error)
            return res
                .status(400)
                .json({ error: { message: error.details[0].message } });
        const user = yield user_1.User.findById(req.user._id);
        user.orders.push(new orders_1.Order({
            paymentMethod: req.body.paymentMethod,
            products: req.body.products,
        }));
        yield user.save();
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.addOrder = addOrder;
