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
exports.deleteItemFromBookmarks = exports.addBookmark = exports.getBookmarks = void 0;
const bookmark_1 = require("@models/bookmark");
const product_1 = require("@models/product");
const getBookmarks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookmarks = yield bookmark_1.Bookmark.find({ userId: req.user._id }).populate("bookmark");
        res.status(200).json(bookmarks);
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.getBookmarks = getBookmarks;
const addBookmark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, bookmark_1.validate)(req.body);
        if (error)
            return res
                .status(400)
                .json({ error: { message: error.details[0].message } });
        // Check if product exists
        const product = yield product_1.Product.findOne({ _id: req.body._id });
        if (!product)
            return res.status(404).json({ error: { message: "Product not found" } });
        // Check if bookmark already exists
        const bookmarkExists = yield bookmark_1.Bookmark.findOne({
            bookmark: { _id: req.body._id },
            userId: req.user._id,
        });
        if (bookmarkExists)
            return res
                .status(400)
                .json({ error: { message: "Item already in bookmarks" } });
        //Create new bookmark
        const bookmark = new bookmark_1.Bookmark({
            bookmark: req.body._id,
            userId: req.user._id,
        });
        yield bookmark.save();
        res.status(201).json(bookmark);
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.addBookmark = addBookmark;
const deleteItemFromBookmarks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productExists = yield product_1.Product.findOne({ _id: req.params._id });
        if (!productExists)
            return res.status(404).json({ error: { message: "Item not found" } });
        const item = yield bookmark_1.Bookmark.deleteOne({
            bookmark: { _id: req.params._id },
        });
        res.status(200).json(item);
    }
    catch (err) {
        res.status(500).json({ error: { message: err.message } });
        console.log(err.message);
    }
});
exports.deleteItemFromBookmarks = deleteItemFromBookmarks;
