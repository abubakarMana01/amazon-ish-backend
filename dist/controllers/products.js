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
exports.getSingleProduct = exports.addProduct = exports.getProducts = void 0;
const product_1 = require("@models/product");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.Product.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.getProducts = getProducts;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, product_1.validate)(req.body);
        if (error)
            return res
                .status(400)
                .json({ error: { message: error.details[0].message } });
        const productExists = yield product_1.Product.findOne({ id: req.body.id });
        if (productExists)
            return res
                .status(400)
                .json({ error: { message: "Product already exists" } });
        const product = new product_1.Product({
            id: req.body.id,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image: req.body.image,
        });
        yield product.save();
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.addProduct = addProduct;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.Product.findById(req.params._id);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.getSingleProduct = getSingleProduct;
