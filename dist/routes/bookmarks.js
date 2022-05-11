"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookmarks_1 = require("@controllers/bookmarks");
const auth_1 = __importDefault(require("@middlewares/auth"));
const router = (0, express_1.Router)();
// @desc Get all bookmarked products
// @route GET /bookmarks
router.get("/", auth_1.default, bookmarks_1.getBookmarks);
// @desc Add a product to bookmarks
// @route POST /bookmarks
router.post("/", auth_1.default, bookmarks_1.addBookmark);
// @desc Delete an item from bookmarks
// @route DELETE /bookmarks/:_id
router.delete("/:_id", bookmarks_1.deleteItemFromBookmarks);
exports.default = router;
